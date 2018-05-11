import React from 'react'
import { connect } from 'react-redux'
import {StyleSheet, View, FlatList, ScrollView, Modal, Text, TouchableHighlight} from 'react-native'
import { VictoryBar, VictoryChart, VictoryTheme, VictoryPie, VictoryAnimation, VictoryLabel } from "victory-native";
import { Container } from 'native-base';
import { fetchUserScores } from '../store';

const roundToTenths = num => {
  return Math.round(num * 10) / 10
}

class Stats extends React.Component{

    constructor(){
      super()
      this.state={
        modalVisible:false
      }
    }

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
      <View style={{margin: 22}}>
      <Modal
      animationType="slide"
      transparent={false}
      visible={this.state.modalVisible}
      onRequestClose={() => {
        alert('Modal has been closed.');
      }}>
      <View style={{marginTop: 22}}>
        <View>
          <Text>Hello World!</Text>

          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}>
            <Text>Hide Modal</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
    <TouchableHighlight
          onPress={() => {
            this.setModalVisible(false);
          }}>
          <Text>Hide Modal</Text>
        </TouchableHighlight>
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
            onPress: () => {return [
              {
                target: "data",
                mutation: (props) => {
                  const fill = props.style && props.style.fill;
                  this.setState({modalVisible:true})
                  return fill === "#747578" ? null : { style: { fill: "#747578", width: 35 } };
                }
              }
            ]}
          }
        
        }]}
       
        data={
        userScores.map(user => {return { 'x': user.firstName, 'y': roundToTenths(user.score), label: roundToTenths(user.score)}})
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
    }
})




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
