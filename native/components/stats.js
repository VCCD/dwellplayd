import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, ScrollView, Modal, TouchableHighlight } from 'react-native'
import { VictoryBar, VictoryVoronoiContainer, VictoryChart, VictoryLegend, VictoryLabel, VictoryAxis, VictoryLine, VictoryGroup, VictoryTooltip, VictoryScatter } from 'victory-native';
import { Container, Text, Header, Title, Body } from 'native-base';
import { fetchUserScores } from '../store';

const roundToTenths = num => {
  return Math.round(num * 10) / 10
}
const month = new Date().getMonth() + 1
const monthWords = { 1: 'Jan', 2: 'Feb', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'Aug', 9: 'Sept', 10: 'Oct', 11: 'Nov', 12: 'Dec' }
const colorScale = ["#8FA5A5", "#8C9A9E", "#79C4C4", "#353637", "#4482AE", "#9BB3B3"]
let taskLegend = []
let taskItemsArr = []

class Stats extends React.Component {

  constructor() {
    super()
    this.state = {
      modalVisible: false,
      selectedUser: 0,
      selectedUserName: '',
      selectedUserPoints: 0
    }
    this.userDataForMonth = []

  }

  getUserCurrentMonthItems = (id, month) => {
    if (month === null || month === undefined) { month = new Date().getMonth() + 1 }

    let filteredTaskByID = this.props.taskItems
      .filter(taskItem => taskItem.userId === id)
    filteredTaskByID = filteredTaskByID.filter(taskItem => {
      let monthNum = taskItem.completed.split(`-`)[1]

      return Number(monthNum) === month
    })
    let taskObj = {}
    filteredTaskByID.forEach(task => {

      if (!taskObj[task.taskId]) taskObj[task.taskId] = { id: task.taskId, name: task.task.name, points: roundToTenths(task.points) }
      else (taskObj[task.taskId].points) += roundToTenths(task.points)
    })
    let combinedPointsById = []

    for (key in taskObj) {
      combinedPointsById.push(taskObj[key])
    }
    return combinedPointsById
  }
  getPointsOverPastMonths = (id) => {

    const { taskItems } = this.props
    let userPointsPerMonth = []
    let monthsArr = taskItems.map(task => { if (task.completed) return Number(task.completed.split('-')[1]) })
    monthsArr = monthsArr.filter(month => month !== undefined && (month - 1) !== new Date().getMonth())
    monthsArr = new Set(monthsArr)
    monthsArr.forEach(month => {

      userPointsPerMonth.push({ x: month, y: this.getUserCurrentMonthItems(id, month).reduce((sum, task) => { return sum += task.points }, 0), month: monthWords[month] })
    })
    return userPointsPerMonth
  }

  getAvgPointsPerTask = (taskId) => {
    const { taskItems } = this.props
    let filteredTasks = taskItems.filter(task => task.id === taskId)
    return filteredTasks.reduce((sum, task) => { return sum += task.points }, 0)
  }
  getTicksValues=() =>{
    dateArr = new Set()
    this.props.taskItems.forEach(task => {if (task.completed) return dateArr.add(Number(task.completed.split('-')[1]))})
    dateArr = Array.from(dateArr)
    var dates = []
    dateArr.map(date => dates.push(monthWords[date]))
    dates.splice(dates.length-1, 1)

    return dates
  }
  dataForMonth =() =>{
    const month = new Date().getMonth() + 1
    const dataForMonth = this.getUserCurrentMonthItems(this.state.selectedUser, month)
   return dataForMonth.sort(function (a, b) { return a.points - b.points })

  }
  taskPoints = () =>{
    tasksPoints = {}
    this.props.taskItems.forEach(task => tasksPoints[task.task.id] = { name: task.task.name, points: this.getAvgPointsPerTask(task.task.id) })
    return this.taskPoints
  }
  legendArr = ()=>{
    let legend = []
    this.props.communityUsers.forEach(user => { legend.push({ name: user.firstName, symbol: { fill: colorScale[user.id] } }) })
    return legend
  }
  taskItemsArrFunc =() => {

    tasksPoints = {}
    this.props.taskItems.forEach(task => tasksPoints[task.task.id] = { name: task.task.name, points: this.getAvgPointsPerTask(task.task.id) })
     taskItemsArr = Object.entries(tasksPoints).map(arr => { return { x: arr[1].name, y: arr[1].points } })
    for (key in tasksPoints) {
      taskLegend.push({ name: tasksPoints[key].name, symbol: { fill: colorScale[key] } })
    }
    taskItemsArr = taskItemsArr.sort(function (a, b) { return a.y - b.y })
    return taskItemsArr
  }

