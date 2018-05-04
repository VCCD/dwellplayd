import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Button, Text } from 'native-base'
import { connect } from 'react-redux'

const HomeScreen = (props) => {
  const loggedIn = !!props.user.id
  return (
    <Container style={styles.container}>
    {
      loggedIn
        ? <Text>Welcome, {props.user.firstName}</Text>
        : <Text>Please log in</Text>
    }
      <Text>Welcome To Game of Homes</Text>
      <Button onPress={() => props.navigation.navigate('TaskList')} style={styles.button}><Text>Tasks</Text></Button>
      <Button onPress={() => props.navigation.navigate('Scores')} style={styles.button}><Text>Scores</Text></Button>
      <Button rounded onPress={() => props.navigation.navigate('Login')} style={styles.button}><Text>Login</Text></Button>
      <Button rounded onPress={() => props.navigation.navigate('PlayerDetail')} style={styles.button}><Text>PlayerDetail</Text></Button>
      <Button rounded onPress={() => props.navigation.navigate('FrequencySelector')} style={styles.button}><Text>FrequencySelector</Text></Button>
      <Button rounded onPress={() => props.navigation.navigate('SelectTasks')} style={styles.button}><Text>SelectTasks</Text></Button>
    </Container>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {

  }
});

const mapState = ({ user }) => ({ user })
const mapDispatch = null

export default connect(mapState, mapDispatch)(HomeScreen)
