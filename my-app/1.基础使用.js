import React from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      arr: []
    }
  }
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
  render() {
    return (
      <View style={styles.container}>
        <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}} 
          style={styles.img}
        />
        <Text style={styles.text}>hello eract-native!!</Text>
        {
          this.state.arr.map(item=>{
            return <Text key={item.id}>{item}</Text>
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text : {
    color: '#f00',
    fontSize: 24,
    
  },
  img: {
    width:200,
    height: 100
  }
});
