import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, RefreshControl, ScrollView } from 'react-native';
import { Container, Content, ActionSheet } from 'native-base'
import TaskCard from './past-task-card'
import { fetchCommunityTaskItems, completeTaskItem, fetchUserScores } from '../store'

const BUTTONS = [
  'Dispute',
  'Cancel'
];
const CANCEL_INDEX = 1;

class PastTasks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentDidMount = () => {
  }

  static navigationOptions = {
    title: 'Past Tasks'
  }

  handleClick = clickedTask => {
    const { user, community } = this.props
    const { completeTask } = this.props
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        title: `${clickedTask.task.name} completed by ${clickedTask.completer.firstName}`
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          clickedTask.userId = user.id
          clickedTask.completed = new Date()
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
    const { taskItems, community } = this.props
    const filteredTaskItems = taskItems && taskItems.filter(taskItem => taskItem.completed && taskItem.completed.split(`-`)[1] - 1 === new Date().getMonth())
    const sortedTaskItems = filteredTaskItems && filteredTaskItems.sort((a, b) => Date.parse(b.completed) - Date.parse(a.completed))
    return (
      <Container style={styles.list}>
      <ScrollView refreshControl={<RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this.refresh} />}>
        <Content contentContainerStyle={styles.content}>
        {sortedTaskItems && sortedTaskItems.map(taskItem => {
          taskItem.completer = community.users.find(user => user.id === taskItem.userId)
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

export default connect(mapState, mapDispatch)(PastTasks)
