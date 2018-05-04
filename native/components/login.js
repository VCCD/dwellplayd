import React from 'react'
import {connect} from 'react-redux'
import {auth, me } from '../store/auth'
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Icon } from 'native-base';

    const LoginScreen = (props) => {
      const state = {}
      const {name, loginSubmit} = props
    return (
      <Container style={styles.container}>
        <Content>
          <Form name={name}>
            <Item inlineLabel>
            <Icon active name='person' />

              <Input name="email" onChangeText={text => state.email = text } placeholder='Email'/>
            </Item>
            <Item inlineLabel last>
            <Icon active name='key' />

              <Input onChangeText={(text) => state.password = text}  placeholder='Password'/>
            </Item>

          </Form>

          <Button full onPress={loginSubmit} style={styles.button}><Text style={styles.titleText}>Login</Text></Button>

            <Button full onPress={()=> console.log(state, 'state', props, 'props')} style={styles.button}>
              <Icon />
              <Text style={styles.titleText}>Sign in with Google</Text>
            </Button>
        </Content>
      </Container>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 3,
    flexDirection:"row",
    justifyContent:'space-between',
    backgroundColor: 'whitesmoke',
    alignItems: 'stretch',

  },

    titleText: {
    color: '#DBD56E',
    fontWeight: 'bold',
    fontSize: 14

  },
    button:{
      flex: 3,
      padding:10,
      alignItems: "stretch",
      backgroundColor: '#403D58',
    }
});

//mapLogin = null
//mapDispatch = null

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    //error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    loginSubmit (evt) {
      //console.log(evt.target)
      // evt.preventDefault()

      // const email = evt.target.email.value
      // const password = evt.target.password.value
       dispatch(auth(this.state))
    },


  }
}
export default connect(mapLogin, mapDispatch)(LoginScreen)
