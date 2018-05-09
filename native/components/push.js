import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Expo from 'expo';

const PUSH_ENDPOINT = 'http://172.17.20.52:8080/api';


async function getToken() {
  // Remote notifications do not work in simulators, only on device
  if (!Expo.Constants.isDevice) {
    return;
  }
  let { status } = await Expo.Permissions.askAsync(
    Expo.Permissions.NOTIFICATIONS,
  );
  if (status !== 'granted') {
    return;
  }
  let token = await Expo.Notifications.getExpoPushTokenAsync();
  console.log('Our expo push token', token);
  /// Send this to a server
}

export default class Push extends Component {
  componentDidMount() {
    getToken();

    this.listener = Expo.Notifications.addListener(this.handleNotification);
  }

  componentWillUnmount() {
    this.listener && this.listener.remove();
  }

  handleNotification = ({  data }) => {
    console.log(
      `Push notification with data: ${JSON.stringify(data)}`,
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Expo Notifications Test</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});

