import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, FlatList, ScrollView, Modal, TouchableHighlight, Dimensions } from 'react-native'
import { VictoryBar, VictoryZoomContainer, VictoryVoronoiContainer, VictoryChart, VictoryTheme, VictoryPie, VictoryAnimation, VictoryLegend, VictoryLabel, VictoryAxis, VictoryLine, VictoryGroup, VictoryTooltip, VictoryScatter, VictoryStack, svg  } from "victory-native";
import { Container, Text, Button, Header, Title, Subtitle, Body } from 'native-base';
import { fetchUserScores, getPastWinners } from '../store';

const roundToTenths = num => {
  return Math.round(num * 10) / 10
}

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

      if (!taskObj[task.taskId]) taskObj[task.taskId] = { id: task.taskId, name: task.task.name, points: task.points }
      else taskObj[task.taskId].points += task.points
    })
    let combinedPointsById = []

    for (key in taskObj) {
      combinedPointsById.push(taskObj[key])
    }
    return combinedPointsById
  }
  getPointsOverPastMonths = (id) => {
    const monthWords = { 1: 'Jan', 2: 'Feb', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'Aug', 9: 'Sept', 10: 'Oct', 11: 'Nov', 12: 'Dec' }
    const { userScores, taskItems } = this.props
    let userPointsPerMonth = []
    let monthsArr = taskItems.map(task => { if (task.completed) return Number(task.completed.split('-')[1]) })
    monthsArr = monthsArr.filter(month => month !== undefined)
    monthsArr = new Set(monthsArr)
    monthsArr.forEach(month => {
     
      userPointsPerMonth.push({ x: month, y: this.getUserCurrentMonthItems(id, month).reduce((sum, task) => { return sum += task.points }, 0), month: monthWords[month] })
    })
    return userPointsPerMonth
  }

  getAvgPointsPerTask = (taskId) =>{
    const { taskItems } = this.props
    let filteredTasks = taskItems.filter(task => task.id === taskId)

    console.log(filteredTasks)
    return filteredTasks.reduce((sum, task) => {return sum += task.points}, 0)}
  

  render() {

    const { userScores, taskItems, communityUsers } = this.props
 
    let usersInCommunity = taskItems.filter(task => task.userId)
    const month = new Date().getMonth() + 1
    const dataForMonth = this.getUserCurrentMonthItems(this.state.selectedUser, month)
    const monthWords = { 1: 'Jan', 2: 'Feb', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'Aug', 9: 'Sept', 10: 'Oct', 11: 'Nov', 12: 'Dec' }
    const  colorScale=["#8FA5A5", "#8C9A9E", "#79C4C4","#353637", "#4482AE", "#9BB3B3"]
    //console.log(this.getAvgPointsPerTask(1), '<<<<<<task avg points')
    let legendArr = []
    communityUsers.forEach(user =>{legendArr.push({name: user.firstName, symbol:{fill:colorScale[user.id]}})})
    let taskLegend = []
    //userScores.sort(function(a-b){return b-a})
    userScores.sort(function(a,b){return b.score-a.score})
    
    tasksPoints = {}
    taskItems.forEach(task => tasksPoints[task.task.id] = {name: task.task.name, points: this.getAvgPointsPerTask(task.task.id) }
      
     )
     let taskItemsArr = Object.entries(tasksPoints).map(arr => {return {x: arr[1].name, y: arr[1].points}})
     taskItemsArr = taskItemsArr.sort(function(a, b){return a.y - b.y})
     for(key in tasksPoints){
       taskLegend.push({name: tasksPoints[key].name, symbol:{fill:colorScale[key]}})
     }
     
    //console.log(tasksPoints, taskItemsArr, taskLegend,'<<<<<<<< pointsObj')
    

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
          


                  <VictoryChart
                    domainPadding={{ y: 20 }}
                    
                  >
                    <VictoryBar
                      
                      style={{
                        data: { fill: "#8C9A9E" },
                        labels: { labelPlacement: 'parallel' }
                      }}
                      labels={(d) => d.y}
                      labelComponent={<VictoryLabel labelPlacement="perpendicular" />}
                      data={dataForMonth.map(task => { return { x: task.id, y: task.points, task: task.name } })}
                      sortKey="y"
                      sortOrder="descending"
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
                      label={`Tasks for ${monthWords[month]}`}
                      style={styles.axisLabel}
                      
                    />
                    <VictoryAxis
                      dependentAxis
                      
                      
                      style={styles.axisLabel}
                    />
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
              style={styles.axisLabel}
              offsetY={0}
            />
            <VictoryAxis crossAxis
            
              orientation="bottom"
              offsetY={49}
              label={`Current Standing for ${monthWords[month]}`}
              style={{tickLabels: {fontSize: 15, padding: 5}, label:{fontSize: 30, padding: {top: 15}}}}
            />
            <VictoryBar
              colorScale={["#93B7BE", "#8C9A9E", "#79C4C4", "#747578"]}
           
              padding={{ left: 10, right: 10 }}
              labelPlacement='parallel'
              domainPadding={{ x: 5 }}
              style={{
                data: {
                  width: 35,
                  //fill: "#93B7BE",
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
      
          <VictoryChart
          //containerComponent={<VictoryZoomContainer zoomDomain={{x: [5, 35], y: [0, 100]}}/>}
          // containerComponent={<VictoryVoronoiContainer/>}
          >
          <VictoryLegend x={50} y={45}
    
    centerTitle
    orientation="vertical"
    itemsPerRow={2}
    gutter={20}
    style={{data: {fontSize: 10 } }}
    data={legendArr}
  />

          <VictoryAxis dependentAxis
          style={styles.axisLabel}
          offsetY={0}
        />
          <VictoryAxis crossAxis
            
          orientation="bottom"
          offsetY={50}
          label={`Points for Each Month`}
          tickValues ={['Jan', 'Feb', 'March', 'April', 'May']}
          style={{tickLabels: {fontSize: 15, padding: 5}, label:{fontSize: 30, padding: {top: 15}}}}
         
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
                    onLoad: { duration: 2000, before: () => ({
                              y: 0,
                              }) 
                            },
                    onExit:{ duration: 2000,   after: () => ({
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
          </VictoryChart>
          
          
            
          
            <VictoryChart containerComponent={<VictoryVoronoiContainer height={600}/>}  height={270}>
            <VictoryBar 
            //offsetY={200}
            standalone={true}
            
              style={{ data: { width: 35, fillOpacity:0.7, fill:"#4482AE" } }}
              data={taskItemsArr}
              cornerRadius={8}
              
              y={data => roundToTenths(data.y)}
           labels={(data) => (`${roundToTenths(data.y)} pts`)}
             
            />
            
            <VictoryAxis dependentAxis 
            
            style={{
              axis: { stroke: "transparent" },
              ticks: { stroke: "transparent", padding:0 },
              tickLabels: { fontSize: 12, fill: "transparent", angle:45, orientation: 'right', verticalAnchor:'start' }
            }}/>
            <VictoryAxis crossAxis 
          // height={height}
          // width={width}
          
          
          orientation="bottom"
          
          // offsetX={25}
           //offsetY={0}
          
          

           //padding={5}
          style={{
            axis: { stroke: "black" },
            ticks: { stroke: "black", padding:0 },
            tickLabels: { fontSize: 12, fill: "black", angle:90, orientation: 'left', verticalAnchor:'start'}
          }}
          /*
            Use a custom tickLabelComponent with
            an absolutely positioned x value to position
            your tick labels in the center of the chart. The correct
            y values are still provided by VictoryAxis for each tick
          */
          tickLabelComponent={<VictoryLabel  verticalAnchor='start' y={270}/>}
          tickValues={taskItemsArr.map((point) => point.x)}
        />
        <VictoryLegend x={125} y={50}
    title="Avg Points Per Task"
    centerTitle
    data={[]}/>
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
  // axisLabel: {
  //   flex: 5,
  //   //padding: { top: 30, bottom: 30 }, 
  //   fontSize: 30,
  //   margin: 30,
  //   // tickLabels: {fontSize: 15, padding: 5} 
  // },
  modal: {
    flexDirection: 'row',
    height: 100,
    padding: 20,
  }
})

const mapState = state => {
  return {
    user: state.user,
    userScores: state.userScores,
    taskItems: state.taskItems,
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