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
          <Text>{props.user.firstName} {props.user.lastName}</Text>
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props} />
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
