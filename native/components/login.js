import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store/auth'
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Icon } from 'native-base';




    const LoginScreen = (props) => {
      const state = {}
      const {name, handleSubmit} = props
    return (

     

      <Container style={styles.container}>
      

        <Content>
          <Form name={name}>
            <Item inlineLabel>
              <Label style={styles.titleText} >Email</Label>
              <Input name="email" onChangeText={text => state.email = text } />
            </Item>
            <Item inlineLabel last>
              <Label style={styles.titleText} name="password">Password</Label>
              <Input onChangeText={(text) => state.password = text} />
            </Item>
            <Button block onPress={loginSubmit}><Text>Login</Text></Button>
          </Form>
          
          <Button block onPress={(event)=> console.log(event.target.value)}><Text>Create Account</Text></Button>
            <Button block onPress={()=> console.log(state)}>
              <Icon />
              <Text>Sign in with Google</Text>
            </Button>
        </Content>
        
      </Container>

    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

    titleText: {
    color: '#DBD56E',
    fontWeight: 'bold',

  },
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
      console.log(evt.target)
      // evt.preventDefault()
     
      // const email = evt.target.email.value
      // const password = evt.target.password.value
       dispatch(auth(this.state))
    }
  }
}
export default connect(mapLogin, mapDispatch)(LoginScreen)