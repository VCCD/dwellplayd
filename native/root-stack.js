import React from 'react';
import { StackNavigator } from 'react-navigation';
import {
  HomeScreen,
  TaskList,
  LoginScreen,
  FrequencySelector,
  Scores,
  SelectTasks,
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
  FrequencySelector: {
    screen: FrequencySelector
  },
  SelectTasks: {
    screen: SelectTasks
  }
})

export default RootStack

