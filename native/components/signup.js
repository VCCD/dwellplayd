import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Icon } from 'native-base';

export default class Signup extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    }
  }

  render() {
    return(
      <Container>
        <View>
          <Form>
            <Item inlineLabel>
              <Label>First Name</Label>
              <Input name="firstName" placeholder="John" />
            </Item>

            <Item inlineLabel>
              <Label>Last Name</Label>
              <Input name="lastName" placeholder="Doe" />
            </Item>

            <Item inlineLabel>
              <Label>Email</Label>
              <Input name="email" placeholder="John@Doe.com" />
            </Item>

            <Item inlineLabel>
              <Label>Password</Label>
              <Input name="password" placeholder="guess" password={true}/>
            </Item>
          </Form>
        </View>
      </Container>
    )
  }

}
