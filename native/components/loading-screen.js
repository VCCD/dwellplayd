import React from 'react'
import { StyleSheet, View, Dimensions, ScrollView, Image } from 'react-native';
import { Container, Text, Button, Icon, Card, CardItem } from 'native-base';
import { connect } from 'react-redux'
import store, { fetchCommunity, getAllCommunityTasksFromServerThunkerator, fetchCommunityTaskItems, userHasSeenAllTutorialsThunkerator, fetchUserScores } from '../store'
import Push from './push'
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width
const modalHeight = .90 * deviceHeight
const modalWidth = .90 * deviceWidth
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
      await store.dispatch(fetchUserScores)
      setTimeout(() => {
        if (!this.state.modal && !this.props.userHasSeenTutorials) this.setState({ modal: 1 })
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
        overScrollMode="never"
        pagingEnabled={true}>
        <View style={styles.page}>
          <View style={styles.innerPage}>
            <Icon active style={{ color: '#D4F5F5', fontSize: 100 }} name="home" />
            <Text style={styles.title}>welcome to dwellplayd</Text>
            <Text style={styles.text}>an interactive competition of communal tasks in a shared space</Text>
            <Icon active style={{ color: '#D4F5F5', fontSize: 80 }} name="arrow-round-forward" />
          </View>
        </View>
        <View style={styles.page}>
          <View style={styles.innerPage}>
            <Text style={styles.text}>dwellplayd is designed to incentivize completing communal tasks in a shared living space.</Text>
            <Text style={styles.text}>Tasks are not assigned to a specific dweller. Rather, tasks have a designated frequency, indicating how often they should be completed.</Text>
            <Text style={styles.text}>Tasks accumulate in point value the longer they go undone. When a task is completed, those points are added to that dweller's score.</Text>
            <Text style={styles.text}>The dweller with the most points at the end of the month wins!</Text>
            <Text style={styles.text}>Let's take a look around...</Text>
          </View>
        </View>
        <View style={styles.page}>
          <View style={styles.innerPage}>
            <Text style={styles.text}>This is the 'Add / Edit Tasks' page where a few sample tasks are pre-loaded. Feel free to add your own custom tasks and delete any you don't want.</Text>
            <Image resizeMode='contain' style={styles.gif} source={require('../public/addDelete.gif')} />
          </View>
        </View>
        <View style={styles.page}>
          <View style={styles.innerPage}>
            <Text style={styles.text}>Use the sliders to set the desired frequency of each task. When you're ready, press activate to initiate it.</Text>
            <Image resizeMode='contain' style={styles.gif} source={require('../public/activate.gif')} />
          </View>
        </View>
        <View style={styles.page}>
          <View style={styles.innerPage}>
            <Text style={styles.text}>This is the 'Current Tasks' page, where current point values for each task are shown. Tap a task to complete it.</Text>
            <Image resizeMode='contain' style={styles.gif} source={require('../public/completeTask.gif')} />
          </View>
        </View>
        <View style={styles.page}>
          <View style={styles.innerPage}>
            <Icon active style={{ color: '#D4F5F5', fontSize: 100 }} name="home" />
            <Text style={styles.text}>Invite your fellow dwellers on the 'Invite' page.</Text>
            <Text style={styles.text}>We recommend establishing a prize for the winner to help drive competition.</Text>
            <Text style={styles.text}>Let the games begin!</Text>
            {this._renderButton(`go`, () => {
              this.setState({ modal: 0 })
              store.dispatch(userHasSeenAllTutorialsThunkerator(this.props.user))
              setTimeout(() => {
                this.props.navigation.navigate('SelectTasks')
              }, 500)
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  )

  _renderButton = (text, onPress) => (
    <View>
      <Button rounded onPress={onPress} style={styles.button} >
        <Text style={{ paddingLeft: 10, paddingRight: 10, color: '#D4F5F5', fontWeight: `bold` }}>{text}</Text>
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
    marginHorizontal: 10,
    textAlign: `center`
  },
  innerPage: {
    flex: 1,
    height: modalHeight - 1000,
    width: modalWidth - 20,
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderColor: '#D4F5F5',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#8C9A9E',
  },
  page: {
    flex: 1,
    height: modalHeight,
    width: modalWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D4F5F5',
  },
  image: {
    width: 450,
  },
  gif: {
    height: 450,
    width: 300,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8C9A9E',
  },
  modalContent: {
    display: 'flex',
    height: modalHeight,
    width: modalWidth,
    backgroundColor: '#D4F5F5',
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: '#747578'
  },
  button: {
    height: 45,
    width: 150,
    alignSelf: 'flex-end',
    backgroundColor: '#93B7BE',
    padding: 5,
    margin: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#8C9A9E',
  },
  card: {
    backgroundColor: '#8C9A9E',
    borderWidth: 0,
    height: 100,
  },
  cardItem: {
    backgroundColor: '#8C9A9E'
  }
});

const mapState = ({ userHasSeenTutorials, user, communityTasks, taskItems }) => ({ userHasSeenTutorials, user, communityTasks, taskItems })

const mapDispatch = null

export default connect(mapState, mapDispatch)(Play)
