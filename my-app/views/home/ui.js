import React, { Component } from 'react';
import { Image , AsyncStorage } from 'react-native';
import TabNavigator from 'react-native-tab-navigator'

import {Food} from '../food/index'
import {Hotlist} from '../hotlist/index'
import { Map } from '../map/index'
import { Setting } from '../setting/index'


class UI extends Component {

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#fff',
            height:0
        },
    
      };

    constructor(){
        super();
        AsyncStorage.getItem('near' , (err,value)=>{
			this.props.changeNear(value)
		})
    }
  
  render() {
	var near = null
	if( this.props.isNear ){
		near = (
			<TabNavigator.Item
                selected={this.props.page === 'isNear'}
                title="附近"
                renderIcon={() => <Image source={require('../../assets/附近.png')} style={{width:20,height:20}} />}
                onPress={() => this.props.changePage('isNear')}>
                <Map />
            </TabNavigator.Item>
		)
	}
    return (
		<TabNavigator>
            <TabNavigator.Item
                selected={this.props.page === 'home'}
                title="首页"
                renderIcon={() => <Image source={require('../../assets/home.png')} style={{width:20,height:20}} />}
                onPress={() => this.props.changePage('home')}>
                <Food navigate={this.props.navigation.navigate} />
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.props.page === 'profile'}
                title="热门"
                renderIcon={() => <Image source={require('../../assets/热门.png')} style={{width:20,height:20}} />}
                onPress={() => this.props.changePage('profile')}>
                <Hotlist navigate={this.props.navigation.navigate}/>
            </TabNavigator.Item>
            {near}
            <TabNavigator.Item
                selected={this.props.page === 'setting'}
                title="设置"
                renderIcon={() => <Image source={require('../../assets/setting.png')} style={{width:20,height:20}} />}
                onPress={() => this.props.changePage('setting')}>
                <Setting />
            </TabNavigator.Item>
        </TabNavigator>
    );
  }
}
export default UI