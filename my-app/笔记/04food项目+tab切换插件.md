clientWidth()  原生获取元素的宽度
1. 实现食物列表滑动:
    将<View style={styles.content}>替换为<ScrollView style={styles.content}>

2. 底部导航
    1. TabBarIOS: 底部选项条, 不能跨平台,只能iOS端使用
        添加如下代码, 就会出现底部选项条
            return (
                <TabBarIOS></TabBarIOS>
            ) 
    
    2. 使用View+TouchableNativeFeedback实现导航条：state变化，渲染不同页面的jsx的表达式
        1. 结构
            <View style={styles.foot}>
                <View style={styles.fooditem}>
                    <Text>首页</Text>
                </View>
                <View style={styles.fooditem}>
                    <Text>分类</Text>
                </View>
            </View>

            foot: {
                position: 'absolute';
                bottom: 0;
                top:0;
                left: 0;
                height:49px;
                lineHeight:49px;
                flex: 1;
                flexDirection: 'row';

            }
            fooditem: {
                flex:1;
                justifyContent:'center';
                alignItems:'center';
            }
        2. 切换功能：
            将return()中的所有内容先剪切
            在this.state //定义一个变量，点击底部时就渲染其他页面
            constructor(){
                ...
                this.state = {
                    ...
                    page: 'page1'
                }
            }
            render(){
                ...
                var renderContent = null;
                if( this.state.page === 'page1'){
                    renderContent = (
                        上面所剪切的内容
                        需要切换的组件内容：
                        <View style={styles.foot}>
                            <TouchableNativeFeedback onPress={ ()=>{this.setState({page:'page1'})} }>
                                <View>
                                    <Text>首页</Text>
                                </View>
                            </TouchableNativeFeedback>

                            <TouchableNativeFeedback onPress={ ()=>{this.setState({page:'page2'})} }>
                                <View>
                                    <Text>分类</Text>
                                </View>
                            </TouchableNativeFeedback>

                        </View>
                    )
                }else{
                    renderContent = (
                        第二个分类页面的内容
                        相同：需要切换的组件内容
                        <View style={styles.foot}>
                            <TouchableNativeFeedback onPress={ ()=>{this.setState({page:'page1'})} }>
                                <View>
                                    <Text>首页</Text>
                                </View>
                            </TouchableNativeFeedback>

                            <TouchableNativeFeedback onPress={ ()=>{this.setState({page:'page2'})} }>
                                <View>
                                    <Text>分类</Text>
                                </View>
                            </TouchableNativeFeedback>

                        </View>
                    )
                }
                return renderContent;  // 再返回渲染页面
            }

        3. 将home和分类页面进行组件拆分
            新建并拆分：view/food.js  和 category.js
            新建:./view/Home.js: 将food.js 和 category.js 导入
            在App.js中渲染Home就可以了

    3. 第三方插件：react-native-tab-navigator
        一个跨平台的TabBar第三方框架组件，可以用于iOS和安卓平台,切换页面时保留底部导航条
        安装：yarn add react-native-tab-navigator  只能用yarn安装
        导入：import TabNavigator from 'react-native-tab-navigator'
        复制官网：
        1. ./view/Home.js:
            import food from './Food'
            import category from './Category'
            constructor(){
                super()
                this.state = {
                    selectedTab:'home'
                }
            }
            render(){
                return (
                    <TabNavigator>
                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'home'}
                            title="Home"
                            <!-- 正常图标 -->
                            renderIcon={() => <Image source={require('../imgs/home.png')} style={{width:20,height:20}} />}
                            <!-- 图标上的小数字 表示消息数量 -->
                            badgeText="1"
                            onPress={() => this.setState({ selectedTab: 'home' })}>
                            <food />
                        </TabNavigator.Item>
                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'profile'}
                            title="Profile"
                            <!-- 正常的图标 -->
                            renderIcon={() => <Image source={require('../imgs/type.png')} style={{width:20,height:20}} />}
                            onPress={() => this.setState({ selectedTab: 'profile' })}>
                            <category />
                        </TabNavigator.Item>
                    </TabNavigator>
                )
            }
        2. App.js:
            import React, { Component } from 'react';
            import Home from './view/Home'
            class App extends Component{
                render(){
                    return <Home />
                }
            }
            export default App

    4. react-navigation: react-native官网有，可以用于iOS和安卓平台,切换页面时不保留底部导航条
        下载：yarn add react-navigation
        1. view/Home.js:
            import {createStackNavigator, createAppContainer} from 'react-navigation';
            import Home from './views/Home'
            import Category from './views/Category'

            const MainNavigator = createStackNavigator({
            Home: {screen: Home},
            Profile: {screen: Category},
            });

            const App = createAppContainer(MainNavigator);
            export default App;

        2. Home.js中: 定义头部导航栏
            class Home extends Component {
                static navigationOptions = {
                    headerStyle: {
                        backgroundColor: '#fff',
                        height:0
                    },
                };
            container中的marginTop去掉
            
        3. 点击跳转页面：createStackNavigator中定义的页面才可以跳转
            要在Food中进行点击后跳转，需要在Home中传值过去：this.props.navigation.navigate
            
            Home.js: Food获得navigate方法
                <Food navigate={this.props.navigation.navigate} />

            1. Food.js: 在food列表中添加点击组件：TouchableNativeFeedback
                this.props.navigate('Profile',id:'')
                参数：跳转的页面，{传参}
                {
                    this.state.foodlist.map(item=>{
                        return <TouchableNativeFeedback key={item.id} onPress={ ()=>{this.props.navigate( 'Profile',{id:item.id} )}} >
                                <View>
                                    <Image source={{uri:item.imgUrl}} 
                                        style={ [ styles.img,{width:imgWidth,
                                                height:imgHeight}]} />
                                    <Text style={styles.text1}>{item.title}</Text>
                                </View>
                                </TouchableNativeFeedback>
                    })
                }

            2. Category.js: 获取Food.js传来的参数
                当点击底部导航条跳转到分类页时不需要参数，所以需要判断
                componentDidMount(){
                    if( this.props.navigation ){
                        alert(this.props.navigation.state.params.id)
                    }
                }


跳转及传参 
this.props.navigation.navigate（页面,{参数:值})
获取参数
this.props.navigation.state.params.参数