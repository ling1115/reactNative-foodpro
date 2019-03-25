import React,{Component} from 'react'

import {WebView} from 'react-native';


class Map extends Component {
	render(){
		return <WebView source={{uri:"http://192.168.24.100:3000/food.html"}} style={{width:'100%',height:'100%'}}></WebView>
	}
}

export default Map;