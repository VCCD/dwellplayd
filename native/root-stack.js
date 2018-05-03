import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {HomeScreen, TaskList, LoginScreen, FrequencySelector, Scores} from './components'

const RootStack = StackNavigator({
  Home: {
    screen: HomeScreen
  },
  TaskList: {
    screen: TaskList
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

