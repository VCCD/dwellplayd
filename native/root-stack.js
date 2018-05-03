import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {HomeScreen, SelectTasks, LoginScreen, FrequencySelector, Scores} from './components'

const RootStack = StackNavigator({
  Home: {
    screen: HomeScreen
  },
  Select: {
    screen: SelectTasks
  },
  Scores: {
    screen: Scores
  },
  Login: {
  	screen: LoginScreen
  },
  FrequencySelector: {
    screen: FrequencySelector
  }
})

export default RootStack

