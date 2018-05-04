import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Form, Item, Label, Input } from 'native-base'

export default class PlayerDetailEdit extends React.Component {
  static navigationOptions = {
    title: 'Edit'
  }
  render() {
    return (
      <Container style={styles.list}>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username </Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#fff',
  },
});
