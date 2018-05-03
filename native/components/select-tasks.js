import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Container, Header, Content, List, ListItem, Button, Right, Card, CardItem, Body} from 'native-base'


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
    const sortedTasks = dummyTasks.sort((a,b) => b['pts'] - a['pts'])
    return (
      <Container style={styles.list}>
          <Content>
          {sortedTasks.map(task => {
            return (
              <TouchableOpacity key={task.daysSinceCompleted} onPress={() => console.log('yo')} >
                <Card>
                  <CardItem header style={styles.header} onPress={() => console.log('yo')}>
                    <Text>{task.task}</Text>
                    <Text style={styles.score}>{task.pts}</Text>
                  </CardItem>
                  <CardItem>
                    <Text>Last completed {task.daysSinceCompleted} days ago</Text>
                  </CardItem>
                </Card>
              </TouchableOpacity>
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
