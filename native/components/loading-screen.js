import React from 'react'
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux'
import store, { fetchCommunity, getAllCommunityTasksFromServerThunkerator } from '../store'

class Play extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount = async () => {
    if (this.props.user.communityId) {
      await store.dispatch(fetchCommunity(this.props.user.communityId))
      await store.dispatch(getAllCommunityTasksFromServerThunkerator(this.props.user.communityId))
      this.props.navigation.navigate('Tasks')
    }
    else {
      this.props.navigation.navigate('NoCommunity')
    }
  }
  render() {
    return <Container style={styles.container} />
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8C9A9E',
    alignItems: 'center',
  }
});

const mapState = ({ user, communityTasks }) => ({ user, communityTasks })

const mapDispatch = null

export default connect(mapState, mapDispatch)(Play)
