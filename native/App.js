/* eslint react/prefer-stateless-function: 0 class-methods-use-this:0*/
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Provider} from 'react-redux'
import store from './store'
import Routes from './routes'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}
