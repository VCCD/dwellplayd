import React from 'react';
import { StackNavigator } from 'react-navigation';
import {
  HomeScreen,
  TaskList,
  LoginScreen,
  FrequencySelector,
  Scores,
  SelectTasks,
  PlayerDetail,
  PlayerDetailEdit,
  Signup,
  Sidebar
} from './components'

const RootStack = StackNavigator ({
  Home: {
    screen: HomeScreen
  },
 Tasks: {
    screen: TaskList
  },
  Scores: {
    screen: Scores
  },
  Login: {
    screen: LoginScreen
  },
  Profile: {
    screen: PlayerDetail
  },
  PlayerDetailEdit: {
    screen: PlayerDetailEdit
  },
  FrequencySelector: {
    screen: FrequencySelector
  },
  SelectTasks: {
    screen: SelectTasks
  },
  DrawerOpen:{
    screen: Sidebar
  },
  Signup: {
    screen: Signup
  }
})

export default RootStack

