import React, { Component } from 'react';
import { View, Text , StyleSheet , 
        Dimensions ,Image , TextInput , ScrollView} from 'react-native';
import TabNavigator from 'react-native-tab-navigator'

import {Food} from './food/index'
import {Category} from './category/index'

class Home extends Component {

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#fff',
            height:0
        },
    
      };

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
                renderIcon={() => <Image source={require('../assets/home.png')} style={{width:20,height:20}} />}
                badgeText="1"
                onPress={() => this.setState({ selectedTab: 'home' })}>
                <Food navigate={this.props.navigation.navigate} />
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'profile'}
                title="Profile"
                renderIcon={() => <Image source={require('../assets/type.png')} style={{width:20,height:20}} />}
                onPress={() => this.setState({ selectedTab: 'profile' })}>
                <Category />
            </TabNavigator.Item>
        </TabNavigator>
    );
  }
}

export default Home;
