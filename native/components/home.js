import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Button, Text, Header, Left, Icon, Body, Right } from 'native-base'
import { connect } from 'react-redux'
import store, { fetchCommunity, auth, logoutUser } from '../store'
import CONFIG from '../api-routes'
import { LoginScreen } from '../components'


class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Button
          transparent
          onPress={() => navigation.navigate('DrawerOpen')}>
          <Icon name="menu" />
        </Button>
      ),
    }
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.user.id) {
      const communityId = this.props.user.communityId
      store.dispatch(fetchCommunity(communityId))
    }
  }

  render() {
    const loggedIn = !!this.props.user.id
    return (
      <Container style={styles.container}>
        {
          loggedIn
            ?
              <Body>
                <Text>Welcome To dwellplayd, {this.props.user.firstName}</Text>
                <Button onPress={() => this.props.navigation.navigate('TaskList')} style={styles.button}><Text>Tasks</Text></Button>
                <Button onPress={() => this.props.navigation.navigate('Scores')} style={styles.button}><Text>Scores</Text></Button>
                <Button rounded onPress={() => this.props.navigation.navigate('PlayerDetail')} style={styles.button}><Text>PlayerDetail</Text></Button>
                <Button rounded onPress={() => this.props.navigation.navigate('FrequencySelector')} style={styles.button}><Text>FrequencySelector</Text></Button>
                <Button rounded onPress={() => this.props.navigation.navigate('SelectTasks')} style={styles.button}><Text>SelectTasks</Text></Button>
                <Button rounded onPress={() => this.props.navigation.navigate('Signup')} style={styles.button}><Text>Signup</Text></Button>
                <Button rounded onPress={() => store.dispatch(auth(CONFIG.LOGIN))} style={styles.button}><Text>Dev Login</Text></Button>
                <Button rounded onPress={() => store.dispatch(logoutUser())} style={styles.button}><Text>Logout</Text></Button>
              </Body>
            :
              <LoginScreen navigation = {this.props.navigation} />
        }
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
