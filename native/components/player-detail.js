import React from 'react';
import { StyleSheet, Text, Image } from 'react-native';
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
          style={{marginRight: 20}}
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
    const month = new Date().getMonth()
    getScores(user.communityId, month)
  }

  render() {
    const { user, community, userScores } = this.props
    const userScore = userScores.find(score => score.id === user.id)
    return (
      <Container style={styles.list}>
        <Image style={styles.profileImg} source={{uri: user.imgUrl}} />
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
    getScores: (communityId, month) => {
      dispatch(fetchUserScores(communityId, month))
    }
  }
}

export default connect(mapState, mapDispatch)(PlayerDetail)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#8C9A9E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    backgroundColor: '#fff',
  },
  edit: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#D4F5F5'
  },
  profileImg: {
    height: 140,
    width: 140,
    borderRadius: 70,
    alignSelf: 'center',
    margin: 15
  },
  button: {
    padding: 10,
    margin: 10,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#D4F5F5',
  },
  text: {
    color: '#747578',
    fontSize: 20,
  }
});
