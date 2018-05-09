import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container, Content, Card, CardItem, Button } from 'native-base'
import { connect } from 'react-redux'
import { fetchCommunity } from '../store'

const roundToTenths = num => {
  return Math.round(num * 10) / 10
}

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

  score = userId => {
    let score = 0;
    const { taskItems } = this.props.community
    taskItems.forEach(taskItem => {
      if (taskItem.userId === userId) score += taskItem.points
    })
    return roundToTenths(score)
  }

  render() {
    const { user, community } = this.props
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
                Score: {this.score(user.id)}
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
  }
}

const mapDispatch = dispatch => {
  return {
    getCommunity: id => {
      dispatch(fetchCommunity(id))
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
    marginRight: 20
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
