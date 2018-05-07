import React from 'react';
import { StackNavigator } from 'react-navigation';
import DrawerNavigation from './drawer-navigation'
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
} from './components'

const RootStack = StackNavigator ({
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
  SelectTasks: {
    screen: SelectTasks
  },
  drawerStack: {
    screen: DrawerNavigation
  },
  Signup: {
    screen: Signup
  }
}, {
  // Default config for all screen
  title: 'Main',
  initialRouteName: 'Home'
})

export default RootStack

