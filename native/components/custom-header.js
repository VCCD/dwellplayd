import React from 'react'
import {Icon, Container, Header, Content, Body, Text, Button} from 'native-base'
import {StyleSheet, Image, View} from 'react-native'
import store, { logoutUser } from '../store'
import { DrawerItems } from 'react-navigation';
import { connect } from 'react-redux'

const CustomHeader = (props) => (
  <Container>
    <Header style={styles.drawerHead}>
      <Image style={styles.profileImg} source={require('../public/profile.jpg')} />
      <Body>
          <Text>{props.user.firstName} {props.user.lastName}</Text>
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props} />
      <Button rounded onPress={() => store.dispatch(logoutUser())} style={styles.button}><Text>Logout</Text></Button>
    </Content>
  </Container>
)

const styles = StyleSheet.create({
  drawerHead: {
    height: 100,
  },
  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
  }
});

const mapState = ({user}) => ({user})

const mapDispatch = null

export default connect(mapState, mapDispatch)(CustomHeader)
