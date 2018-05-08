import React from 'react'
import { View } from 'react-native'
import store, { logoutUser } from '../store'

export default class Logout extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount () {
    store.dispatch(logoutUser())
  }
  render() {
    return <View></View>
  }
}

