import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'native-base';
import RootStack from './root-stack';
import {Provider} from 'react-redux'
import store from './store'



export default class App extends React.Component {
  render() {
    return (
      
      <Provider store={store}>
      <RootStack />
      </Provider>
  

    );
  }
}

