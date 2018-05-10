import React from 'react';
import { StackNavigator } from 'react-navigation';
import {
  LoginScreen,
  Signup,
  Welcome,
  NoCommunity,
} from './components'

const RootStack = StackNavigator ({
  Welcome: {
    screen: Welcome
  },
  Login: {
    screen: LoginScreen
  },
  Signup: {
    screen: Signup
  },
}, {
  // Default config for all screen
  title: 'Main',
  initialRouteName: 'Welcome',
  headerMode: 'none'
})

export default RootStack

