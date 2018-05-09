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
import store, {
  editSingleTask,
  addTaskFromServerThunkerator,
  getAllTasksFromServerThunkerator,
  addCommunityTasksThunkerator,
  clearTasks,
} from '../store'
import { connect } from 'react-redux';

class SelectTasks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      taskInput: '',
    }
  }

  componentDidMount() {
    store.dispatch(getAllTasksFromServerThunkerator(this.props.community.id))
  }

  componentWillUnmount () {
    store.dispatch(clearTasks())
  }

  handleClick = (id) => {
    const taskArr = this.props.suggestedTasks.filter(task => task.id === id)
    taskArr[0].selected = !taskArr[0].selected
    store.dispatch(editSingleTask(taskArr[0]))
  }

  handleChangeTask = (taskInput) => {
    this.setState({ taskInput })
  }

  handleAddTask = () => {
    const newTask = {
      name: this.state.taskInput,
    }
    this.setState({ taskInput: '' })
    store.dispatch(addTaskFromServerThunkerator(newTask, true))
  }

  handleSubmitTasks = async () => {
    const taskIds = this.props.suggestedTasks.filter(task => task.selected).map(task => task.id)
    await store.dispatch(addCommunityTasksThunkerator(this.props.community.id, taskIds))
    this.props.navigation.navigate('FrequencySelector');
  }

  render() {
    return (
      <Container>
        <Content>
          {
            this.props.suggestedTasks.length && this.props.suggestedTasks.sort((a, b) => {
              var nameA = a.name.toUpperCase()
              var nameB = b.name.toUpperCase()
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0;
            }).map(task => (
              <ListItem
                key={task.id}
                value={task.id}
                onPress={() => this.handleClick(task.id)}>
                <Text>{task.name}</Text>
                <Right>
                  <Radio
                    selected={task.selected || false} />
                </Right>
              </ListItem>
            ))
          }
          <Form>
            <Item floatingLabel>
              <Input
                onChangeText={this.handleChangeTask}
                onSubmitEditing={this.handleAddTask}
                placeholder="Enter a custom task"
                value={this.state.taskInput}
              />
            </Item>
          </Form>
          <Button rounded style={styles.button} onPress={this.handleSubmitTasks}><Text>Submit Tasks</Text></Button>
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
  button: {
    padding: 10,
    margin: 10,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#D4F5F5',
  }
});

const mapState = ({ suggestedTasks, community }) => ({ suggestedTasks, community })

const mapDispatch = null

export default connect(mapState, mapDispatch)(SelectTasks)
