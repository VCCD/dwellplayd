import React from 'react'
import { StyleSheet, View, Dimensions, ScrollView, Image } from 'react-native';
import { Container, Text, Content, Button } from 'native-base';
import { connect } from 'react-redux'
import store, { fetchCommunity, getAllCommunityTasksFromServerThunkerator, fetchCommunityTaskItems, userHasSeenTutorial } from '../store'
import Push from './push'
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width
const modalHeight = deviceHeight - 40
const modalWidth = deviceWidth - 30
const gifHeight = modalHeight
const gifWidth = modalWidth

class Play extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: 0
    }
  }

  componentDidMount = async () => {
    if (this.props.user.communityId) {
      await store.dispatch(fetchCommunity(this.props.user.communityId))
      await store.dispatch(getAllCommunityTasksFromServerThunkerator(this.props.user.communityId))
      await store.dispatch(fetchCommunityTaskItems(this.props.user.communityId))
      setTimeout(() => {
        if (!this.state.modal && !this.props.userHasSeenTutorials.onboarding) this.setState({modal: 1})
        else if (this.props.taskItems.length) this.props.navigation.navigate('Tasks')
        else this.props.navigation.navigate('SelectTasks')
      }, 2000)
    }
    else {
      setTimeout(() => {
        this.props.navigation.navigate('NoCommunity')
      }, 1000)
    }
  }

  _renderModalOne = () => (
    <View style={styles.modalContent}>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}>
        <View style={styles.page}>
          <Text style={styles.title}>welcome to dwellplayd</Text>
          <Text style={styles.text}> The exciting app that transforms mundane communal tasks into an interactive competition</Text>
          <Text style={styles.text}> Swipe right to learn how to play!</Text>
        </View>
        <View style={styles.page}>
          <Image resizeMode='contain' style={styles.gif} source={require('../public/selectTasks.gif')} />
          <Text style={styles.text}>Use the sliders to adjust the frequency of a task. Once satisfied, press activate to initiate the task</Text>
        </View>
        <View style={styles.page}><Text>Yo</Text></View>
        <View style={styles.page}>
          <Text>Yo</Text>
          {this._renderButton(`Let's get started!`, () => {
            this.setState({modal: 0})
            store.dispatch(userHasSeenTutorial(this.props.user, 'onboarding'))
            setTimeout(() => {
            this.props.navigation.navigate('SelectTasks')
            }, 500)
          })}
        </View>
      </ScrollView>
    </View>
  )

  _renderModalTwo = () => (
    <View style={styles.modalContent}>
      <Text>dwellplayd is designed to take the decision-making out of communal tasks.</Text>
      <Text>Instead of trying to decide who does what job, you just tell us what needs to be done and how often you think it should be done, and we'll make list of the most valuable tasks as any given moment.</Text>
      {this._renderButton(`You have my attention...`, () => {
        this.setState({modal: 0})
        setTimeout(() => {
          this.setState({modal: 3})
        }, 500)
      })}
    </View>
  )

  _renderModalThree = () => (
    <View style={styles.modalContent}>
      <Text>Once you have the list, you can decide what you want to do and when.  If you think the points aren't high enough to clean the bathroom, then just wait.</Text>
      <Text>Be careful though, your dwellows might nab the task before you do, and you'll lose out.</Text>
      {this._renderButton(`Ahh, I think I'm starting to get it.`, () => {
        this.setState({modal: 0})
        setTimeout(() => {
          this.setState({modal: 4})
        }, 500)
      })}
    </View>
  )

  _renderModalFour = () => (
    <View style={styles.modalContent}>
    <Text>dwellplayd is a great tool for facilitating friendly competition. We will announce your dwelling's monthly winners through the app.</Text>
      <Text>At any point you can see who's in the lead by looking at the scores page. We recommend a wager or prize to keep things interesting.</Text>
      <Text>It's up to you to decide how friendly the wager should be!</Text>
      {this._renderButton(`Let's get started!`, () => {
        this.setState({modal: 0})
        store.dispatch(userHasSeenTutorial(this.props.user, 'onboarding'))
        setTimeout(() => {
          this.props.navigation.navigate('SelectTasks')
        }, 500)
      })}
    </View>
  )

  _renderButton = (text, onPress) => (
    <View>
      <Button rounded onPress={onPress} style={styles.button} >
        <Text style={{ paddingLeft: 10, paddingRight: 10, color: '#D4F5F5' }}>{text}</Text>
      </Button>
    </View>
  )

  render() {
    return (
      <Container style={styles.container}>
        <Push />
        <View style={styles.container}>
        <Animatable.Image style={styles.image} animation="pulse" easing="ease-out" iterationCount="infinite" source={require('../public/dwellplayd_logo.png')} />
        </View><Modal
            animationOut={'slideOutLeft'}
            isVisible={this.state.modal === 1}
            animationInTiming={1500}
            animationOutTiming={400}
            backdropTransitionInTiming={1500}
            backdropTransitionOutTiming={400}
            >
            {this._renderModalOne()}
          </Modal>
          <Modal
            animationIn={'slideInRight'}
            animationOut={'slideOutLeft'}
            isVisible={this.state.modal === 2}
            animationInTiming={400}
            animationOutTiming={400}
            backdropTransitionInTiming={400}
            backdropTransitionOutTiming={400}
            >
            {this._renderModalTwo()}
          </Modal>
          <Modal
            animationIn={'slideInRight'}
            animationOut={'slideOutLeft'}
            isVisible={this.state.modal === 3}
            animationInTiming={400}
            animationOutTiming={400}
            backdropTransitionInTiming={400}
            backdropTransitionOutTiming={400}
            >
            {this._renderModalThree()}
          </Modal>
          <Modal
            animationIn={'slideInRight'}
            animationOut={'slideOutLeft'}
            isVisible={this.state.modal === 4}
            animationInTiming={400}
            animationOutTiming={400}
            backdropTransitionInTiming={400}
            backdropTransitionOutTiming={400}
            >
            {this._renderModalFour()}
          </Modal>
      </Container>
    )
  }
}
const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#D4F5F5',
  },
  text: {
    fontSize: 20,
    color: '#D4F5F5',
    marginHorizontal: 10
  },
  page: {
    flex: 1,
    height: modalHeight,
    width: modalWidth,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#8C9A9E',
  },
  image: {
    width: 450,
  },
  gif: {
    height: 300,
    width: gifWidth,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8C9A9E',
  },
  modalContent: {
    height: deviceHeight - 40,
    width: deviceWidth - 30,
    backgroundColor: '#fff',
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#747578'
  },
  button: {
    height: 45,
    alignSelf: 'flex-end',
    backgroundColor: '#93B7BE',
    padding: 5,
    margin: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#8C9A9E',
  }
});

const mapState = ({ userHasSeenTutorials, user, communityTasks, taskItems }) => ({ userHasSeenTutorials, user, communityTasks, taskItems })

const mapDispatch = null

export default connect(mapState, mapDispatch)(Play)
