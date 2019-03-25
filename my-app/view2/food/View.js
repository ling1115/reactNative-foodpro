import React, { Component } from 'react';
import { View, Text , StyleSheet , TouchableNativeFeedback,
				Dimensions ,Image , TextInput , ScrollView} from 'react-native';
				
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import actionCreator from '../../store/actionCreator' 

class Food extends Component {
  constructor(props) {
		super(props);
		// this.state = {
		// 	foodList: []
		// }
  }
  componentDidMount(){
    	this.getFoodList()
  }
  getFoodList(){
    var url = 'http://192.168.24.100:3000/food'
    fetch(url).then((res)=>res.json()).then(res=>{
		// this.setState({
		//    foodList:res.data.categories
		// })
		this.props.getCategory(res.data.categories)
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
			<Image source={require('../../imgs/tp.png')} style={{width:width,height:200}}/>
			<TextInput placeholder='请输入美食' 
				style={[styles.text,{top:width*0.3,width:width-80}]}/>

			{/* food列表 */}
			<ScrollView style={styles.content}>
				<View style={styles.list}>
					{
						this.props.categories.map(item=>{
							return (
								<TouchableNativeFeedback key={item.id} 
								onPress={()=>{this.props.navigate("Profile",{id:item.id})}}>
									<View>
										<Image source={{uri:item.imgUrl}} 
											style={ [ styles.img,{width:imgWidth,
													height:imgHeight}]} />
										<Text style={styles.text1}>{item.title}</Text>
									</View>
								</TouchableNativeFeedback>
							)
						})
					}
				</View>
			</ScrollView>

		</View>
    );
  }
}

export default connect( (state)=>state,
				(dispatch)=>bindActionCreators(actionCreator,dispatch) )(Food);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
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
		marginTop:5
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


