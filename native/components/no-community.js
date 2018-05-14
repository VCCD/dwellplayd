import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native';
import { Container, Content, Button } from 'native-base';
import Modal from 'react-native-modal'
import store, { userHasSeenTutorial } from '../store'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8C9A9E',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: '#747578',
  },
  modalButton: {
    height: 45,
    alignSelf: 'flex-end',
    backgroundColor: '#93B7BE',
    padding: 5,
    margin: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#8C9A9E',
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

  _renderButton = (text, onPress) => (
    <View>
      <Button rounded onPress={onPress} style={styles.modalButton} >
        <Text style={{ paddingLeft: 10, paddingRight: 10, color: '#D4F5F5' }}>{text}</Text>
      </Button>
    </View>
  );

  _renderTutorialModal = (user) => {
    return (
    <View style={styles.modalContent}>
      <Text>Thanks for joining!  If you've been invited, please join a dwelling.</Text>
      <Text>If you're a dwellplayed pioneer, create your own dwelling and get started!</Text>
      {this._renderButton('All Set', () => store.dispatch(userHasSeenTutorial(user, 'noCommunity')))}
    </View>
  )}

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
        <Modal
          isVisible={!this.props.userHasSeenTutorials.noCommunity}
          animationInTiming={2000}
          animationOutTiming={1000}
          backdropTransitionInTiming={2000}
          backdropTransitionOutTiming={2000}
        >
          {this._renderTutorialModal(this.props.user)}
        </Modal>
      </Container>
    )
  }
}

const mapState = ({ user, userHasSeenTutorials }) => ({ user, userHasSeenTutorials })

const mapDispatch = null

export default connect(mapState, mapDispatch)(NoCommunity)
