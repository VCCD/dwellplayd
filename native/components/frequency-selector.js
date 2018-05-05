import React from 'react';
import { StyleSheet, Text, Slider, View } from 'react-native';
import { Container, Content, Button, Card, CardItem, Body } from 'native-base'

export default class FrequencySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dummyTasks,
      activeTask: null,
    };
  }

  change(value) {
    const newTasks = this.state.dummyTasks.map(task => {
      if (this.state.activeTask === task.id) return { ...task, value }
      else return task
    })
    this.setState({ dummyTasks: newTasks })
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          {
            this.state.dummyTasks.map(task => (
              <Card key={task.id} >
                <CardItem>
                  <Body>
                    <Text>
                      {task.task}
                    </Text>
                    <Text>
                      {
                        task.value === 1
                          ? `Every day`
                          : `Every ${task.value} days`
                      }
                    </Text>
                  </Body>
                </CardItem>
                <Slider
                  step={1}
                  maximumValue={30}
                  minimumValue={1}
                  onTouchStart={() => this.setState({ activeTask: task.id })}
                  onTouchEnd={() => this.setState({ activeTask: null })}
                  onValueChange={this.change.bind(this)}
                  value={task.value} />
              </Card>
            ))
          }
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Button
              style={{ margin: 30 }}
              onPress={() => {
                console.log(this.state.dummyTasks);
                this.props.navigation.navigate('Home')
              }}><Text>Submit</Text></Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const dummyTasks = [
  { id: 1, task: 'Clean bathroom', value: 1 },
  { id: 2, task: 'Take out trash', value: 1 },
  { id: 3, task: 'Vacuum living room', value: 1 },
  { id: 4, task: 'Sweep kitchen', value: 1 },
  { id: 5, task: 'Random task', value: 1 },
  { id: 6, task: 'Random task', value: 1 },
  { id: 7, task: 'Random task', value: 1 },
  { id: 8, task: 'Random task', value: 1 },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  list: {
    backgroundColor: '#fff',
  },
})

