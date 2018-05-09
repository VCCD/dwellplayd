import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text } from 'react-native';
import { Container, Content, Button } from 'native-base';
import t from 'tcomb-form-native'
import store, { fetchCommunity, getAllCommunityTasksFromServerThunkerator } from '../store';
import customFormStyle from '../customFormStyle'

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#D4F5F5',
  },
  messageText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#D4F5F5',
  },
  form: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#D4F5F5',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#8C9A9E',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    margin: 10,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#93B7BE',
  },
  buttonText: {
    color: '#D4F5F5',
    fontWeight: 'bold',
    fontSize: 20,
  },
})


class NoCommunity extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      communityId: '',
    }
  }

  componentDidMount () {
    ///fetchCommunityTaskItems = (communityId)
    if (this.props.user.communityId) {
      store.dispatch(fetchCommunity(this.props.user.communityId))
      store.dispatch(getAllCommunityTasksFromServerThunkerator(this.props.user.communityId))
      this.props.navigation.navigate('Tasks')
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content style={styles.form}>
          <Button rounded onPress={() => this.props.navigation.navigate('CreateCommunity')} style={styles.button}>
            <Text style={styles.buttonText}>Create Community</Text>
          </Button>
          <Button rounded onPress={() => this.props.navigation.navigate('JoinCommunity')} style={styles.button}>
            <Text style={styles.buttonText}>Join a Community</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

const mapState = ({ user }) => ({ user })

const mapDispatch = null

export default connect(mapState, mapDispatch)(NoCommunity)
