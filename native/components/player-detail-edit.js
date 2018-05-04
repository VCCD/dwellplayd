import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Form, Item, Label, Input, Button, Text } from 'native-base'

export default class PlayerDetailEdit extends React.Component {
  static navigationOptions = {
    title: 'Edit'
  }

  render() {
    const { name, email } = this.state
    return (
      <Container style={styles.list}>
        <Content>
          <Form>
              <Input placeholder={name} />
              <Input placeholder={email} />
          </Form>
          <Button onSubmit={this.onSubmit}>
            <Text>Submit</Text>
          </Button>
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
