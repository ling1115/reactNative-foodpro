import React from 'react';
import {Text, View,Image,FlatList ,TouchableNativeFeedback} from 'react-native';

import styles from './styles'

class UI extends React.Component {
    constructor(props){
       super(props);
    }
  
    componentDidMount(){
          this.props.getInitData();
    }
  
   
        render() {
          return (
          <View style={styles.container}>
              <FlatList 
                  onRefresh={ ()=>{this.props.getData()}} 
                  refreshing={this.props.refresh} 
                  keyExtractor ={(item,index)=>index+item} 
                  data={this.props.list} 
                  renderItem ={({item})=> 
                        <TouchableNativeFeedback key={item.id} 
                            onPress={()=>{this.props.navigate("detail",{id:item.id})}}>
                                <View style={styles.categoryList}>
                                    <Image source={{uri:item.imgUrl}} 
                                            style={styles.img} />
                                    <View style={item.info}>
                                        <Text style={styles.title}>{item.title}</Text>
                                        <Text style={styles.desc}>{item.desc}</Text>
                                    </View>
                                </View>
                        </TouchableNativeFeedback>
                  }
              />
          </View>
          
          )
        }
  }

export default UI