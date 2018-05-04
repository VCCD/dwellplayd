import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container, Content, List, ListItem } from 'native-base'
import { connect } from 'react-redux'
import { fetchUsers } from '../store';

class Scores extends React.Component {
  static navigationOptions = {
    title: 'Scores'
  }

  componentDidMount = () => {
    const { getUsers } = this.props
    getUsers()
  }

  render() {
    const { users } = this.props
    const playerScores = Array.from(Object.entries(dummyPlayerScores))
    const sortedPlayerScores = playerScores.sort((a, b) => b[1] - a[1])
    return (
      <Container style={styles.list}>
        <Content>
          <List>
            {sortedPlayerScores.map(playerScore => {
              const player = playerScore[0]
              const score = playerScore[1]
              return (
                <ListItem key={playerScore}>
                  <Text>
                    {player} has {score} points
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
    users: state.users,
  }
}

const mapDispatch = dispatch => {
  return {
    getUsers: () => {
      dispatch(fetchUsers())
    }
  }
}

export default connect(mapState, mapDispatch)(Scores)

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#fff',
  },
});
