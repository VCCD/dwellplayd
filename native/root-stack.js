import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {HomeScreen, TaskList, LoginScreen, FrequencySelector, Scores, PlayerDetail, PlayerDetailEdit} from './components'

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
  PlayerDetail: {
    screen: PlayerDetail
  },
  PlayerDetailEdit: {
    screen: PlayerDetailEdit
  },
  FrequencySelector: {
    screen: FrequencySelector
  },
})

export default RootStack

