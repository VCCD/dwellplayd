import React from 'react';
import {StyleSheet, Image} from 'react-native'
import { StackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
import {
  TaskList,
  FrequencySelector,
  Signup,
  Scores,
  LoginScreen,
  PlayerDetail,
  PlayerDetailEdit,
  SelectTasks,
  Invite
} from './components'
import {Icon, Container, Header, Content, Body, Text, Button} from 'native-base'
import store, { logoutUser } from './store'

const CustomDrawer = (props) => (
  <Container>
    <Header style={styles.drawerHead}>
      <Body>
        <Text>Custom Header</Text>
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props} />
      <Button rounded onPress={() => store.dispatch(logoutUser())} style={styles.button}><Text>Logout</Text></Button>
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
  },
  Scores: {
    screen: Scores
  },
  Login: {
    screen: LoginScreen
  },
  PlayerDetail: {
    screen: PlayerDetail
  },
  PlayerDetailEdit: {
    screen: PlayerDetailEdit
  },
  SelectTasks: {
    screen: SelectTasks
  },
  Invite: {
    screen: Invite
  },
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
    headerStyle: {backgroundColor: '#4A8EBF'},
    headerTitle: (<Image style={styles.logo} source={require('./dwellplayd_logo.png')} />),
    headerTintColor: 'white',
    headerLeft: <Icon name='menu' style={styles.menu} onPress={() =>
      navigation.navigate('DrawerToggle')} />
  }),
})

const styles = StyleSheet.create({
  menu: {
    marginLeft: 10,
    color: '#D4F5F5',
  },
  drawerHead: {
    height: 100,
  },
  logo: {
    height: 40,
    width: 250,
  }
});

export default MainNavigation
