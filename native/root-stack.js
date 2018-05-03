import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {HomeScreen, SelectTasks, LoginScreen} from './components'

const RootStack = StackNavigator({
  Home: {
    screen: HomeScreen
  },
  Select: {
    screen: SelectTasks
  },
  Login: {
  	screen: LoginScreen
  }
})

export default RootStack

