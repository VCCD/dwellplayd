import React from 'react';
import {StyleSheet, Image, View} from 'react-native'
import { StackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
import {
  TaskList,
  FrequencySelector,
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
} from './components'
import {Icon} from 'native-base'


const DrawerStack = DrawerNavigator({
  Tasks: {
    screen: TaskList
  },
  FrequencySelector: {
    screen: FrequencySelector
  },
  Scores: {
    screen: Scores
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
  Stats: {
    screen: Stats
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
  NoCommunity: {
    screen: NoCommunity
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
  }
}, {
  headerMode: 'float',
  navigationOptions: ({navigation}) => ({
    headerStyle: {backgroundColor: '#747578'},
    headerTitle: (<Image style={styles.logo} source={require('./public/dwellplayd_logo.png')} />),
    headerTintColor: 'white',
    headerLeft: <Icon name='menu' style={styles.menu} onPress={() =>
      navigation.navigate('DrawerToggle')} />,
    gesturesEnabled: false
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
