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
            <Icon active name='lock' />
              
              <Input name="email" onChangeText={text => state.email = text } placeholder='Email'/>
            </Item>
            <Item inlineLabel last>
            <Icon active name='key' />
              
              <Input onChangeText={(text) => state.password = text}  placeholder='Password'/>
            </Item>
            <Button block onPress={loginSubmit} style={styles.button}><Text style={styles.titleText}>Login</Text></Button>
          </Form>
          
          
            <Button  block onPress={()=> console.log(state, 'state', props, 'props')} style={styles.button}>
              <Icon />
              <Text style={styles.titleText}>Sign in with Google</Text>
            </Button>
        </Content>
        
      </Container>

    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: "stretch"
  },

    titleText: {
    color: '#DBD56E',
    fontWeight: 'bold',
    fontFamily: 'Skia',

  },
    button:{
      flex: 3,
     
      backgroundColor: '#403D58'
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