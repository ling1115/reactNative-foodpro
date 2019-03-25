import React, { Component } from 'react';

import { actionCreator as settingAction} from '../setting/index'

import actionCreator from './actionCreator'
import {connect} from 'react-redux'
import UI from './ui'

function mapStateToProps(state){
  return {
    page: state.home.selectedTab,
    isNear: state.setting.isNear
  }
}
function mapDispatchToProps(dispatch){
  return {
    changePage(page){
      	dispatch(actionCreator.changePageAction(page))
	},
	changeNear(value){
		value = value === 'true' ? true : false
		dispatch(settingAction.changeNearAction(value))
	}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UI);
