import React from 'react'
import { connect } from 'react-redux'
import {StyleSheet, View, FlatList, ScrollView, Modal, TouchableHighlight} from 'react-native'
import { VictoryBar, VictoryChart, VictoryTheme, VictoryPie, VictoryAnimation, VictoryLabel } from "victory-native";
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
        selectedUser: null,
        selectedUserName: null,
        selectedUserPoints: null
      }
    }

    componentDidMount = () => {
      // const { getCurrentScores, user } = this.props
      // const month = new Date().getMonth()
      // this.setState( {tasksScores: getCurrentScores(user.communityId, month)})
      
    }
    getUserCurrentMonthItems = (id ) => {
      const month = new Date().getMonth()+1
      
    let filteredTaskByID = this.props.taskItems
      .filter(taskItem => taskItem.userId === id)
    filteredTaskByID =   filteredTaskByID.filter(taskItem => {
      let monthNum = taskItem.completed.split(`-`)[1]
      monthNum = monthNum.split('')[1]
      return  Number(monthNum) === month})

      return filteredTaskByID
  }

    

    render(){
      //const { users, taskItems } = this.props.community
      const { userScores } = this.props
      this.props.taskItems
      const totalScore = userScores.reduce( (sum, user)=>sum += user.score, 0)
      const month = new Date().getMonth()+1
     
      
     // console.log(this.props.getCurrentScores(this.props.user.communityId, month),'<<<<<<<<<<<<<<<<<<<<<<< propsss')
      console.log(this.getUserCurrentMonthItems(1), '<<<<<<<<<<<scores', month)
      return (  
      <Container style={styles.container}>
      <ScrollView>
      <View style={{margin: 22}}>
      <Modal
      animationType="slide"
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
          
          domainPadding={{ y: 10 }}
        >
          <VictoryBar horizontal
            style={{
              data: { fill: "#8C9A9E" }
            }}


            data={this.getUserCurrentMonthItems(4).map(task => {return {x: task.points.toString(), y:task.points, label: task.task.name}})}
          />
        </VictoryChart>

          </Body>
      
      
    </Modal>
    
      </View>






      <VictoryChart
      domainPadding={{ x: 25 }}
      //padding={30}
      labelRadius={30}
       style={{ parent: { maxWidth: "50%" } }}
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
                mutation: (props) => {
                  const fill = props.style && props.style.fill;
                  this.setState({modalVisible:true, selectedUser:props.datum.userID, selectedUserName:props.datum.x, selectedUserPoints:props.datum.y})
                  
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
    </VictoryChart>

    <VictoryPie
      colorScale={["#93B7BE", "#8C9A9E", "#79C4C4", "#747578" ]}
        padding={40}
        labelRadius={50}


        animate={{
      
          onEnter: {
            duration: 2000,
            before: () => ({_y: 25})          
          },        
        }}
        
      data={
      userScores.map(user => {return{x :user.firstName, y:user.score/totalScore}})
      
    }
   
      style={{ labels: { fill: "white", fontSize: 20 } }}
    />
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
