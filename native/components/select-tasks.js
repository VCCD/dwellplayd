import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Container, Header, Content, List, ListItem, Button, Right, Card, CardItem, Body} from 'native-base'
import TaskCard from './task-card'


const dummyTasks = [
  {task: 'Clean bathroom', daysSinceCompleted: 6, pts: 7},
  {task: 'Take out trash', daysSinceCompleted: 1, pts: 0},
  {task: 'Vacuum living room', daysSinceCompleted: 10, pts: 10},
  {task: 'Sweep kitchen', daysSinceCompleted: 2, pts: 1},
  {task: 'Random task 1', daysSinceCompleted: 16, pts: 17},
  {task: 'Random task 2', daysSinceCompleted: 11, pts: 20},
  {task: 'Random task 3', daysSinceCompleted: 13, pts: 12},
  {task: 'Random task 4', daysSinceCompleted: 7, pts: 19},
]


export default class SelectTasks extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      tasks: {},
    }
  }

  render() {
    key = 1;
    const sortedTasks = dummyTasks.sort((a,b) => b['pts'] - a['pts'])
    return (
      <Container style={styles.list}>
          <Content>
          {sortedTasks.map(task => {
            return (
              <TaskCard key={key++} task={task} />
            )
          })}
          </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#fff',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});
