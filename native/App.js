import React from 'react';
<<<<<<< HEAD
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'native-base';
=======
import { StyleSheet, Text, View } from 'react-native';
import RootStack from './root-stack'
>>>>>>> master

export default class App extends React.Component {
  render() {
    return (
<<<<<<< HEAD
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Button rounded><Text>Login</Text></Button>
      </View>
=======
      <RootStack />
>>>>>>> master
    );
  }
}
