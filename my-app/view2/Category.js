import React from 'react';
import { StyleSheet, Text, View,Image,Dimensions,TextInput,ScrollView,TouchableNativeFeedback,FlatList } from 'react-native';

export default class FoodType extends React.Component {
  constructor(props){
     super(props);
     this.state = {
        foodList:[],
        refresh:false
     }
  }

  componentDidMount(){
         this.getMoreData();
  }

  getMoreData(){ //得到新数据
      this.setState({
         refresh:true
      })
     var host = "http://192.168.24.100:3000/";
       var url = host + 'hotlist'// 如果没有加载id, 加载热门分类列表
       if(this.props.navigation){ //如果传id  加载食物分类列表
         var id = this.props.navigation.state.params.id;
         url = host +'category?id='+id;
      }
      fetch(url).then((res)=>res.json()).then((res)=>{
           this.setState({  //加载新数据
                foodList:[...this.state.foodList,...res.data.list],
                refresh:false
           })
      })

  }
 
  	render() {
		return (
		<View style={styles.container}>
			<FlatList 
				onRefresh={ ()=>{this.getMoreData()}} 
				refreshing={this.state.refresh} 
				keyExtractor ={(item,index)=>index+item} 
				data={this.state.foodList} 
				renderItem ={({item})=><View style={styles.categoryList}>
						<Image source={{uri:item.imgUrl}} 
								style={styles.img} />
						<View style={item.info}>
							<Text style={styles.title}>{item.title}</Text>
							<Text style={styles.desc}>{item.desc}</Text>
						</View>
					</View>
				}
			/>
		</View>
		
		)
  	}
}

const styles = StyleSheet.create({
  	container: {
    	backgroundColor: '#fff',
    },
	categoryList: {
		display: 'flex',
		flexDirection: 'row'
	},
	img: {
		marginBottom:10,
		marginLeft: 5,
		width:100,
		height:100
	},
	info: {
		flex:1,
		marginLeft:5
	},
	title: {
		fontSize: 16,
		marginLeft:5,
		marginBottom: 5
	},
	desc: {
		fontSize:12,
		marginLeft:5,
		flexWrap: 'wrap',
	}
 
});
