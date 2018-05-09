import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Content, Card, CardItem } from 'native-base'
import { connect } from 'react-redux'
import { fetchUserScores } from '../store';

class Scores extends React.Component {
  static navigationOptions = {
    title: 'Scores'
  }

  componentDidMount = () => {
    const { getCurrentScores, user } = this.props
    const month = new Date().getMonth()
    getCurrentScores(user.communityId, month)
  }

  render() {
    const { userScores } = this.props
    const sortedScores = userScores.sort((a, b) => b.score - a.score)
    const date = new Date()
    return (
      <Container style={styles.list}>
        <Content>
          <Text style={styles.month}>
            {`${month[date.getMonth()]} scores:`}
          </Text>
          {sortedScores.map(user => {
            const { firstName, lastName, score } = user
            return (
              <View key={firstName + lastName}>
                <Card>
                  <CardItem>
                    <Text>
                      {`${firstName} ${lastName} has ${score} points`}
                    </Text>
                  </CardItem>
                </Card>
              </View>
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
  }
}

const mapDispatch = dispatch => {
  return {
    getCurrentScores: (communityId, month) => {
      dispatch(fetchUserScores(communityId, month))
    }
  }
}

export default connect(mapState, mapDispatch)(Scores)

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#fff',
  },
  month: {
    fontSize: 24,
    margin: 10
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
