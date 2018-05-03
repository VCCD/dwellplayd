import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Root } from 'native-base';
import RootStack from './root-stack'


export default class App extends React.Component {
  render() {
    return (
      <Root>
        <RootStack />
      </Root>
    );
  }
}


