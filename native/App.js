import React from 'react';
import { StyleSheet, View } from 'react-native';
import RootStack from './root-stack';
import {Provider} from 'react-redux'
import store from './store'
import { Root } from 'native-base';


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
      <Root>
      <RootStack />
      </Root>
      </Provider>
    );
  }
}

