import React, { Component } from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import {Home} from './views/home'
import {Category} from './views/category/index'
import {Hotlist} from './views/hotlist/index'
import {Detail} from './views/detail'

import { Provider } from 'react-redux'
import store from './store/store'

const MainNavigator = createStackNavigator({
  	Home: {screen: Home},
	Profile: {screen: Category},
	hotlist: {screen: Hotlist},
	detail: {screen: Detail} 
});

const App = createAppContainer(MainNavigator);

const MyApp = (Props)=>{
	return <Provider store={store}>
		<App />
	</Provider>
}

export default MyApp;