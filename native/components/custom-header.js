import React from 'react'
import { Container, Header, Content, Body, Text } from 'native-base'
import { StyleSheet, Image } from 'react-native'
import { DrawerItems } from 'react-navigation';
import { connect } from 'react-redux'

const CustomHeader = (props) => (
  <Container>
    <Header style={styles.drawerHead}>
      <Image style={styles.profileImg} source={{uri: props.user.imgUrl}} />
      <Body>
          <Text style={styles.text}>{props.user.firstName} {props.user.lastName}</Text>
      </Body>
    </Header>
    <Content>
      <DrawerItems style={styles.drawerItems} {...props} />
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
  text: {
    color: '#D4F5F5',
  },
  drawerItems: {
    backgroundColor: '#8C9A9E'
  }
});

const mapState = ({user}) => ({user})

const mapDispatch = null

export default connect(mapState, mapDispatch)(CustomHeader)
