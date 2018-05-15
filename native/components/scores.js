import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Container, Content, Card, CardItem } from 'native-base'
import { connect } from 'react-redux'
import { fetchUserScores, fetchPastWinners } from '../store';
import { TaskCard } from '../components'

class Scores extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userBeingViewed: 0,
    }
  }
  static navigationOptions = {
    title: 'Scores',
  }

  componentDidMount = () => {
    const { getCurrentScores, getPastWinners, user } = this.props
    const month = new Date().getMonth()
    getCurrentScores(user.communityId, month)
    getPastWinners(user.communityId)
  }

  changeUserBeingViewed (userId) {
    if (userId === this.state.userBeingViewed) this.setState({userBeingViewed: 0})
    else this.setState({userBeingViewed: userId})
  }

  render() {
    const { userScores, pastWinners } = this.props
    const sortedScores = userScores.sort((a, b) => b.score - a.score)
    const date = new Date()
    return (
      <Container style={styles.list}>
        <Content>
          <Text style={styles.month}>
            {`Current scores - ${month[date.getMonth()]}:`}
          </Text>
          <View>
            <Card>
              {sortedScores.map(user => {
                const { id, firstName, lastName, score } = user
                return (
                  <View key={firstName + lastName + id}>
                  <TouchableOpacity transparent onPress={() => this.changeUserBeingViewed(id)}>
                    <CardItem bordered style={styles.cardItem}>
                      <Text style={styles.nameText}>
                        {firstName}
                      </Text>
                      <Text style={styles.scoreText}>
                        {score}
                      </Text>
                    </CardItem>
                  </TouchableOpacity>
                  {
                    this.state.userBeingViewed === id
                      ? <View style={{backgroundColor: '#8C9A9E'}}>
                          {this.props.taskItems
                            .filter(taskItem => taskItem.completed && taskItem.completed.split(`-`)[1] - 1 === new Date().getMonth())
                            .filter(taskItem => taskItem.userId === id)
                            .map(taskItem => {
                            return (
                              <TaskCard fromScores={true} key={taskItem.id} taskItem={taskItem} handleClick={() => {}} />
                            )
                          })}
                        </View>
                      : ''
                  }
                  </View>
                )
              })}
            </Card>
          </View>
          <Text style={styles.month}>
            {`Previous winners:`}
          </Text>
          <Card>
          {pastWinners.map(winner => {
            return (
                <CardItem bordered key={winner.firstName + winner.month} style={styles.cardItem}>
                  <Text style={styles.nameText}>
                    {month[winner.month]} - {winner.firstName}
                  </Text>
                  <Text style={styles.scoreText}>
                    {winner.score}
                  </Text>
                </CardItem>
            )
          })}
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapState = ({ user, userScores, pastWinners, taskItems }) => ({ user, userScores, pastWinners, taskItems })

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
  },
  nameText: {
    color: '#D4F5F5',
    fontSize: 20,
    fontWeight: 'bold',
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
