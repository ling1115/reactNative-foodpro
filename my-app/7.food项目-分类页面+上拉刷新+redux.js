import React, { Component } from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from './views/Home'
import Category from './views/Category'

import { Provider } from 'react-redux'
import store from './store/store'

const MainNavigator = createStackNavigator({
  	Home: {screen: Home},
 	Profile: {screen: Category},
});

const App = createAppContainer(MainNavigator);

const MyApp = (Props)=>{
	return <Provider store={store}>
		<App />
	</Provider>
}

export default MyApp;