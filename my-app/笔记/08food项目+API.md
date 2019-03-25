内容：组件Switch  首页任务：将react的看完写完 VUE的扩展内容学完

Switch: 这是一个“受控组件”（controlled component）。
    必须使用onValueChange回调来更新value属性以响应用户的操作。
    如果不更新value属性，组件只会按一开始给定的value值来渲染且保持不变，看上去就像完全点不动。

1. setting/View.js:使用Switch
    import { View , Text , Switch } from 'react-native'

    class Setting extends Component{
        constructor(){
            super()
            this.state = {
                flag: true
            }
        }
        render(){
            return (
                <View>
                    <Text>是否显示附近美食</Text>
                    <Switch value={this.state.flag} onValueChange={(value)=>{this.setState({
                        flag: value
                    })}} />
                </View>
            )
        }
    }    

2. Switch中的value值需要改变home中map tab的显示和隐藏。所以不适合保存在this.state中
    所以需要在不同模块当中传输数据：map => home , 在redux中执行这个操作
    1. 新建reducer.js: 
        var defaultState = {
            isNear: true
        }
        var reducer = (state=defaultState , action)=>{
            var newState = {...state}
            if( action.type === 'CHANGE_NEAR'){
                newState.isNear = action.value
            }
            return newState
        }

        import default reducer

    2. setting/index.js: 导入reducer.js并导出
        import reducer from './reducer.js'
        export { Setting , reducer}

    3. store/reducer.js: 在store中导入setting的reducer.js
        import { reducer as setting } from '../views/setting'
        ..., setting

    4. setting/actionCreator.js: 派发任务
        export default {
            changeNearAction(value){
                return {
                    type: 'CHANGE_NEAR',
                    value
                }
            }
        }

    5. settting/View.js: 映射
        import { connect } from 'react-redux'
        import actionCreator from './actionCreator.js'

        // onValueChange中映射changeNear()
        <Switch value={this.props.isNear} onValueChange={(value)=> this.props.changeNear(vaule)} />

        function mapStateToProps(state){
            return {
                isNear: state.setting.isNear
            }
        }
        function mapDispatchToProps(dispatch){
            return {
                changeNear(vaule){
                    dispatch(actionCreator.changeNearAction(value))
                }
            }
        }

        export default connect(mapStateToProps , mapDispatchToProps)(Setting)

3. home/View.js: 
    1. 将isNear传给home中的View.js
    function mapStateToProps(state){
        return {
            ...,
            isNear: state.setting.isNear
        }
    }

    2. 如何有isNear控制Map tab的显示隐藏：使用if判断isNear，将Map的TabNavigator.Item剪切并赋值给一个变量
        render(){
            var near = null 
            if( this.props.isNear ){
                near = (
                    <TabNavigator.Item>
                    </TabNavigator.Item>
                )
            }
        }
        然后在上面那个组件的位置替换成：{near}

4. 在settiing/View.js: 保存上一次所设置的isNear, 在home取出isNear值，并用这个值改变setting中的isNear
    也就是需要在home/View.js中调用setting/actionCreator.js
    使用持久存储 AsyncStorage
    1. setting/index.js: 先将setting/actionCreator.js导出
        import actionCreator from './actionCreator.js'
        export { ... , actionCreator}

    2. setting/reducer.js: 先保存isNear
        import { AsyncStorage } from 'raect-native'
        ...
        if( action.type === 'CHANGE_NEAR'){
            AsyncStorage.setItem('near',action.value.toString())
        }

    3. home/View.js: 取出setting保存的near值: 导入AsyncStorage 和setting的actionCreator
        import { ... , AsyncStorage } from 'react-native'
        import { ..., actionCreator as setting} from '../setting'
        constructor(){
            super()
            AsyncStorage.getItem('near' , (err,value)=>{
                this.props.changeNear(value)
            })
        }

    4. home/View.js: 获取near值并调用setting/actionCreator.js中的changeNearAction()
        function mapDispatchToProps(dispatch){
            return {
                ...,
                changeNear(value){
                    value = value === 'true' ? true : false
                    dispatch(setting.changeNearAction(value))
                }
            }
        }

AsyncStorage: getItem(key: value , callback) key和value必须是字符串形式,第二个参数是回调函数, 实行错误先行
import { AsyncStorage } from "react-native"

5. 详情页：views/detail
    1. View.js:
        import React , { Component} from 'raect'
        import {View,Text} from 'react-native'

        class Detail extends Component{
            render(){
                return (
                    <View>
                        <Text>详情页
                        {this.props.navigation.state.params.id}
                        </Text>
                    </View>
                )
            }
        }
        export default Detail

    2. detail/index.js:
        import Detail from './View.js'
        export {
            Detail
        }

    3. App.js: 导入详情页
        import {Detail} from './views/detail'

        detail:{screen: Detail}

    4. 跳转到详情页需要id,先在category和hotlist的View.js的mapStateToProps()取出navigate()
        1. category/View.js:
            function mapStateToProps(state , ownProps){
                return {
                    ...,
                    navigate: ownProps.navigation.navigate
                }
            }

        2. home/View.js:
            <Hotlist navigate={this.props.navigation.navigate}>

        3. 然后在common/ui.js中执行跳转详情页的操作：将food/ui.js中的TouchableNativeFeedback拷贝来包裹common/ui.js中的... 并把跳转页面改为 detail
        <TouchableNativeFeedback key={item.id} 
			onPress={()=>{this.props.navigate("detail",{id:item.id})}}>
            <View style={styles.categoryList}>
                <Image source={{uri:item.imgUrl}} style={styles.img} />
                <View style={item.info}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.desc}>{item.desc}</Text>
                </View>
            </View>
        </TouchableNativeFeedback>

6. 拆分home

7. 常用API
    Alert: 
    ToastAndroid
    Animated
    BackHandle