import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Icon } from 'native-base';


export default class LoginScreen extends Component {
  render() {
    return (

     

      <Container style={styles.container}>
      
        <Header />
        <Content>
          <Form>
            <Item inlineLabel>
              <Label style={styles.titleText}>Username</Label>
              <Input />
            </Item>
            <Item inlineLabel last>
              <Label style={styles.titleText}>Password</Label>
              <Input />
            </Item>

          </Form>
          <Button block><Text>Login</Text></Button>
            <Button block>
              <Icon />
              <Text>Sign in with Google</Text>
            </Button>
        </Content>
        
      </Container>

    );
  }
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