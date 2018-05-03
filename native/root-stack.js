import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {HomeScreen, SelectTasks, LoginScreen, Scores, PlayerDetail, PlayerDetailEdit} from './components'


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
  PlayerDetail: {
    screen: PlayerDetail
  },
  PlayerDetailEdit: {
    screen: PlayerDetailEdit
  },
})

export default RootStack

