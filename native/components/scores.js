import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Content, List, ListItem, Body, Title } from 'native-base'

export default class Scores extends React.Component {
  static navigationOptions = {
    title: 'Scores'
  }
  render() {
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

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#fff',
  },
});

const dummyPlayerScores = {
  Cody: 10,
  Vi: 4,
  Dave: 14,
  Chris: 2
}
