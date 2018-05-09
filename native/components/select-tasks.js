import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, Slider } from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Icon,
  List,
  Header,
  Right,
  Item,
  Input,
  Button,
} from 'native-base';
import store, {
  clearTasks,
  editCommunityTask,
  submitCommunityTaskFrequenciesThunkerator,
  getAllCommunityTasksFromServerThunkerator,
  getSuggestedTasksFromServerThunkerator,
  addCustomCommunityTaskThunkerator,
} from '../store'
import { connect } from 'react-redux';

class SelectTasks extends Component {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      inActiveTasks: false,
      taskInput: '',
      activeTask: {},
    }
  }

  componentDidMount() {
    store.dispatch(getAllCommunityTasksFromServerThunkerator(this.props.community.id))
    if (!this.props.communityTasks.length) {
      this.setState({ inActiveTasks: true });
      store.dispatch(getSuggestedTasksFromServerThunkerator(this.props.community.id))
    }
  }

  componentWillUnmount() {
    store.dispatch(submitCommunityTaskFrequenciesThunkerator(this.props.community.id, this.props.communityTasks))
    store.dispatch(clearTasks())
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
    const newData = [...this.state.emailList];
    newData.splice(rowId, 1);
    this.setState({ emailList: newData });
  }

  static navigationOptions = {
    headerRight: <Button transparent style={{marginRight: 20}}><Text style={{fontWeight: 'bold', fontSize: 18, color: '#D4F5F5'}}>Play!</Text></Button>
  }

  render() {
    const communityTasks =
      this.props.communityTasks.sort((a, b) => {
        var nameA = a.task.name.toUpperCase()
        var nameB = b.task.name.toUpperCase()
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
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
            renderRow={comTask => (
              <Card key={comTask.id} >
                <CardItem>
                  <Body>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                      {comTask.task.name}
                    </Text>
                    <Text>
                      {
                        comTask.value === 1
                          ? `Every day`
                          : `Every ${comTask.value} days`
                      }
                    </Text>
                  </Body>
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
            )}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleText: {
    color: '#DBD56E',
    fontWeight: 'bold',

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
});

const mapState = ({ communityTasks, suggestedTasks, community }) => ({ communityTasks, suggestedTasks, community })

const mapDispatch = null

export default connect(mapState, mapDispatch)(SelectTasks)
