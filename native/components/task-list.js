import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity, RefreshControl, ScrollView } from 'react-native';
import { Container, Header, Content, Button, ActionSheet } from 'native-base'
import TaskCard from './task-card'
import { fetchCommunityTaskItems, completeTaskItem, getAllCommunityTasksFromServerThunkerator } from '../store'

const BUTTONS = [
  "Complete",
  "Cancel"
];
const CANCEL_INDEX = 1;

class TaskList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  static navigationOptions = {
    title: 'Current Tasks'
  }

  componentDidMount = () => {
    const { getTaskItems, getCommunityTasks, user } = this.props
    getTaskItems(user.communityId)
    getCommunityTasks(user.communityId)
  }

  handleClick = clickedTask => {
    const { user } = this.props
    const { completeTask } = this.props
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        title: clickedTask.task.name
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          clickedTask.userId = user.id
          clickedTask.completed = new Date()
          completeTask(clickedTask)
        }
      }
    )
  }
  refresh = () => {
    const { getTaskItems, user } = this.props
    console.log(`refresh`)
    getTaskItems(user.communityId)
    this.setState({ refreshing: false })
  }

  render() {
    const { taskItems } = this.props
    const filteredTaskItems = taskItems && taskItems.filter(taskItem => !taskItem.completed)
    const sortedTaskItems = filteredTaskItems && filteredTaskItems.sort((a, b) => b.points - a.points)

    return (
      <Container style={styles.list}>
        <ScrollView refreshControl={<RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.refresh} />}>
          <Content contentContainerStyle={styles.content}>
            {sortedTaskItems && sortedTaskItems.map(taskItem => {
              return (
                <TaskCard style={styles.card} key={taskItem.id} taskItem={taskItem} handleClick={this.handleClick} />
              )
            })}
          </Content>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#8C9A9E',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  content: {
    margin: 5,
  }
});


//Render task items that are not completed
const mapState = state => {
  return {
    user: state.user,
    community: state.community,
    communityTasks: state.communityTasks,
    taskItems: state.taskItems,
  }
}

const mapDispatch = dispatch => {
  return {
    getTaskItems: communityId => {
      dispatch(fetchCommunityTaskItems(communityId))
    },
    completeTask: taskItem => {
      dispatch(completeTaskItem(taskItem))
    },
    getCommunityTasks: communityId => {
      dispatch(getAllCommunityTasksFromServerThunkerator(communityId))
    }
  }
}

export default connect(mapState, mapDispatch)(TaskList)
