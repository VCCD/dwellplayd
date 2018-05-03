import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Card, CardItem} from 'native-base'

const TaskCard = (props) => {
  const {task} = props
  return (
    <Card >
      <CardItem style={styles.header} button onPress={() => props.handleClick(task)}>
        <View style={styles.left}>
          <Text>{task.task}</Text>
          <Text>Last completed {task.daysSinceCompleted} days ago</Text>
        </View>
        <Text style={styles.score} >{task.pts}</Text>
      </CardItem>
    </Card>
  )
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#fff',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  left: {
    height: 50,
    display: 'flex',
    justifyContent: 'space-between'
  },
  score: {
    fontSize: 30,
    fontWeight: 'bold',
  }
});

export default TaskCard
