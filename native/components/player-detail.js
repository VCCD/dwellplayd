import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container, Content, Card, CardItem, Button } from 'native-base'
import { connect } from 'react-redux'
import { fetchCommunity, fetchUserScores } from '../store'

class PlayerDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Player Detail',
      headerRight: (
        <Button
          transparent
          onPress={() => navigation.navigate('PlayerDetailEdit')}>
          <Text style={styles.edit}>
            Edit
          </Text>
        </Button>
      ),
    }
  }

  componentDidMount = () => {
    const { getScores, user } = this.props
    getScores(user.communityId)
  }

  render() {
    const { user, community, userScores } = this.props
    const userScore = userScores.find(score => score.id === user.id)
    return (
      <Container style={styles.list}>
        <Content>
          <Card>
            <CardItem bordered>
              <Text>
                Name: {`${user.firstName} ${user.lastName}`}
              </Text>
            </CardItem>
            <CardItem bordered>
              <Text>
                Email: {user.email}
              </Text>
            </CardItem>
            <CardItem bordered>
              <Text>
                Score: {userScore && userScore.score}
              </Text>
            </CardItem>
            <CardItem bordered>
              <Text>
                Dwelling: {community.name}
              </Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapState = state => {
  return {
    community: state.community,
    user: state.user,
    userScores: state.userScores,
  }
}

const mapDispatch = dispatch => {
  return {
    getCommunity: id => {
      dispatch(fetchCommunity(id))
    },
    getScores: communityId => {
      dispatch(fetchUserScores(communityId))
    }
  }
}

export default connect(mapState, mapDispatch)(PlayerDetail)

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#fff',
  },
  edit: {
    marginRight: 20
  }
});
