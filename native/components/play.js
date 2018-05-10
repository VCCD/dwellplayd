import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import store, { playThunkerator, submitCommunityTaskFrequenciesThunkerator } from '../store'

class Play extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount () {
    store.dispatch(submitCommunityTaskFrequenciesThunkerator(this.props.community.id, this.props.communityTasks))
    store.dispatch(playThunkerator(this.props.communityTasks))
    this.props.navigation.navigate('Tasks')
  }
  render() {
    return <View></View>
  }
}

const mapState = ({ community, communityTasks }) => ({ community, communityTasks })

const mapDispatch = null

export default connect(mapState, mapDispatch)(Play)
