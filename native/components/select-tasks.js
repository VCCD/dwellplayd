import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Container, Header, Content, List, ListItem, Button} from 'native-base'

export default class SelectTasks extends React.Component {
  render() {
    return (
      <Container style={styles.list}>
          <Content>
            <List>
              <ListItem><Text>Clean Living Room</Text></ListItem>
              <ListItem><Text>Sweep the Kitchen</Text></ListItem>
              <ListItem><Text>Take out the Trash</Text></ListItem>
              <ListItem><Text>Clean the Bathroom</Text></ListItem>
            </List>
          <Button onPress={() => this.props.navigation.navigate('Select')} style={styles.button}><Text>Click Me</Text></Button>
          <Button onPress={() => this.props.navigation.navigate('Home')}><Text>Go Back</Text></Button>
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
