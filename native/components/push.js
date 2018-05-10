import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Button} from 'native-base'
import {sendPushNotifications} from '../store/push'
import {connect} from 'react-redux'
import { updateUser } from '../store'

import Expo from 'expo';

const PUSH_ENDPOINT = 'http://172.17.20.52:8080/api';

let token =''
async function getToken() {
  if (!Expo.Constants.isDevice) {
    return;
  }
  let { status } = await Expo.Permissions.askAsync(
    Expo.Permissions.NOTIFICATIONS,
  );
  if (status !== 'granted') {
    return;
  }
  token = await Expo.Notifications.getExpoPushTokenAsync();
  console.log('Our expo push token', token);
  /// Send this to a server

  return token
}

class Push extends Component {
  constructor(){
    super()
    this.state = {}
    this.pushToken = token
    
    
  }
  async componentDidMount () {
  
     
   
   await this.setState({"firstName": this.props.user.firstName, "lastName": this.props.user.lastName, "email": this.props.user.email})
   if(this.props.user.pushToken === null){
    this.state['pushToken'] = await getToken();
   }
   
    this.listener = await Expo.Notifications.addListener(this.handleNotification);
     
 


  }

  componentWillUnmount() {
    this.listener && this.listener.remove();
  }

  handleNotifications = () => {
    //pushNotifications()
    
  //   console.log(
  //     `Push notification with data: ${JSON.stringify(data)}`,

  //   );
  var obj = {
    firstName: this.state.firstName,
    lastName: this.state.lastName,
    email: this.state.email, 
    pushToken: this.state.pushToken
  }


   this.props.pushTokenToDBS(this.props.user.id, obj)
   console.log('this is the state', obj)
   
  };
  consolelogState =  () => {
    //pushNotifications()
    
  //   console.log(
  //     `Push notification with data: ${JSON.stringify(data)}`,

  //   );
   console.log('this is the state', this.state, this.props.user.id, this.state.pushToken)
   
  };


  render() {
   
    return (
      <View style={styles.container}>
        <Button rounded onPress={this.handleNotifications}><Text>Push test</Text></Button>
        <Button rounded onPress={this.consolelogState}><Text>consolelog state</Text></Button>
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

const mapState = ({user}) => ({user});

const mapDispatch = (dispatch) => {
  return {
    pushTokenToDBS: (userId, obj) => {
      dispatch(updateUser(userId, obj))
     
    }
  }
}
export default connect (mapState, mapDispatch)(Push)
