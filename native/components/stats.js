import React from 'react'
import { connect } from 'react-redux'
import {StyleSheet, View, ScrollView} from 'react-native'
import { VictoryBar, VictoryChart, VictoryTheme, VictoryPie, VictoryAnimation, VictoryLabel } from "victory-native";
import { Container } from 'native-base';


class Stats extends React.Component{

    constructor(){
      super()
    }

    render(){
      return (
      <Container style={styles.container}>
      <ScrollView>
      
      <VictoryPie
      colorScale={["#93B7BE", "#8C9A9E", "#79C4C4", "#747578" ]}
        padding={40}
        labelRadius={50}
        animate={{ duration: 1000 }}
      data={[
        { x: "Cody", y: 35 },
        { x: "Chris", y: 40 },
        { x: "Dave", y: 55 },
        { x: "Vi", y: 20 }

      ]}
      style={{ labels: { fill: "white", fontSize: 20 } }}

    />
    <VictoryAnimation duration={1000} data={this.state}>
            {(newProps) => {
              return (
                <VictoryLabel
                  textAnchor="middle" verticalAnchor="middle"
                  x={200} y={200}
                  text={`${Math.round(100)}%`}
                  style={{ fontSize: 45 }}
                />
              );
            }}
          </VictoryAnimation>
        

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
   
    data={[
      { x: "Cody", y: 35 },
      { x: "Chris", y: 40 },
      { x: "Dave", y: 55 },
      { x: "Vi", y: 20 }

    ]}
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
      justifyContent: 'stretch',
      alignItems: 'center',
    },
  

})


const mapState = null;
const mapDispatch = null;
export default connect(mapState ,mapDispatch)(Stats)