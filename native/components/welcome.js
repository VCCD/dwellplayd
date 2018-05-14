import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import {Container, Button, Text, Content, Body} from 'native-base'
import { connect } from 'react-redux'

const Welcome = (props) => {
  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.content}>
        <Image style={styles.logo} source={require('../public/dwellplayd_logo.png')} />
        <Button style={styles.login} rounded onPress={() => props.navigation.navigate('Login')}>
          <Text style={styles.textLogin}>log in</Text>
        </Button>
        <Button style={styles.signup} rounded onPress={() => props.navigation.navigate('Signup')}>
          <Text style={styles.textSignup}>sign up</Text>
        </Button>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8C9A9E',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  login: {
    padding: 10,
    margin: 10,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#D4F5F5',
  },
  signup: {
    padding: 10,
    margin: 10,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#93B7BE',
  },
  logo: {
    marginTop: 220,
    height: 80,
    width: 250,
  },
  textLogin: {
    color: '#747578',
    fontSize: 20,
    fontWeight: `bold`
  },
  textSignup: {
    color: '#D4F5F5',
    fontSize: 20,
    fontWeight: `bold`
  }
});

const mapState = ({ user }) => ({ user })

const mapDispatch = null

export default connect(mapState, mapDispatch)(Welcome)
