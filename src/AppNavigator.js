import React from 'react';
import { 
    Platform,
    StatusBar 
} from 'react-native';

import { StackNavigator, TabNavigator, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import HomePage from './containers/HomePage';
import MyStocks from './containers/MyStocks';
import StockDetail from './components/StockDetail';

export const StockStack = StackNavigator(
    {
        Home: {
            screen: HomePage,
            navigationOptions: {

            }
        },
        Detail: {
            screen: StockDetail
        }
    }
);

const AppWithNavigationState = ({dispatch, nav}) => (
    <StockStack navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
