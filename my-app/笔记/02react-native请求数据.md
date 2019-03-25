1. react-native中的flex布局，默认的主轴方向是垂直方向，justifyContent:'center'
2. App.js: 显示列表
        constructor(){
            super();
            this.state = {
                arr : [1,2,3]
            }
        }
        render(){
            return <View>
                        <View>
                            {
                                this.state.arr.map((item,index)=>{
                                    return <Text key={index}>{item}</Text>
                                })
                            }
                        </View>
                    </View>
        }
    }
    const styles = StyleSheet.create({
        container:{
            flex: 1
        },
        box: {
            flex: 1,
            backgroundColor: 'cyan',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 20
        }
    })

3. App.js: 读取接口数据：使用fetch方法，可以使用easy-mock伪造数据
    easy-mock: https://www.easy-mock.com   点右下角＋，创建接口
    创建之后，打开，点创建接口，开始写数据，如下，写完后复制链接接口地址
        {
            "data": {
                "ret": true,
                "list": [
                    {
                    "id": "01",
                    "name": "ccc"
                    },
                    {
                    "id": "02",
                    "name": "lll"
                    }
                ]
            }
        }

    在componentDidMount钩子函数中发起请求数据
        ...
        componentDidMount(){
            fetch("https://www.easy-mock.com/mock/5c75ff584fc8462dad97c137/rnmock/")
            .then(res=>{
                return res.json()
            }).then(res=>{
                this.setState({
                    arr: res.data.list
                })
            })
        }

4. 还可以用express创建接口：
    express --view=ejs mydata
    cd mydata
    cnpm init
    npm start
    1. mydata/routes/index.js:
        let data = {
            "res": true,
            "list": [
                {
                    "id": "01",
                    "name": "ccc"
                },
                {
                    "id": "02",
                    "name": "lll"
                }
            ]
        }

        router.get('/', (req,res,next)=>{
            res.json(data)
        })
    2. App.js:
        componentDidMount(){
            fetch('http://本机ip地址:3000')
            .then(res=>{
                return res.json()
            }).then(res=>{
                this.setState({
                    arr: res.list
                })
            })
        }

5. 事件处理：在raect-native中Button在ios和android上的显示不一样,不互相兼容 减少使用，
    import {...,Button} from 'react-native'
    ...
    // 在button中添加点击事件
    <Button title='提交' onPress={this.add.bind(this)} ></Button>
    ...
    add(){
        alert(111)
    }

6. todos: 处理文本输入事件 和 处理触摸事件
    import React,{Component} from 'react'
    import { StyleSheet , View , Text , TextInput } from 'react-native'

    1. 逻辑：TextInput有两个属性：onChangeText,接受一个函数,可以得到输入框的value，函数在文本变化时被调用
        class App extends Component{
            constructor(){
                super();
                this.state = {
                    arr: ["111","222","333"],
                    inputValue: ''
                }
                this.handleInput = this.handleInput.bind(this)
            }
            // 文本变化即调用
            handleInput(value){
                this.setState({
                    inputValue: value
                })
            }
            addItem(){

            }
            render(){
                return <View style={styles.container}>

                            <View style={styles.topArea}>
                                <TextInput placeholder="请输入" onChangeText={this.handleInput} 
                                   value={this.state.inputVal} />
                                <View style={styles.add}>
                                    <Text>添加</Text>
                                </View>
                            </View>

                            <View style={styles.list}>
                                {
                                    this.state.arr.map((item,index)=>{
                                        return <Text key={index}>{item}</Text>
                                    })
                                }
                            </View>
                        </View>
            }
        }

    2. View不支持触摸事件，需要在View的外层嵌套上 TouchableHighlight 组件
        并把样式添加在TouchableHightlight上
        <TouchableHighlight onPress={this.addItem} style={styles.add}>
            <View >
              <Text>添加</Text>
            </View>
        </TouchableHighlight>

        对应的addItem方法：在输入框不为空的情况下才添加，不然每次点击添加都会高亮显示
            addItem(){
                if( this.state.inputVal !== ''){
                    this.setState( PrevState=>({
                        arr: [...PrevState.arr, this.state.inputVal],
                        inputVal: ''
                    }))
                }else{
                    alert('输入不能为空')
                }
            }

        TouchableOpacity: 点击时 透明度变化
        TouchableNativeFeedback: 点击时 没有任何效果，样式添加到它的内层View上

    3. 常用TouchableNativeFeedback，并实现点击删除功能
        removeItem(){
            var cloneArr = [...this.state.arr]
            cloneArr.splice( index , 1)
            this.setState({
                arr: cloneArr
            })
        }
            ...
            {
                this.state.arr.map( (item,index)=>{
                    return <TouchableNativeFeedback key={index}
                                onPress={this.removeItem.bind(this,index)}>
                                <View>
                                    <Text >{item}</Text>
                                </View>
                            </TouchableNativeFeedback>
                })
            }
        

    4. 样式
        const styles = StyleSheet.create({
            container:{
                marginTop:30,
                flex:1
            },
            TextInput: {
                height: 30,
                lineHeight: 30,
                marginTop: 10,
                marginLeft: 10
            },
            add: {
                position: "absolute",
                right: 10,
                top: 10
            },
            topArea: {
                display: "flex",
                flexDirection: "row",

            },
            list: {
                height: 300,
                backgroundColor: "cyan"
            }
        })