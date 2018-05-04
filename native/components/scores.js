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
    return (
      <Container style={styles.list}>
        <Content>
          <List>
            {users.map(user => {
              const { firstName, lastName, score } = user
              return (
                <ListItem key={firstName + lastName}>
                  <Text>
                    {`${firstName} ${lastName} has ${score} points`}
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
