import React, { Component } from 'react';
import { StyleSheet, Text, ListView, Slider, View } from 'react-native';
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
import store, {
  playThunkerator,
  editCommunityTask,
  submitCommunityTaskFrequenciesThunkerator,
  getSuggestedTasksFromServerThunkerator,
  addCustomCommunityTaskThunkerator,
  deleteCommunityTaskThunkerator,
} from '../store'
import { connect } from 'react-redux';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
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

class SelectTasks extends Component {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      taskInput: '',
      activeTask: {},
    }
  }

  componentDidMount() {
    if (!this.props.communityTasks.length) {
      store.dispatch(getSuggestedTasksFromServerThunkerator(this.props.community.id))
    }
  }

  componentWillUnmount() {
    store.dispatch(submitCommunityTaskFrequenciesThunkerator(this.props.community.id, this.props.communityTasks))
  }

  handleChangeTask = (taskInput) => {
    this.setState({ taskInput })
  }

  handleAddTask = () => {
    const newTask = {
      name: this.state.taskInput,
    }
    this.setState({ taskInput: '', inActiveTasks: true })
    store.dispatch(addCustomCommunityTaskThunkerator(newTask, this.props.community.id))
  }

  change = (value) => {
    store.dispatch(editCommunityTask({ ...this.state.activeTask, value }))
  }

  deleteRow(secId, rowId, rowMap, data) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    store.dispatch(deleteCommunityTaskThunkerator(this.props.communityTasks[rowId]))
  }

  activateTask = async (task) => {
    console.log(task)
    await store.dispatch(submitCommunityTaskFrequenciesThunkerator(this.props.community.id, this.props.communityTasks))
    await store.dispatch(playThunkerator(task))
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add / Edit Tasks'
    }
  }

  render() {
    const communityTasks =
      this.props.communityTasks.sort((a, b) => {
        const aInactive = !this.props.taskItems.some(task => task.taskId === a.task.id && !task.completed)
        const bInactive = !this.props.taskItems.some(task => task.taskId === b.task.id && !task.completed)
        var nameA = a.task.name.toUpperCase()
        var nameB = b.task.name.toUpperCase()
        if (aInactive && !bInactive) return -1
        else if (!aInactive && bInactive) return 1
        else if (nameA < nameB) return -1
        else if (nameA > nameB) return 1
        return 0
      })



    return (
      <Container>
        <Content>
          <Item
            rounded
            style={{
              marginLeft: 10,
              margin: 10,
              paddingLeft: 10,
            }}>
            <Input
              onChangeText={this.handleChangeTask}
              onSubmitEditing={this.handleAddTask}
              placeholder="Enter a custom task"
              value={this.state.taskInput}
            />
          </Item>
          <List
            dataSource={this.ds.cloneWithRows(communityTasks)}
            renderRow={comTask => {
              const inactive = !this.props.taskItems.some(task => task.taskId === comTask.task.id && !task.completed)
              const color = inactive ? 'red' : '#747578'
              return (
              <Card key={comTask.id}>
                <CardItem style={styles.header} >
                  <View style={styles.left}>
                    <Text style={{color, fontSize: 16, fontWeight: 'bold' }}>{comTask.task.name}</Text>
                    <Text style={styles.text}>
                      {
                        comTask.value === 1
                          ? `Every day`
                          : `Every ${comTask.value} days`
                      }
                    </Text>
                  </View>
                    {
                      inactive
                        ? <Button transparent onPress={() => this.activateTask(comTask)} ><Text style={{ marginRight: 15, fontSize: 15, fontWeight: 'bold', color }}>
                            Activate
                          </Text></Button>
                        : ''
                    }
                </CardItem>
                <Slider
                  style={{ marginLeft: 20, marginRight: 20 }}
                  step={1}
                  maximumValue={30}
                  minimumValue={1}
                  onTouchStart={() => this.setState({ activeTask: comTask })}
                  onTouchEnd={() => this.setState({ activeTask: {} })}
                  onValueChange={this.change}
                  value={comTask.value} />
              </Card>
            )}}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              (<Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap, data)}>
                <Icon active name="trash" />
              </Button>)}
            rightOpenValue={-75}
          />

        </Content>
      </Container>

    );
  }
}


const mapState = ({ communityTasks, suggestedTasks, community, taskItems }) => ({ communityTasks, suggestedTasks, community, taskItems })

const mapDispatch = null

export default connect(mapState, mapDispatch)(SelectTasks)
