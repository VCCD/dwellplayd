import React from 'react';
import { StyleSheet, Text, Slider, View } from 'react-native';
import { Container, Content, Button, Card, CardItem, Body } from 'native-base'
import store, { getAllCommunityTasksFromServerThunkerator, editCommunityTask, submitCommunityTaskFrequenciesThunkerator } from '../store'
import { connect } from 'react-redux'

class FrequencySelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTask: {},
    }
  }

  componentDidMount () {
    store.dispatch(getAllCommunityTasksFromServerThunkerator(this.props.community.id))
  }

  change = (value) => {
    store.dispatch(editCommunityTask({...this.state.activeTask, value}))
  }

  handleSubmit = () => {
    store.dispatch(submitCommunityTaskFrequenciesThunkerator(this.props.community.id, this.props.communityTasks))
    this.props.navigation.navigate('Invite')
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          {
            this.props.communityTasks.map(item => (
              <Card key={item.taskId} >
                <CardItem>
                  <Body>
                    <Text>
                      {item.task.name}
                    </Text>
                    <Text>
                      {
                        item.value === 1
                          ? `Every day`
                          : `Every ${item.value} days`
                      }
                    </Text>
                  </Body>
                </CardItem>
                <Slider
                  style={{marginLeft: 20, marginRight: 20}}
                  step={1}
                  maximumValue={30}
                  minimumValue={1}
                  onTouchStart={() => this.setState({ activeTask: item })}
                  onTouchEnd={() => this.setState({ activeTask: {} })}
                  onValueChange={this.change}
                  value={item.value} />
              </Card>
            ))
          }
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Button rounded
              style={styles.button}
              onPress={this.handleSubmit}><Text>Submit</Text></Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#8C9A9E',
  },
  list: {
    backgroundColor: '#fff',
  },
  button: {
    padding: 10,
    margin: 10,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#D4F5F5',
  }
})

const mapState = ({ communityTasks, community }) => ({ communityTasks, community })

const mapDispatch = null

export default connect(mapState, mapDispatch)(FrequencySelector)
