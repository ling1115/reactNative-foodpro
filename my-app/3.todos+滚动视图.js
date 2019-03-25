import React from 'react';
import { StyleSheet, Text, View ,  TextInput , 
  TouchableNativeFeedback , FlatList} from 'react-native';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      arr: ['111','222','333'],
      inputVal: ''
    }
    this.handleInput = this.handleInput.bind(this)
    this.addItem = this.addItem.bind(this)
  }
  // componentDidMount(){
  //   fetch("https://www.easy-mock.com/mock/5c75ff584fc8462dad97c137/rnmock/")
  //   .then(res=>{
  //     return res.json()
  //   }).then(res=>{
  //     this.setState({
  //       arr: res.data.list
  //     })
  //   })
  // }
  handleInput(value){
    this.setState({
      inputVal: value
    })
  }

  addItem(){
    if( this.state.inputVal !== ''){
      this.setState(PrevState=>({
        arr: [...PrevState.arr, this.state.inputVal],
        inputVal:''
      }))
    }else{
      alert('输入不能为空')
    }
  }

  removeItem(index){
    var cloneArr = [...this.state.arr]
    cloneArr.splice( index , 1 )
    this.setState({
      arr: cloneArr
    })
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.topArea}>
          <TextInput placeholder="请输入" onChangeText={this.handleInput} 
            value={this.state.inputVal}
          />
          {/* View不支持触摸事件，需要在它的外层嵌套 TouchableHighlight */}
          <TouchableNativeFeedback onPress={this.addItem} style={styles.add}>
            <View >
              <Text>添加</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        
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

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    marginTop:30,
    flex:1
   
},
  TextInput: {
    height: 30,
    lineHeight: 30,
    marginTop: 30,
    marginLeft: 10,
  },
  add: {
    position: "absolute",
    right: 10,
    top: 2,
    backgroundColor: 'gold'
  },
  topArea:{
    display: "flex",
    flexDirection: "row",
  },
  list: {
    height: 300,
    backgroundColor: "cyan",
    justifyContent:'flex-start',
    alignItems:'center'
  }
});
