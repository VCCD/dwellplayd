import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Button, ActionSheet } from 'native-base'
import TaskCard from './task-card'
import { fetchCommunity, fetchCommunityTaskItems } from '../store'

const BUTTONS = [
  "Complete",
  "Cancel"
];
const CANCEL_INDEX = 1;

class TaskList extends React.Component {

  static navigationOptions = {
    title: 'Current Tasks'
  }

  componentDidMount = () => {
    const { getTaskItems, user } = this.props
    getTaskItems(user.communityId)
  }

  handleClick = clickedTask => {
    let { taskItems } = this.props
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        title: clickedTask.task
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          console.log(clickedTask)
        }
      }
    )
  }

  render() {
    const { taskItems } = this.props
    const filteredTaskItems = taskItems && taskItems.filter(taskItem => !taskItem.completed)
    const sortedTaskItems = filteredTaskItems && filteredTaskItems.sort((a, b) => b.points - a.points)

    return (
      <Container style={styles.list}>
        <Content contentContainerStyle={styles.content}>
          {sortedTaskItems && sortedTaskItems.map(taskItem => {
            return (
              <TaskCard style={styles.card} key={taskItem.id} taskItem={taskItem} handleClick={this.handleClick} />
            )
          })}
        </Content>
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
    taskItems: state.taskItems,
  }
}

const mapDispatch = dispatch => {
  return {
    getCommunity: id => {
      dispatch(fetchCommunity(id))
    },
    getTaskItems: communityId => {
      dispatch(fetchCommunityTaskItems(communityId))
    }
  }
}

export default connect(mapState, mapDispatch)(TaskList)
