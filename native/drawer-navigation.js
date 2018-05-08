import React from 'react';
import {StyleSheet, Image, View} from 'react-native'
import { StackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
import {CustomHeader} from './components'
import {
  TaskList,
  FrequencySelector,
  Signup,
  Scores,
  LoginScreen,
  PlayerDetail,
  PlayerDetailEdit,
  SelectTasks,
  Invite,
  Stats
} from './components'
import {Icon} from 'native-base'


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
  Stats:{
    screen: Stats
  }
}, {
  contentComponent: CustomHeader,
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
    headerStyle: {backgroundColor: '#747578'},
    headerTitle: (<Image style={styles.logo} source={require('./public/dwellplayd_logo.png')} />),
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
  logo: {
    height: 40,
    width: 250,
  },
});

export default MainNavigation
