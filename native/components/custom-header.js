import React from 'react'
import { Container, Header, Content, Body, Text } from 'native-base'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { DrawerItems } from 'react-navigation';
import { connect } from 'react-redux'


const getUserScore = (id, props) => {
  const { user, userScores } = props
  const foundUser = userScores.find(score => score.id === user.id)
  if (foundUser) return foundUser.score
}

const CustomHeader = (props) => (
  <Container>
    <Header style={styles.drawerHead}>
      <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
        <Image style={styles.profileImg} source={{uri: props.user.imgUrl}} />
      </TouchableOpacity>
      <Body style={styles.body}>
          <Text style={styles.textName}>{props.user.firstName} {props.user.lastName}</Text>
          <Text style={styles.text}>Current score: {getUserScore(props.user.id, props)}</Text>
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props} />
    </Content>
  </Container>
)

const styles = StyleSheet.create({
  drawerHead: {
    height: 110,
    backgroundColor: '#000000',
    justifyContent: 'center',
  },
  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderColor: '#D4F5F5',
    borderWidth: 1.5
  },
  textName: {
    color: '#D4F5F5',
    fontSize: 23,
  },
  text: {
    color: '#D4F5F5',
  },
  drawerItems: {
    backgroundColor: '#8C9A9E'
  },
  body: {
    justifyContent: 'center'
  }
});

const mapState = ({user, userScores}) => ({user, userScores})

const mapDispatch = null

export default connect(mapState, mapDispatch)(CustomHeader)
