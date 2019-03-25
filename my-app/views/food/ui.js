import React, { Component } from 'react';
import { View, Text , TouchableNativeFeedback,
				Dimensions ,Image , TextInput , ScrollView} from 'react-native';
import styles from './styles'				


class Food extends Component {
  constructor(props) {
		super(props);
		// this.state = {
		// 	foodList: []
		// }
  }
  componentDidMount(){
    	this.props.getList()
  }
  
  render() {
    // 获取屏幕高度   
    let { width } = Dimensions.get('window')
    let imgWidth = (width-20)/3-10;
    let imgHeight = (width-20)/3-10;
    return (
		<View style={styles.container}>
			{/* banner和 输入框 */}
			<Image source={require('../../assets/tp.png')} style={{width:width,height:200}}/>
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

export default Food