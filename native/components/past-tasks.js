import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, RefreshControl, ScrollView, View } from 'react-native';
import { Container, Content, ActionSheet, Text } from 'native-base'
import TaskCard from './task-card'
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
    title: 'Completed'
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
  _renderNoTasks = () => {
    return (
    <View style={{height: '100%', backgroundColor: '#8C9A9E', justifyContent: 'center', alignItems: 'center'}}>
      <View style={{backgroundColor: '#8C9A9E', padding: 20, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: '#D4F5F5', fontWeight: 'bold'}}>No one has completed any tasks this month!</Text>
      </View>
    </View>
    )
  }
  render() {
    const { taskItems, community } = this.props
    const filteredTaskItems = taskItems && taskItems.filter(taskItem => taskItem.completed && taskItem.completed.split(`-`)[1] - 1 === new Date().getMonth())
    const sortedTaskItems = filteredTaskItems && filteredTaskItems.sort((a, b) => Date.parse(b.completed) - Date.parse(a.completed))
    return (
      <Container style={styles.list}>
      <Text style={styles.title}>completed tasks</Text>
        {sortedTaskItems.length ?
          <ScrollView refreshControl={<RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.refresh} />}>
            <Content contentContainerStyle={styles.content}>
              {sortedTaskItems.map(taskItem => {
                taskItem.completer = community.users.find(user => user.id === taskItem.userId)
                return (
                <TaskCard fromPast={true} style={styles.card} key={taskItem.id} taskItem={taskItem} handleClick={this.handleClick} />
                )
              })}
            </Content>
        </ScrollView>
        : this._renderNoTasks()}
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
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
    color: '#D4F5F5',
  },
  noTask: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#D4F5F5',
    fontSize: 24,
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
