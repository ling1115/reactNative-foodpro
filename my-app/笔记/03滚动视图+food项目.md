1. ScrollView: 滚动视图
    在项目比较多时，即使看不到的项目也会进行渲染，造成性能浪费
    引入ScrollView:
        import {..., ScrollView} from 'react-native'
    用ScollView替换 list中外层的View:
        <ScollView style={styles.list}>
          {
            this.state.arr.map((item,index)=>{
              return <Text key={index}>{item}</Text>
            })
          }
        </ScollView>
    样式：滚动容器必须设置高度，超出高度就会滚动
        container: {
            margin: 30
        },
        ...
        list: {
            height: 100,
            backgroundColor: "cyan",
        }

2. FlatList: 需要显示较长的滚动列表，那么应该使用功能差不多但性能更好的FlatList组件
    并不立即渲染所有元素，而是优先渲染屏幕上可见的元素。
    FlatList组件必须的两个属性是data和renderItem。data是列表的数据源，而renderItem则从数据源中逐个解析数据，然后返回一个设定好格式的组件来渲染。
    需要设置keyExtractor  指定每个项目的唯一key值

    1. Key的作用是使React能够区分同类元素的不同个体，以便在刷新时能够确定其变化的位置，
        减少重新渲染的开销。若不指定此函数，则默认抽取item.key作为key值。
        若item.key也不存在，则使用数组下标。

    2. 
        <FlatList style={styles.list}>
          data={this.state.arr} 
          {/* 设置key: 需要时字符串形式 */}
          keyExtractor={(item, index) => index+item }
          renderItem={ ({item})=> 
                        <TouchableNativeFeedback onPress={this.removeItem.bind(this,index)}>
                          <View>
                            <Text>{item}</Text>  
                          </View>
                        </TouchableNativeFeedback>
                      }
        </FlatList>

3. food项目: 食物list
    1. express生成器搭建服务：
        express --view=ejs myapp
        cd myapp
        npm install ||  yarn install  vscode的控制台中
        npm start
    2. mydata/routes/index.js：food接口，先复制index.json到mydata根目录下
        var foodlist = require('../index.json')

        /* GET home page. */
        router.get('/', function(req, res, next) {
          res.render('index', { title: 'Express' });
        });

        // 写美食请求数据接口
        router.get('/food',(req,res,next)=>{
          res.json(foodlist)
        })

        module.exports = router;

    3. Dimensions: 获取屏幕宽高
        import {... , Dimensions } from 'react-native'
        render(){
            let {width} = Dimensions.get("windows") // 获取屏幕宽度
            return (
                <View style={styles.container}>
                  <Image source={require('./imgs/tp.png')} style={{width:width,height:200}} />
                  <TextInput placeholder='请输入美食' style={styles.text}/>
                </View>
            )

        }

    3. componentDidMount()请求服务器数据
        import ...
        componentDidMount(){
          
        }
        getFoodList(){
          let url = 'http://本地服务器启动ip地址:端口/接口'
          var url = 'http://192.168.24.100:3000/food'
          fetch(url).then(res=>res.json()).then(res=>{
            this.setState({
              foodlist: res.data.categories
            })
          })
        }
        render(){
          <View>
              
              <View>
              ...
              </View>
              <!-- food列表 -->
              <View style={styles.content}>
                <View style={styles.list}>
                  {
                    this.state.foodlist.map(item=>{
                      return <View key={item.id}>
                                <Image source={{uri:item.imgUrl}} 
                                  style={ [ styles.img,{width:imgWidth,height:imgHeight}]} />
                                <Text style={styles.text1}>{item.title}</Text>
                              </View>
                    })
                  }
                </View>
              </View>

          </View>
        }
        
	4. 样式:
		const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        marginTop: 30,
    },
    text: {
      position:'absolute',
      zIndex:10,
      height:40,
      lineHeight:40,
      marginLeft:40,
      borderRadius:8,
      backgroundColor:'#fff',
    },
    content: {
      flex:1,
      marginRight:10,
      marginTop:5,
      marginBottom:60
    },
    list: {
      display: 'flex',
      marginLeft:5,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    img: {
      marginLeft: 10
    },
    text1: {
      textAlign: 'center'
    }
})

样式技巧：
  style={ [styles.text , {top: 10 , xxxx:xxxx }] }
    



MacOS: ifconfig
windows: ipconfig