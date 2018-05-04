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
  Input,
  Button,
} from 'native-base';

const dummyTasks = [
  { id: 1, task: 'Clean bathroom', selected: false },
  { id: 2, task: 'Take out trash', selected: false },
  { id: 3, task: 'Vacuum living room', selected: false },
  { id: 4, task: 'Sweep kitchen', selected: false },
  { id: 5, task: 'Random task', selected: false },
]

export default class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      taskList: dummyTasks,
      taskInput: '',
    }
  }

  handleClick = (id) => {
    const taskList = this.state.taskList.map(task => {
      if (task.id === id) return { ...task, selected: !task.selected }
      else return task
    })
    this.setState({ taskList })
  }

  handleChangeTask = (taskInput) => {
    this.setState({taskInput})
  }

  handleAddTask = () => {
    const newTask = {
      id: this.state.taskList.length + 1,
      task: this.state.taskInput,
      selected: true,
    }
    this.setState({
      taskList: [...this.state.taskList, newTask],
      taskInput: '',
    })
  }

  handleSubmitTasks = () => {
    console.log(this.state.taskList.filter(task => task.selected).map(task => {
      delete task.selected
      return task
    }))
    this.props.navigation.navigate('Home');
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
              <Input onChangeText={this.handleChangeTask} onSubmitEditing={this.handleAddTask} placeholder="Enter a custom task" value={this.state.taskInput} />
            </Item>
          </Form>
            <Button onPress={this.handleSubmitTasks}><Text>Submit Tasks</Text></Button>
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