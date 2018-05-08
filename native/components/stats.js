import React from 'react'
import { connect } from 'react-redux'
import {StyleSheet, View, ScrollView} from 'react-native'
import { VictoryBar, VictoryChart, VictoryTheme, VictoryPie, VictoryAnimation, VictoryLabel } from "victory-native";
import { Container } from 'native-base';

const roundToTenths = num => {
  return Math.round(num * 10) / 10
}

class Stats extends React.Component{

    constructor(){
      super()
    }
    score = userId => {
      let score = 0;
      const { taskItems } = this.props.community
      taskItems.forEach(taskItem => {
        if (taskItem.userId === userId) score += taskItem.points
      })
      return roundToTenths(score)
    }

    render(){
      const { users, taskItems } = this.props.community
      console.log(users, 'users <<<<<<<')
      const totalScore = users.reduce( (sum, user)=>sum += this.score(user.id), 0)
      console.log('totalscore', totalScore)
      
      return (
      <Container style={styles.container}>
      <ScrollView>
      <VictoryPie
      colorScale={["#93B7BE", "#8C9A9E", "#79C4C4", "#747578" ]}
        padding={40}
        labelRadius={50}
        animate={{ duration: 1000 }}
      data={
      //   [
      //   { x: "Cody", y: 35 },
      //   { x: "Chris", y: 40 },
      //   { x: "Dave", y: 55 },
      //   { x: "Vi", y: 20 }
      // ]
      users.map(user => {return{'x':user.firstName, 'y':this.score(user.id)/totalScore}})
    }
      style={{ labels: { fill: "white", fontSize: 20 } }}
    />

    <VictoryChart
      domainPadding={{ x: 15 }}
      padding={40}
      labelRadius={50}
       style={{ parent: { maxWidth: "50%" } }}
     
    >
     <VictoryBar
        
       colorScale={["#93B7BE", "#8C9A9E", "#79C4C4", "#747578" ]}
        padding={40}
        labelRadius={40}
        
        style={{
          data: {
            width: 40,
            fill: "#93B7BE",
            padding: 20
      
          },
          labels: {
            fontSize: 15,
            
          }
        }}
       
        data={
          //[
        //   { x: "Cody", y: 35 },
        //   { x: "Chris", y: 40 },
        //   { x: "Dave", y: 55 },
        //   { x: this.props.user.firstName, y: this.score(this.props.user.id) }
    
        // ]
        users.map(user => {return { 'x': user.firstName, 'y': this.score(user.id)}})
      }
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
    }

})


const mapState = state => {
  return {
    user: state.user,
    community: state.community,
  }
}

const mapDispatch = dispatch => {
  return {
    getCommunity: id => {
      dispatch(fetchCommunity(id))
    }
  }
}
export default connect(mapState ,mapDispatch)(Stats)