  render() {

    const { userScores, taskItems, communityUsers } = this.props
    this.taskItemsArrFunc()

    return (
      <Container style={styles.container}>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <Modal
            animationType="slide"
            animationInTiming={2000}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}>
            <ScrollView showsHorizontalScrollIndicator={false}>

              <Header style={styles.header}>
                <Title style={{ color: "white", fontSize: 30 }}>{this.state.selectedUserName}</Title>
                <TouchableHighlight
                  onPress={() => {
                    this.setState({ modalVisible: false });
                  }}>
                  <Text style={{ color: "white", fontSize: 20 }}> X</Text>
                </TouchableHighlight>
              </Header>

              <Body>
                <ScrollView >

                  <VictoryLegend x={25} y={25} height={50}
                    title="Current Tasks and Points This Month"
                    centerTitle
                    orientation="horizontal"
                    gutter={20}
                    style={{
                      data: { fill: "transparent", stroke: "transparent", strokeWidth: 2 },
                      labels: { fill: "transparent" },
                      border: { stroke: "transparent" },
                      title: { fontSize: 15 }
                    }}
                  />

                  <VictoryChart containerComponent={<VictoryVoronoiContainer height={400} width={350} />} height={250}
                    domainPadding={{ x: 25, y: 25 }}
                  >

                    <VictoryBar
                      style={{ data: { width: 35, fillOpacity: 0.7, fill: colorScale[this.state.selectedUser] } }}
                      cornerRadius={5}
                      standalone={true}

                      labels={(d) => `${d.y} pts`}
                      labelComponent={<VictoryLabel />}
                      data={this.dataForMonth().map(task => { return { x: task.name, y: roundToTenths(task.points), task: task.name } })}

                      animate={{
                        onEnter: {
                          duration: 1000,
                          before: () => ({
                            y: 0,
                          })
                        },
                        onExit: {
                          duration: 1000,
                          after: () => ({
                            y: 0,
                          })

                        }
                      }}
                    />
                    <VictoryAxis
                      width={95}
                      orientation="bottom"
                      padding={5}
                      style={{
                        axis: { stroke: "black" },
                        ticks: { stroke: "black" },
                        tickLabels: { fontSize: 12, fill: "black", angle: 90, orientation: 'left', verticalAnchor: 'start' }
                      }}
                      tickLabelComponent={<VictoryLabel verticalAnchor='start' y={250} />}
                    />
                    <VictoryAxis dependentAxis
                      style={{
                        axis: { stroke: "transparent" },
                        ticks: { stroke: "transparent", padding: 0 },
                        tickLabels: { fontSize: 12, fill: "transparent", angle: 45, orientation: 'right', verticalAnchor: 'start' }
                      }} />
                  </VictoryChart>

                </ScrollView>
              </Body>
            </ScrollView>
          </Modal>
          <VictoryChart
            domainPadding={{ x: 25, y: 15 }}

            labelRadius={30}
            style={{ parent: { maxWidth: "95%" } }}
          >
            <VictoryAxis dependentAxis
              offsetY={0}
            />
            <VictoryAxis crossAxis

              orientation="bottom"
              offsetY={49}
              label={`Current Standing for ${monthWords[month]}`}
              style={{ tickLabels: { fontSize: 15, padding: 5 }, label: { fontSize: 30, padding: { top: 15 } } }}
            />
            <VictoryBar
              colorScale={["#93B7BE", "#8C9A9E", "#79C4C4", "#747578"]}

              padding={{ left: 10, right: 10 }}
              labelPlacement='parallel'
              domainPadding={{ x: 5 }}
              style={{
                data: {
                  width: 35,
                },
                labels: {
                  fontSize: 15,
                }
              }}
              events={[{
                target: "data",
                eventHandlers: {
                  onPress: () => {
                    return [
                      {
                        target: "data",
                        mutation: async (props) => {
                          const fill = props.style && props.style.fill;
                          this.setState({ modalVisible: true, selectedUser: Number(props.datum.userID), selectedUserName: props.datum.x, selectedUserPoints: props.datum.y })
                          return fill === "#747578" ? null : { style: { fill: "#747578", width: 35 } };
                        }
                      }
                    ]
                  }
                }
              }]}
              data={
                userScores.map(user => { return { x: user.firstName, y: roundToTenths(user.score), label: roundToTenths(user.score), userID: user.id, fill: `${colorScale[user.id]}` } })
              }
              animate={{
                onEnter: {
                  duration: 1000,
                  before: () => ({
                    y: 0,
                  })
                },
                onExit: {
                  duration: 1000,
                  after: () => ({
                    y: 0,
                  })
                }
              }}
            />
          </VictoryChart>

          <VictoryChart>
            <VictoryLegend x={15} y={15}

              centerTitle
              orientation="horizontal"
              gutter={20}
              style={{ data: { fontSize: 10 } }}
              data={this.legendArr()}
            />

            <VictoryAxis dependentAxis
              style={styles.axisLabel}
              offsetY={0}
            />
            <VictoryAxis crossAxis
              orientation="bottom"
              offsetY={50}
              style={{ tickLabels: { fontSize: 15, padding: 5 }, label: { fontSize: 15, padding: { top: 15 } } }}
              label={`Points for Each Month`}
              tickValues={this.getTicksValues()}
            />

            {this.props.communityUsers.map(user => {
              return (<VictoryGroup
                key={user.id}
                color={`${colorScale[user.id]}`}

                labelComponent={
                  <VictoryTooltip
                    style={{ fontSize: 10 }}
                  />
                }
                data={this.getPointsOverPastMonths(user.id)}
                >
                <VictoryLine
                  animate={{
                    duration: 2000,
                    onLoad: {
                      duration: 2000, before: () => ({
                        y: 0,
                      })
                    },
                    onExit: {
                      duration: 2000, after: () => ({
                        y: 0,
                      })
                    }
                  }}
                />
                <VictoryScatter
                  labels={(d) => `y: ${d.y}, x: ${monthWords[d.x]} `}
                  size={(d, a) => { return a ? 8 : 3; }}
                />
              </VictoryGroup>)
            })}

          </VictoryChart >
          <VictoryChart containerComponent={<VictoryVoronoiContainer height={400} width={350} />} height={250}
            animate={{ duration: 2000 }}>
            <VictoryLegend x={15} y={15}
              title="Avg Points Per Task"
              centerTitle
              orientation="horizontal"
              gutter={20}
              style={{
                data: { fill: "transparent", stroke: "transparent", strokeWidth: 2 },
                labels: { fill: "transparent" },
                border: { stroke: "transparent" },
                title: { fontSize: 15 }
              }}
            />

            <VictoryBar
              standalone={true}

              style={{ data: { width: 35, fillOpacity: 0.7, fill: "#4482AE" }, label: { padding: 25 } }}
              data={taskItemsArr}
              cornerRadius={8}

              y={data => roundToTenths(data.y)}
              labels={(data) => (`${roundToTenths(data.y)} pts`)}
            />

            <VictoryAxis dependentAxis

              labelComponent={<VictoryLabel verticalAnchor='end' angle={90} />}

              style={{
                axis: { stroke: "transparent" },
                ticks: { stroke: "transparent", padding: 0 },
                tickLabels: { fontSize: 12, fill: "transparent" },

              }} />
            <VictoryAxis crossAxis
              width={95}
              orientation="bottom"
              padding={5}
              style={{
                axis: { stroke: "black" },
                ticks: { stroke: "black", padding: 25 },
                tickLabels: { fontSize: 12, fill: "black", angle: 90, orientation: 'left', verticalAnchor: 'start' }
              }}

              tickLabelComponent={<VictoryLabel verticalAnchor='start' y={250} />}
              tickValues={taskItemsArr.map((point) => point.x)}
            />
          </VictoryChart>
        </ScrollView>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: 110,
    backgroundColor: '#000000',
    justifyContent: 'center',
  },
  modal: {
    flexDirection: 'row',
    height: 100,
    padding: 20,
  }
})

const mapState = state => {
  return {
    user: state.user,
    userScores: state.userScores.sort(function (a, b) { return a.score - b.score }),
    taskItems: state.taskItems.filter(taskItem => taskItem.completed !== null),
    communityUsers: state.community.users,
    users: state.users
  }
}

const mapDispatch = dispatch => {
  return {
    getCurrentScores: (communityId, month) => {
      dispatch(fetchUserScores(communityId, month))
    },
    getPastWinners: communityId => {
      dispatch(fetchPastWinners(communityId))
    },
  }
}

export default connect(mapState, mapDispatch)(Stats)
