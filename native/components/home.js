import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Button, Text } from 'native-base'
import { connect } from 'react-redux'
import store, { fetchCommunity, getAllTasksFromServerThunkerator, auth } from '../store'

class HomeScreen extends React.Component {
  constructor (props) {
    super (props)
  }

  componentDidMount () {
    if (this.props.user.id) {
      const communityId = this.props.user.communityId
      store.dispatch(fetchCommunity(communityId))
      // store.dispatch(getAllTasksFromServerThunkerator(communityId))
    }
  }

  render () {
    const loggedIn = !!this.props.user.id
    return (
      <Container style={styles.container}>
      {
        loggedIn
          ? <Text>Welcome, {this.props.user.firstName}</Text>
          : <Text>Please log in</Text>
      }
        <Text>Welcome To Game of Homes</Text>
        <Button onPress={() => this.props.navigation.navigate('TaskList')} style={styles.button}><Text>Tasks</Text></Button>
        <Button onPress={() => this.props.navigation.navigate('Scores')} style={styles.button}><Text>Scores</Text></Button>
        <Button rounded onPress={() => this.props.navigation.navigate('Login')} style={styles.button}><Text>Login</Text></Button>
        <Button rounded onPress={() => this.props.navigation.navigate('PlayerDetail')} style={styles.button}><Text>PlayerDetail</Text></Button>
        <Button rounded onPress={() => this.props.navigation.navigate('FrequencySelector')} style={styles.button}><Text>FrequencySelector</Text></Button>
        <Button rounded onPress={() => this.props.navigation.navigate('SelectTasks')} style={styles.button}><Text>SelectTasks</Text></Button>
        <Button rounded onPress={() => this.props.navigation.navigate('Signup')} style={styles.button}><Text>Signup</Text></Button>
        <Button rounded onPress={() => store.dispatch(auth({email: 'd@dave.com', password: '123'}))} style={styles.button}><Text>Dev Login</Text></Button>
   </Container>
    );
  }
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
