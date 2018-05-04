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
import store, { getAllTasksFromServer, addTaskFromServerThunkerator } from '../store'
import { connect } from 'react-redux';

class SelectTasks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      taskInput: '',
    }
  }

  handleClick = (id) => {
    const taskList = this.props.taskList.map(task => {
      if (task.id === id) return { ...task, selected: !task.selected }
      else return task
    })
    store.dispatch(getAllTasksFromServer(taskList))
  }

  handleChangeTask = (taskInput) => {
    this.setState({taskInput})
  }

  handleAddTask = () => {
    const newTask = {
      name: this.state.taskInput,
    }
    store.dispatch(addTaskFromServerThunkerator(newTask))
    this.setState({taskInput: ''})
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
            this.props.taskList.map(task => (
              <ListItem
                key={task.id}
                value={task.id}
                onPress={() => this.handleClick(task.id)}>
                <Text>{task.task.name}</Text>
                <Right>
                  <Radio
                    selected={task.selected || false} />
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

const mapState = ({ taskList }) => ({ taskList })

const mapDispatch = null

export default connect(mapState, mapDispatch)(SelectTasks)
