import React from 'react';
import { StyleSheet, Image } from 'react-native'
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import {
  TaskList,
  PastTasks,
  Scores,
  PlayerDetail,
  PlayerDetailEdit,
  SelectTasks,
  Invite,
  Stats,
  NoCommunity,
  CreateCommunity,
  JoinCommunity,
  Logout,
  CustomHeader,
  CameraComponent,
  ConfirmImage,
  Play,
  LoadingScreen,
} from './components'
import {Icon, Button} from 'native-base'


const DrawerStack = DrawerNavigator({
  Tasks: {
    screen: TaskList,
  },
  PastTasks: {
    screen: PastTasks,
  },
  SelectTasks: {
    screen: SelectTasks
  },
  Scores: {
    screen: Scores
  },
  Stats: {
    screen: Stats
  },
  Invite: {
    screen: Invite
  },
  Profile: {
    screen: PlayerDetail
  },
  Logout: {
    screen: Logout
  }
}, {
  contentComponent: CustomHeader,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  DrawerToggleRoute: 'DrawerToggle'
})


const MainNavigation = StackNavigator({
  LoadingScreen: {
    screen: LoadingScreen,
  },
  NoCommunity: {
    screen: NoCommunity,
  },
  DrawerStack: {
    screen: DrawerStack
  },
  CreateCommunity: {
    screen: CreateCommunity
  },
  JoinCommunity: {
    screen: JoinCommunity
  },
  Camera: {
    screen: CameraComponent
  },
  ConfirmImage: {
    screen: ConfirmImage
  },
  Play: {
    screen: Play
  },
  PlayerDetailEdit: {
    screen: PlayerDetailEdit
  },
}, {
  headerMode: 'float',
  navigationOptions: ({navigation}) => ({
    headerStyle: {backgroundColor: '#747578'},
    headerTitle: (<Image style={styles.logo} source={require('./public/dwellplayd_logo.png')} />),
    headerTintColor: 'white',
    headerLeft: <Button
      transparent
      onPress={() => navigation.navigate('DrawerToggle')} ><Icon name="menu" style={styles.menu} /></Button>,
    gesturesEnabled: false
  }),
})

const styles = StyleSheet.create({
  menu: {
    marginLeft: 10,
    fontSize: 32,
    color: '#D4F5F5',
  },
  logo: {
    height: 40,
    width: 250,
  },
});

export default MainNavigation
