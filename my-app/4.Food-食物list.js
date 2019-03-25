import React, { Component } from 'react';
import { View, Text , StyleSheet , 
        Dimensions ,Image , TextInput } from 'react-native';

class Food extends Component {
  constructor(props) {
		super(props);
		this.state = {
		foodlist: []
		};
  }
  componentDidMount(){
    	this.getFoodList()
  }
  getFoodList(){
    var url = 'http://192.168.24.100:3000/food'
    fetch(url).then((res)=>res.json()).then(res=>{
		this.setState({
			foodlist: res.data.categories
		})
    })
  }
  render() {
    // 获取屏幕高度   
    let { width } = Dimensions.get('window')
    let imgWidth = (width-20)/3-10;
    let imgHeight = (width-20)/3-10;
    return (
		<View style={styles.container}>
			{/* banner和 输入框 */}
			<Image source={require('./imgs/tp.png')} style={{width:width,height:200}}/>
			<TextInput placeholder='请输入美食' 
				style={[styles.text,{top:width*0.3,width:width-80}]}/>

			{/* food列表 */}
			<View style={styles.content}>
				<View style={styles.list}>
					{
						this.state.foodlist.map(item=>{
							return <View key={item.id}>
										<Image source={{uri:item.imgUrl}} 
											style={ [ styles.img,{width:imgWidth,
													height:imgHeight}]} />
										<Text style={styles.text1}>{item.title}</Text>
									</View>
						})
					}
				</View>
			</View>

		</View>
    );
  }
}

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

export default Food;
