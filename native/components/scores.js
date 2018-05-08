import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container, Content, List, ListItem } from 'native-base'
import { connect } from 'react-redux'
import { fetchCommunity } from '../store';

const roundToTenths = num => {
  return Math.round(num * 10) / 10
}

class Scores extends React.Component {
  static navigationOptions = {
    title: 'Scores'
  }

  componentDidMount = () => {
    const { getCommunity, user } = this.props
    getCommunity(user.communityId)
  }

  score = userId => {
    let score = 0;
    const { taskItems } = this.props.community
    taskItems.forEach(taskItem => {
      if (taskItem.userId === userId) score += taskItem.points
    })
    return roundToTenths(score)
  }

  render() {
    const { users, taskItems } = this.props.community
    return (
      <Container style={styles.list}>
        <Content>
          <List>
            {users && users.map(user => {
              const { firstName, lastName, score } = user
              return (
                <ListItem key={firstName + lastName}>
                  <Text>
                    {`${firstName} ${lastName} has ${this.score(user.id)} points`}
                  </Text>
                </ListItem>
              )
            })}
          </List>
        </Content>
      </Container>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    community: state.community,
  }
}

const mapDispatch = dispatch => {
  return {
    getCommunity: id => {
      dispatch(fetchCommunity(id))
    }
  }
}

export default connect(mapState, mapDispatch)(Scores)

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#fff',
  },
});
