import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
export default class Login extends Component {
  render() {
    return (
      <Container>
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
            <Button rounded>Login</Button>
          </Form>
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

    baseText: {
    color: '#DBD56E',
    fontWeight: 'bold',

  },
});