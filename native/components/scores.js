import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container, Content, List, ListItem } from 'native-base'
import { connect } from 'react-redux'
import { fetchCommunity } from '../store';

class Scores extends React.Component {
  static navigationOptions = {
    title: 'Scores'
  }

  componentDidMount = () => {
    const { getCommunity, user } = this.props
    getCommunity(user.communityId)
  }

  render() {
    const { users } = this.props.community
    console.log(this.props)
    return (
      <Container style={styles.list}>
        <Content>
          <List>
            {users && users.map(user => {
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
