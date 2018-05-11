import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, RefreshControl, ScrollView } from 'react-native';
import { Container, Content, ActionSheet } from 'native-base'
import TaskCard from './task-card'
import { fetchCommunityTaskItems, completeTaskItem, fetchUserScores} from '../store'

const BUTTONS = [
  'Provide the Proof',
  'Cancel'
];
const CANCEL_INDEX = 1;

class TaskList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentDidMount = () => {
    const { getCurrentScores, user } = this.props
    const month = new Date().getMonth()
    getCurrentScores(user.communityId, month)
  }

  static navigationOptions = {
    title: 'Current Tasks'
  }

  handleClick = clickedTask => {
    const { user, completeTask, navigation } = this.props
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        title: clickedTask.task.name
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          clickedTask.userId = user.id
          navigation.navigate('Camera', {
            direction: 'back',
            action: 'proof',
            task: clickedTask,
          })
        }
      }
    )
  }
  refresh = () => {
    const { getTaskItems, user } = this.props
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
    getCurrentScores: (communityId, month) => {
      dispatch(fetchUserScores(communityId, month))
    }
  }
}

export default connect(mapState, mapDispatch)(TaskList)
