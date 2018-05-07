import React from 'react'
import { View, Button } from 'react-native'
import { connect } from 'react-redux'

const Welcome = (props) => {
  return (
    <View>
      <Button title="LOG IN" onPress={props.navigation.navigate('Login')} />
      <Button title="SIGN UP" onPress={props.navigation.navigate('Signup')} />
    </View>
  )
}

const mapState = ({ user }) => ({ user })

const mapDispatch = null

export default connect(mapState, mapDispatch)(Welcome)
