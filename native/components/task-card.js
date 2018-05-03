import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Card, CardItem } from 'native-base'

const TaskCard = (props) => {
  return (
  <TouchableOpacity key={props.task.daysSinceCompleted} onPress={() => console.log('yo')} >
    <Card>
      <CardItem header style={styles.header} onPress={() => console.log('yo')}>
        <Text>{props.task.task}</Text>
        <Text >{props.task.pts}</Text>
      </CardItem>
      <CardItem>
        <Text>Last completed {props.task.daysSinceCompleted} days ago</Text>
      </CardItem>
    </Card>
  </TouchableOpacity>
  )
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

export default TaskCard
