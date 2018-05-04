import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Container,
  Header,
  Content,
  ListItem,
  Right,
  Radio,
  Left,
  Body,
  Title,
  Form,
  Item,
  Label,
  Input
} from 'native-base';

const dummyTasks = [
  { id: 1, task: 'Clean bathroom', value: 1, selected: false },
  { id: 2, task: 'Take out trash', value: 1, selected: false },
  { id: 3, task: 'Vacuum living room', value: 1, selected: false },
  { id: 4, task: 'Sweep kitchen', value: 1, selected: false },
  { id: 5, task: 'Random task', value: 1, selected: false },
]

export default class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      taskList: dummyTasks,
    }
  }

  handleClick = (id) => {
    const taskList = this.state.taskList.map(task => {
      if (task.id === id) return {...task, selected: !task.selected}
      else return task
    })
    this.setState({ taskList })
  }

  render() {
    return (
      <Container>
        <Content>
        {
          this.state.taskList.map(task => (
            <ListItem
              key={task.id}
              value={task.id}
              onPress={() => this.handleClick(task.id)}>
            <Text>{task.task}</Text>
            <Right>
              <Radio
                selected={task.selected} />
            </Right>
          </ListItem>
          ))
        }
        <Form>
            <Item floatingLabel>
              <Input placeholder="Enter a custom task" />
            </Item>
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

  titleText: {
    color: '#DBD56E',
    fontWeight: 'bold',

  },
});