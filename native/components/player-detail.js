import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
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
        <Content>
        <Image style={styles.profileImg} source={{uri: user.imgUrl}} />
        <View>
          <Card>
            <CardItem bordered style={styles.card}>
              <Text style={styles.text}>
                {`${user.firstName} ${user.lastName}`}
              </Text>
            </CardItem>
            <CardItem bordered style={styles.card}>
              <Text style={styles.text}>
                Email: {user.email}
              </Text>
            </CardItem>
            <CardItem bordered style={styles.card}>
              <Text style={styles.text}>
                Score: {userScore && userScore.score}
              </Text>
            </CardItem>
            <CardItem bordered style={styles.card}>
              <Text style={styles.text}>
                Dwelling: {community.name}
              </Text>
            </CardItem>
          </Card>
        </View>
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
    backgroundColor: '#8C9A9E',
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
    margin: 15,
    borderColor: '#D4F5F5',
    borderWidth: 1.5
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
    color: '#D4F5F5',
    fontSize: 20,
  },
  card: {
    backgroundColor: '#747578',
    height: 60,
  }
});
