import React from 'react';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import HomePage from './containers/HomePage';
import StockDetail from './components/StockDetail';

export const StockStack = StackNavigator({
  Home: {
    screen: HomePage
  },
  Detail: {
    screen: StockDetail
  }
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <StockStack navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);
