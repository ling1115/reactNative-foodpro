import React, { Component } from 'react';
import { View, Text , StyleSheet , 
        Dimensions ,Image , TextInput , ScrollView} from 'react-native';
import TabNavigator from 'react-native-tab-navigator'

import Food from './Food'
import Category from './Category'

class Home extends Component {
    constructor(){
        super();
        this.state = {
            selectedTab:'home'
        }
    }
  
  render() {
    
    return (
		<TabNavigator>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'home'}
                title="Home"
                renderIcon={() => <Image source={require('../imgs/home.png')} style={{width:20,height:20}} />}
                badgeText="1"
                onPress={() => this.setState({ selectedTab: 'home' })}>
                <Food />
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'profile'}
                title="Profile"
                renderIcon={() => <Image source={require('../imgs/type.png')} style={{width:20,height:20}} />}
                onPress={() => this.setState({ selectedTab: 'profile' })}>
                <Category />
            </TabNavigator.Item>
        </TabNavigator>
    );
  }
}

export default Home;
