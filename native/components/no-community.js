import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text } from 'react-native';
import { Container, Content, Button } from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8C9A9E',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center'
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
  constructor(props) {
    super(props)
    this.state = {
      communityId: '',
    }
  }

  static navigationOptions = {
    headerLeft: null,
  }
  render() {
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
          <Button rounded onPress={() => this.props.navigation.navigate('CreateCommunity')} style={styles.button}>
            <Text style={styles.buttonText}>create dwelling</Text>
          </Button>
          <Button rounded onPress={() => this.props.navigation.navigate('JoinCommunity')} style={styles.button}>
            <Text style={styles.buttonText}>join a dwelling</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

const mapState = ({ user }) => ({ user })

const mapDispatch = null

export default connect(mapState, mapDispatch)(NoCommunity)
