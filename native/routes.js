import React from 'react'
import MainNavigation from './drawer-navigation';
import RootStack from './root-stack';
import { connect } from 'react-redux';
import { Root } from 'native-base';

const Routes = (props) => {
  const { isLoggedIn } = props
  return (
    <Root>
    {isLoggedIn ?
      <MainNavigation />
      :
        <RootStack />}
      </Root>
  )
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
  }
};

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Routes)
