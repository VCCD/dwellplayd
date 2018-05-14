import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FrequencySlider } from '../components'
import {
  Card,
  CardItem,
  Button,
} from 'native-base';
import store, { editCommunityTask } from '../store'


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#93B7BE',
    padding: 12,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#8C9A9E',
  },
});
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
    const { inactive, activateTask } = this.props
    return (
      <Card key={this.state.comTask.id} style={this.props.styles.card}>
        <CardItem style={this.props.styles.header} >
          <View style={this.props.styles.left}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#747578' }}>{this.state.comTask.task.name}</Text>
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
                ? <Button rounded style={styles.button} onPress={() => activateTask(this.state.comTask)} ><Text style={{ fontSize: 15, fontWeight: 'bold', color: '#747578' }}>
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
