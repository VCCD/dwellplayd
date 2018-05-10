import React from 'react'
import { View } from 'react-native'
import store, { logout } from '../store'

export default class Logout extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount () {
    store.dispatch(logout())
  }
  render() {
    return <View></View>
  }
}

