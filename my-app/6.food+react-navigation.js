import React, { Component } from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from './views/Home'
import Category from './views/Category'

const MainNavigator = createStackNavigator({
  Home: {screen: Home},
  Profile: {screen: Category},
});

const App = createAppContainer(MainNavigator);

export default App;