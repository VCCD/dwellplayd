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
<<<<<<< HEAD
=======

>>>>>>> master
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


const mapState = null;
const mapDispatch = null;
export default connect(mapState ,mapDispatch)(Stats)
