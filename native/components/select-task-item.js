import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, ListView, Slider, View } from 'react-native';
import { FrequencySlider } from '../components'
import Modal from 'react-native-modal'
import {
  Container,
  Content,
  Card,
  CardItem,
  Icon,
  List,
  Item,
  Input,
  Button,
} from 'native-base';
import store, { editCommunityTask } from '../store'

class SelectTaskItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comTask: this.props.comTask,
    }
  }

  submitSlide = () => {
    store.dispatch(editCommunityTask(this.state.comTask))
  }

  change = (value) => {
    this.setState({comTask: { ...this.state.comTask, value }})
  }

  render() {
    const { color, inactive, activateTask } = this.props
    return (
      <Card key={this.state.comTask.id} style={this.props.styles.card}>
        <CardItem style={this.props.styles.header} >
          <View style={this.props.styles.left}>
            <Text style={{color, fontSize: 16, fontWeight: 'bold' }}>{this.state.comTask.task.name}</Text>
            <Text style={this.props.styles.textSlide}>
              {
                this.state.comTask.value === 1
                  ? `Every day`
                  : `Every ${this.state.comTask.value} days`
              }
            </Text>
          </View>
            {
              inactive
                ? <Button onPress={() => activateTask(this.state.comTask)} ><Text style={{ marginRight: 15, fontSize: 15, fontWeight: 'bold', color, alignSelf: 'flex-start' }}>
                    Activate
                  </Text></Button>
                : ''
            }
        </CardItem>
        <FrequencySlider
          change={this.change}
          value={this.state.comTask.value}
          submitSlide={this.submitSlide} />
      </Card>
        )
  }
}


export default SelectTaskItem
