import React , {Component} from 'react'
import { View, Text , Switch} from 'react-native';
import {connect} from 'react-redux'
import actionCreator from './actionCreator'

class Setting extends Component{
    render(){
        return (
           <View>
               <Text>是否显示附近美食</Text>
               <Switch value={this.props.isNear} 
               onValueChange={value=>this.props.changeNear(value)} />
           </View>
        )
    }
}

function mapStateToProps(state){
    return {
        isNear: state.setting.isNear
    }
}

function mapDispatchToProps(dispatch){
    return {
        changeNear(value){
            dispatch(actionCreator.changeNearAction(value))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Setting)