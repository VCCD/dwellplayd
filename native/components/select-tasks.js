import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Container, Header, Content, List, ListItem, Button, Right, Card, CardItem, Body} from 'native-base'


const dummyTasks = [
  {task: 'Clean bathroom', daysSinceCompleted: 6, pts: 7},
  {task: 'Take out trash', daysSinceCompleted: 1, pts: 0},
  {task: 'Vacuum living room', daysSinceCompleted: 10, pts: 10},
  {task: 'Sweep kitchen', daysSinceCompleted: 2, pts: 1},
  {task: 'Random task', daysSinceCompleted: 16, pts: 17},
  {task: 'Random task', daysSinceCompleted: 11, pts: 20},
  {task: 'Random task', daysSinceCompleted: 13, pts: 12},
  {task: 'Random task', daysSinceCompleted: 7, pts: 19},
]


export default class SelectTasks extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      tasks: {},
    }
  }

  render() {
    const ok = this.state.tasks
    const sortedTasks = mergeSortTasks(dummyTasks)
    return (
      <Container style={styles.list}>
          <Content>
          {sortedTasks.map(task => {
            return (
              <Card key={task.daysSinceCompleted}>
                <CardItem header style={styles.header}>
                  <Text>{task.task}</Text>
                  <Text style={styles.score}>{task.pts}</Text>
                </CardItem>
                <CardItem>
                  <Text>Last completed {task.daysSinceCompleted} days ago</Text>
                </CardItem>
              </Card>
            )
          })}
          </Content>
      </Container>
    );
  }
}

const mergeSortTasks = (tasks) => {
  if (tasks.length === 1) {
    return tasks
  }
  const middle = Math.floor(tasks.length / 2)
  const left = tasks.slice(0, middle)
  const right = tasks.slice(middle)
  return merge(
    mergeSortTasks(left),
    mergeSortTasks(right),
  )
}

const merge = (left, right) => {
  let result = []
  let indexLeft = 0
  let indexRight = 0
  while (indexLeft < left.length && indexRight < right.length) {
    if (left[indexLeft].pts > right[indexRight].pts) {
      result.push(left[indexLeft])
      indexLeft++
    } else {
      result.push(right[indexRight])
      indexRight++
    }
  }
  return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
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
