import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Card, CardItem } from 'native-base'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable';
import Image from 'react-native-image-progress';
import ProgressPie from 'react-native-progress/Pie';
const AnimatedCard = Animatable.createAnimatableComponent(Card);

const roundToTenths = num => {
  return Math.round(num * 10) / 10
}

class TaskCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      imageViewable: false,
    }
  }

  handleClick = (taskItem) => {
    if (this.props.fromScores) {
      this.setState({imageViewable: !this.state.imageViewable})
    }
    else {
      this.props.handleClick(taskItem)
    }
  }

  render () {
    const { taskItem } = this.props
    return (
      <AnimatedCard animation="bounceInUp" duration={1500}>
        {
          this.state.imageViewable
            ? <CardItem button onPress={() => this.handleClick(taskItem)}>
              <Image
                source={{uri: taskItem.imgUrl}}
                style={styles.img}
                indicator={ProgressPie}
                indicatorProps={{
                  size: 80,
                  color: '#D4F5F5',
                  unfilledColor: '#747578'
                }}
                /></CardItem>
            : null
        }
        <CardItem button onPress={() => this.handleClick(taskItem)} style={styles.header}>
          <View style={styles.left}>
            <Text style={styles.text}>{taskItem.task.name}</Text>
            <Text style={styles.text}>completed {`${roundToTenths(taskItem.days)} ${taskItem.days === 1 ? `day` : `days`}`} ago</Text>
          </View>
          <Text style={styles.score} >{taskItem.points}</Text>
        </CardItem>
      </AnimatedCard>
    )
  }
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
  },
  img: {
    aspectRatio: 1,
    height: 400,
    flex: 1
  }
});

const mapState = state => {
  return {
    tasks: state.tasks,
  }
}

export default connect(mapState)(TaskCard)
