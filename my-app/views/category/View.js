import React from 'react';
import { StyleSheet, Text, View,Image,Dimensions,TextInput,ScrollView,TouchableNativeFeedback,FlatList } from 'react-native';
import { connect } from 'react-redux'

import actionCreator from './actionCreator'
import Ui from '../common/ui'


function mapStateToProps(state , ownProps){
	return {
		list: state.category.list,
		refresh: state.category.refresh,
		navigate: ownProps.navigation.navigate
	}
}

function mapDispatchToProps(dispatch,ownProps){
	return {
		// 首次触发加载分类数据,在这里再传一个布尔值：true,表示首次加载需要覆盖之前加载的数据，false表示不覆盖
		getInitData(){
			dispatch(actionCreator.getData(ownProps.navigation,true))
		},
		// 再次加载更多：先设置refreshing=true,加载成功后设为false
		getData(){
			// 要修改值：需要触发getMore()方法
			dispatch(actionCreator.getMore(true))
			// 然后触发请求数据
			dispatch(actionCreator.getData(ownProps.navigation , false))
		}
	}
}


export default connect(mapStateToProps , mapDispatchToProps)(Ui)

