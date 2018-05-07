import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container, Content, Card, CardItem, Button } from 'native-base'
import { connect } from 'react-redux'
import { fetchCommunity } from '../store'

class PlayerDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Player Detail',
      headerRight: (
        <Button
          transparent
          onPress={() => navigation.navigate('PlayerDetailEdit')}>
          <Text>
            Edit
          </Text>
        </Button>
      ),
    }
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
                Community: {community.name}
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
  list: {
    backgroundColor: '#fff',
  },
});