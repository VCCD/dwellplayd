import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Container, Text, Content } from 'native-base';
import { connect } from 'react-redux'
import store, { fetchCommunity, getAllCommunityTasksFromServerThunkerator, fetchCommunityTaskItems } from '../store'
import Push from './push'
import * as Animatable from 'react-native-animatable';

class Play extends React.Component {

  componentDidMount = async () => {
    if (this.props.user.communityId) {
      await store.dispatch(fetchCommunity(this.props.user.communityId))
      await store.dispatch(getAllCommunityTasksFromServerThunkerator(this.props.user.communityId))
      await store.dispatch(fetchCommunityTaskItems(this.props.user.communityId))
      setTimeout(() => {
        if (!this.props.userHasSeenTutorials.onboarding) this.props.navigation.navigate('Onboarding')
        else if (this.props.taskItems.length) this.props.navigation.navigate('Tasks')
        else this.props.navigation.navigate('SelectTasks')
      }, 2000)
    }
    else setTimeout(() => {
      this.props.navigation.navigate('NoCommunity')
    }, 1000)
  }

  render() {
    return (
      <Container style={styles.container}>
        <Push />
        <View style={styles.container}>
        <Animatable.Image style={styles.image} animation="pulse" easing="ease-out" iterationCount="infinite" source={require('../public/dwellplayd_logo.png')} />
        </View>
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
  image: {
    width: 450,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8C9A9E',
  },
});

const mapState = ({ userHasSeenTutorials, user, communityTasks, taskItems }) => ({ userHasSeenTutorials, user, communityTasks, taskItems })

const mapDispatch = null

export default connect(mapState, mapDispatch)(Play)
