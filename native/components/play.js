import React from 'react'
import { StyleSheet } from 'react-native'
import { Container } from 'native-base'
import { connect } from 'react-redux'
import store, { playThunkerator, submitCommunityTaskFrequenciesThunkerator } from '../store'

class Play extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount = async () => {
    await store.dispatch(submitCommunityTaskFrequenciesThunkerator(this.props.community.id, this.props.communityTasks))
    await store.dispatch(playThunkerator(this.props.communityTasks))
    this.props.navigation.navigate('Tasks')
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

const mapState = ({ community, communityTasks }) => ({ community, communityTasks })

const mapDispatch = null

export default connect(mapState, mapDispatch)(Play)
