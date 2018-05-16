import React from 'react'
import { Container, Header, Content, Body, Text, View } from 'native-base'
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
    <View style={styles.drawerHead}>
      <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
        <Image style={styles.profileImg} source={{uri: props.user.imgUrl}} />
      </TouchableOpacity>
      <View style={styles.body}>
          <Text style={styles.textName}>{props.user.firstName} {props.user.lastName}</Text>
          <Text style={styles.text}>current score: {getUserScore(props.user.id, props)}</Text>
      </View>
    </View>
    <Content>
      <DrawerItems {...props} />
    </Content>
  </Container>
)

const styles = StyleSheet.create({
  drawerHead: {
    height: 110,
    flexDirection: 'row',
    backgroundColor: '#000000',
    justifyContent: 'space-around',
    alignItems: 'center'
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
