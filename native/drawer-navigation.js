import React from 'react';
import {StyleSheet} from 'react-native'
import { StackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
import { TaskList, FrequencySelector, Signup} from './components'
import {Icon, Container, Header, Content, Body, Text} from 'native-base'

const CustomDrawer = (props) => (
  <Container>
    <Header style={styles.drawerHead}>
      <Body>
        <Text>Custom Header</Text>
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props} />
    </Content>
  </Container>
)

const DrawerStack = DrawerNavigator({
  Tasks: {
    screen: TaskList
  },
  FrequencySelector: {
    screen: FrequencySelector
  },
  Signup: {
    screen: Signup
  }
}, {
  contentComponent: CustomDrawer,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  DrawerToggleRoute: 'DrawerToggle'
})


const MainNavigation = StackNavigator({
  DrawerStack: {
    screen: DrawerStack
  },
}, {
  headerMode: 'float',
  navigationOptions: ({navigation}) => ({
    headerStyle: {backgroundColor: '#2D728F'},
    title: 'Welcome!',
    headerTintColor: 'white',
    headerLeft: <Icon name='menu' style={styles.menu} onPress={() =>
      navigation.navigate('DrawerToggle')} />
  }),
})

const styles = StyleSheet.create({
  menu: {
    marginLeft: 10,
    color: 'white',
  },
  drawerHead: {
    height: 100,
  }
});

export default MainNavigation
