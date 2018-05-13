import React from 'react'
import { StyleSheet } from 'react-native';
import { Container, Text, Content } from 'native-base';
import { connect } from 'react-redux'
import store, { fetchCommunity, getAllCommunityTasksFromServerThunkerator, fetchCommunityTaskItems } from '../store'
import Push from './push'

class Play extends React.Component {

  componentDidMount = async () => {
    if (this.props.user.communityId) {
      await store.dispatch(fetchCommunity(this.props.user.communityId))
      await store.dispatch(getAllCommunityTasksFromServerThunkerator(this.props.user.communityId))
      await store.dispatch(fetchCommunityTaskItems(this.props.user.communityId))
      setTimeout(() => {
        if (this.props.taskItems.length) this.props.navigation.navigate('Tasks')
        else this.props.navigation.navigate('SelectTasks')
      }, 1000)
    }
    else setTimeout(() => {
      this.props.navigation.navigate('NoCommunity')
    }, 1000)
  }

  render() {
    return (
      <Container style={styles.container}>
        <Push />
        <Content style={styles.form}>
          <Text style={styles.title}>dwellcome home</Text>
        </Content>
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
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#8C9A9E',
    alignItems: 'center',
  },
});

const mapState = ({ user, communityTasks, taskItems }) => ({ user, communityTasks, taskItems })

const mapDispatch = null

export default connect(mapState, mapDispatch)(Play)
