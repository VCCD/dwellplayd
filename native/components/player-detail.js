import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container, Content, Card, CardItem, Button } from 'native-base'

export default class PlayerDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Player Detail',
      headerRight: (
        <Button
          transparent
          onPress={() => {
            navigation.navigate('PlayerDetailEdit')
          }}>
          <Text>
            Edit
        </Text>
        </Button>
      ),
    }
  }
  render() {
    return (
      <Container style={styles.list}>
        <Content>
          <Card>
            <CardItem bordered>
              <Text>
                Username: {dummyPlayer.username}
              </Text>
            </CardItem>
            <CardItem bordered>
              <Text>
                Email: {dummyPlayer.email}
              </Text>
            </CardItem>
            <CardItem bordered>
              <Text>
                Communities:
              </Text>
              {dummyPlayer.communities.map(community => {
                return (
                  <CardItem 
                  key={community}
                  button>
                    <Text>
                      {community}
                    </Text>
                  </CardItem>
                )
              })}
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#fff',
  },
  img: {
    width: 100,
    height: 100,
  },
});

const dummyPlayer = {
  username: `DishKing`,
  email: `i.do.dishes@gmail.com`,
  communities: [`home`, `work`, `school`]
}
