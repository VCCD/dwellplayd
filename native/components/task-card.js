import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Card, CardItem } from 'native-base'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable';
const AnimatedCard = Animatable.createAnimatableComponent(Card);

const roundToTenths = num => {
  return Math.round(num * 10) / 10
}

const TaskCard = (props) => {
  const { taskItem } = props
  return (
    <AnimatedCard animation="bounceInUp" duration={1500}>
      <CardItem style={styles.header} button onPress={() => props.handleClick(taskItem)}>
        <View style={styles.left}>
          <Text style={styles.text}>{taskItem.task.name}</Text>
          <Text style={styles.text}>Last completed {`${roundToTenths(taskItem.days)} ${taskItem.days === 1 ? `day` : `days`}`} ago</Text>
        </View>
        <Text style={styles.score} >{roundToTenths(taskItem.points)}</Text>
      </CardItem>
    </AnimatedCard>
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

const mapState = state => {
  return {
    tasks: state.tasks,
  }
}

const mapDispatch = dispatch => {
  return {
  }
}

export default connect(mapState, mapDispatch)(TaskCard)
