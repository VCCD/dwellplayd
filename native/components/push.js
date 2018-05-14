import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateUser } from '../store'

import Expo from 'expo';

class Push extends Component {

  getToken = async () => {
    if (!Expo.Constants.isDevice) {
      return;
    }
    let { status } = await Expo.Permissions.askAsync(
      Expo.Permissions.NOTIFICATIONS,
    );
    if (status !== 'granted') {
      return;
    }
    const pushToken = await Expo.Notifications.getExpoPushTokenAsync();
    const { user, pushTokenToDBS } = this.props
    console.log('inside the push comp', user)
    user.pushToken = pushToken
    pushTokenToDBS(user.id, user)
  }

  componentDidMount() {
    this.getToken();
  }

  render() {
    return null
  }
}

const mapState = ({ user }) => ({ user });

const mapDispatch = (dispatch) => {
  return {
    pushTokenToDBS: (userId, obj) => {
      dispatch(updateUser(userId, obj))

    }
  }
}
export default connect(mapState, mapDispatch)(Push)
