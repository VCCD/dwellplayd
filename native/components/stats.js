import React from 'react'
import { connect } from 'react-redux'
import {StyleSheet, View, ScrollView} from 'react-native'
import { VictoryBar, VictoryChart, VictoryTheme, VictoryPie, VictoryAnimation, VictoryLabel } from "victory-native";
import { Container } from 'native-base';
import { fetchUserScores } from '../store';

const roundToTenths = num => {
  return Math.round(num * 10) / 10
}

class Stats extends React.Component{

    constructor(){
      super()
      this.state={}
    }
    
    // score = userId => {
    //   let score = 0;
    //   const { taskItems } = this.props.community
    //   taskItems.forEach(taskItem => {
    //     if (taskItem.userId === userId) score += taskItem.points
    //   })
    //   return roundToTenths(score)
    // }
    componentDidMount = () => {
      const { getCurrentScores, user } = this.props
      const month = new Date().getMonth()
      this.setState( getCurrentScores(user.communityId, month))
      
    }
  

    render(){
      //const { users, taskItems } = this.props.community
      const { userScores } = this.props
      const totalScore = userScores.reduce( (sum, user)=>sum += user.score, 0)
      
      
      
      return (
      <Container style={styles.container}>
      <ScrollView>
      <VictoryPie
      colorScale={["#93B7BE", "#8C9A9E", "#79C4C4", "#747578" ]}
        padding={40}
        labelRadius={50}
        animate={{ duration: 1000 }}
      data={
      userScores.map(user => {return{'x':user.firstName, 'y':user.score/totalScore}})
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
        userScores.map(user => {return { 'x': user.firstName, 'y': user.score}})
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


// const mapState = state => {
//   return {
//     user: state.user,
//     community: state.community,
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     getCommunity: id => {
//       dispatch(fetchCommunity(id))
//     }
//   }
// }

const mapState = state => {
  return {
    user: state.user,
    userScores: state.userScores,
  }
}

const mapDispatch = dispatch => {
  return {
    getCurrentScores: (communityId, month) => {
      dispatch(fetchUserScores(communityId, month))
    }
  }
}

export default connect(mapState ,mapDispatch)(Stats)
