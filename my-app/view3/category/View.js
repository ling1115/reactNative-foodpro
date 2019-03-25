import React from 'react';
import { StyleSheet, Text, View,Image,Dimensions,TextInput,ScrollView,TouchableNativeFeedback,FlatList } from 'react-native';
import { connect } from 'react-redux'

import actionCreator from './actionCreator'

class Category extends React.Component {
  constructor(props){
     super(props);
  }

  componentDidMount(){
        this.props.getDate();
  }

 
  	render() {
		return (
		<View style={styles.container}>
			<FlatList 
				onRefresh={ ()=>{this.props.getDate()}} 
				refreshing={this.props.refresh} 
				keyExtractor ={(item,index)=>index+item} 
				data={this.props.list[0]} 
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

function mapStateToProps(state){
	return {
		list: state.category.list,
		refresh: state.category.refresh
	}
}

function mapDispatchToProps(dispatch , ownProps){
	return {
		getDate(){
			dispatch(actionCreator.getDate(ownProps.navigate))
		}
	}
}


export default connect(mapStateToProps , mapDispatchToProps)(Category)

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
