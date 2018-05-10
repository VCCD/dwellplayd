import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Content, Card, CardItem } from 'native-base'
import { connect } from 'react-redux'
import { fetchUserScores, fetchPastWinners } from '../store';

class Scores extends React.Component {
  static navigationOptions = {
    title: 'Scores'
  }

  componentDidMount = () => {
    const { getCurrentScores, getPastWinners, user } = this.props
    const month = new Date().getMonth()
    getCurrentScores(user.communityId, month)
    getPastWinners(user.communityId)
  }

  render() {
    const { userScores, pastWinners } = this.props
    const sortedScores = userScores.sort((a, b) => b.score - a.score)
    const date = new Date()
    return (
      <Container style={styles.list}>
        <Content>
          <Text style={styles.month}>
            {`${month[date.getMonth()]} scores:`}
          </Text>
          <View>
            <Card >
              {sortedScores.map(user => {
                const { firstName, lastName, score } = user
                return (
                  <CardItem style={styles.cardItem} key={firstName + lastName}>
                    <Text style={styles.nameText}>
                      {firstName}
                    </Text>
                    <Text style={styles.scoreText}>
                      {score}
                    </Text>
                  </CardItem>
                )
              })}
            </Card>
          </View>
          <Text style={styles.month}>
            {`Previous winners:`}
          </Text>
          {pastWinners.map(winner => {
            return (
              <Card key={winner}>
                <CardItem style={styles.cardItem}>
                  <Text style={styles.nameText}>
                    {month[winner.month]} - {winner.firstName}
                  </Text>
                  <Text style={styles.scoreText}>
                    {winner.score}
                  </Text>
                </CardItem>
              </Card>
            )
          })}
        </Content>
      </Container>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    userScores: state.userScores,
    pastWinners: state.pastWinners,
  }
}

const mapDispatch = dispatch => {
  return {
    getCurrentScores: (communityId, month) => {
      dispatch(fetchUserScores(communityId, month))
    },
    getPastWinners: communityId => {
      dispatch(fetchPastWinners(communityId))
    }
  }
}

export default connect(mapState, mapDispatch)(Scores)

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#8C9A9E',
  },
  month: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
    color: '#D4F5F5'
  },
  cardItem: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#747578',
    height: 60,
    borderColor: '#D4F5F5',
    borderWidth: 1,
  },
  nameText: {
    color: '#D4F5F5',
    fontSize: 20,
  },
  scoreText: {
    color: '#D4F5F5',
    fontSize: 30,
  }
});

const month = new Array(12);
month[0] = `January`;
month[1] = `February`;
month[2] = `March`;
month[3] = `April`;
month[4] = `May`;
month[5] = `June`;
month[6] = `July`;
month[7] = `August`;
month[8] = `September`;
month[9] = `October`;
month[10] = `November`;
month[11] = `December`;
