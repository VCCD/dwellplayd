import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Card, CardItem } from 'native-base'
import { connect } from 'react-redux'

const roundToTenths = num => {
  return Math.round(num * 10) / 10
}

const TaskCard = (props) => {
  const { taskItem } = props
  const daysAgo = (new Date() - Date.parse(taskItem.completed)) / (1000 * 60 * 60 * 24)
  console.log(taskItem)
  return (
    <Card>
      <CardItem style={styles.header} button onPress={() => props.handleClick(taskItem)}>
        <View style={styles.left}>
          <Text style={styles.text}>{taskItem.task.name}</Text>
          <Text style={styles.text}>{`${taskItem.completer.firstName} - ${roundToTenths(daysAgo)} ${daysAgo === 1 ? `day` : `days`}`} ago</Text>
        </View>
        <Text style={styles.score} >{taskItem.points}</Text>
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
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  left: {
    height: 50,
    display: 'flex',
    justifyContent: 'space-between'
  },
  score: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: '#747578',
    fontSize: 16
  }
});

export default TaskCard
