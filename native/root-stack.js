import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {HomeScreen, SelectTasks} from './components'

const RootStack = StackNavigator({
  Home: {
    screen: HomeScreen
  },
  Select: {
    screen: SelectTasks
  }
})

export default RootStack

