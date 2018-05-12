import React from 'react'
import { connect } from 'react-redux'
import {StyleSheet, View, FlatList, ScrollView, Modal, TouchableHighlight} from 'react-native'
import { VictoryBar, VictoryChart, VictoryTheme, VictoryPie, VictoryAnimation, VictoryLabel, VictoryAxis } from "victory-native";
import { Container, Text, Button, Header, Title, Subtitle, Body } from 'native-base';
import { fetchUserScores, getPastWinners } from '../store';

const roundToTenths = num => {
  return Math.round(num * 10) / 10
}

class Stats extends React.Component{

    constructor(){
      super()
      this.state={
        modalVisible:false,
        selectedUser: 0,
        selectedUserName: "",
        selectedUserPoints: 0
      }
    }

    componentDidMount = () => {
      // const { getCurrentScores, user } = this.props
      // const month = new Date().getMonth()
      // this.setState( {tasksScores: getCurrentScores(user.communityId, month)})
      
    }
    getUserCurrentMonthItems = (id, month ) => {
     if(month===null || month === undefined) { month = new Date().getMonth()+1}
     
      
    let filteredTaskByID = this.props.taskItems
      .filter(taskItem => taskItem.userId === id)
    filteredTaskByID =   filteredTaskByID.filter(taskItem => {
      let monthNum = taskItem.completed.split(`-`)[1]
      
      return  Number(monthNum) === month})

      return filteredTaskByID
  }

    

    render(){
      //const { users, taskItems } = this.props.community
      const { userScores } = this.props
      this.props.taskItems
      const totalScore = userScores.reduce( (sum, user)=>sum += user.score, 0)
      const month = new Date().getMonth()+1
      const dataForMonth = this.getUserCurrentMonthItems(this.state.selectedUser, month)
     
      const monthWords = {1:'Jan', 2:'Feb', 3: 'March', 4: 'April', 5: 'May', 6:'June', 7:'July', 8:'Aug', 9:'Sept', 10:'Oct', 11:'Nov', 12:'Dec'}
     // console.log(this.props.getCurrentScores(this.props.user.communityId, month),'<<<<<<<<<<<<<<<<<<<<<<< propsss')
      
      return (  
      <Container style={styles.container}>
      <ScrollView>
      <View style={{margin: 22}}>
      <Modal
      animationType="slide"
      animationInTiming={2000}
          animationOutTiming={2000}
          backdropTransitionInTiming={2000}
          backdropTransitionOutTiming={2000}
      transparent={false}
      visible={this.state.modalVisible}
      onRequestClose={() => {
        alert('Modal has been closed.');
      }}>
      
        

          <Header style={styles.header}>
          <Title style={ {color: "white", fontSize: 30} }>{this.state.selectedUserName}</Title>
   
          <TouchableHighlight
            onPress={() => {
              this.setState({modalVisible:false});
            }}>
            
            <Text style={ {color: "white", fontSize: 20} }> X</Text>
          </TouchableHighlight>
          </Header>
          <Body>

          <VictoryChart
          domainPadding={{ y: 20 }}
        >
          <VictoryBar horizontal
            style={{
              data: { fill: "#8C9A9E" }
            }}

            data={dataForMonth.map(task => {return {x: task.points.toString(), y:task.points, label: task.task.name, labelPlacement:'parallel'}})}
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
    <VictoryAxis dependentAxis
    //label="Points"
    style={styles.axisLabel}
    
  />
        </VictoryChart>

          </Body>
      
      
    </Modal>
    
      </View>






      <VictoryChart
      domainPadding={{ x: 25, y:10 }}
      //padding={30}
      labelRadius={30}
       style={{ parent: { maxWidth: "95%" } }}
    >
     <VictoryBar    
       colorScale={["#93B7BE", "#8C9A9E", "#79C4C4", "#747578" ]}
        //padding={60}
        labelRadius={40}
        domainPadding={{ x: 5 }}
        
        style={{
          data: {
            width: 35,
            fill: "#93B7BE",
            
      
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
                mutation:async (props) => {
                  const fill = props.style && props.style.fill;
                   this.setState({modalVisible:true, selectedUser:Number(props.datum.userID), selectedUserName:props.datum.x, selectedUserPoints:props.datum.y})
                  
                  return fill === "#747578" ? null : { style: { fill: "#747578", width: 35 } };
                  
                }
              }
            ]}
          }
        
        }]}
       
        data={
        userScores.map(user => {return { x: user.firstName, y: roundToTenths(user.score), label: roundToTenths(user.score), userID:user.id}})
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
      <VictoryAxis

      
      label={`Current Standing for ${monthWords[month]}`}
      style={styles.axisLabel}
    />
    <VictoryAxis dependentAxis
      label="Points"
      style={styles.axisLabel}
      
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
    axisLabel: { 
      flex:2,
      padding: 20, 
      fontSize: 30,
      margin:15 
      }
    

})




const mapState = state => {
  return {
    user: state.user,
    userScores: state.userScores,
    taskItems: state.taskItems
    
  }
}

const mapDispatch = dispatch => {
  return {
    getCurrentScores: (communityId, month) => {
      dispatch(fetchUserScores(communityId, month))
    },
    getPastWinners: communityId => {
      dispatch(fetchPastWinners(communityId))
    }
  }
}

export default connect(mapState ,mapDispatch)(Stats)
