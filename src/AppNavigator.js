import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Platform, StatusBar } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import HomePage from './containers/HomePage';
import Portfolio from './containers/Portfolio';
import AddPosition from './containers/AddPosition';
import SearchPage from './containers/SearchPage';
import StockDetail from './components/StockDetail';
import Login from './containers/Login';
import { scale } from './helpers/baseStyles';

export const StockStack = createStackNavigator({
  Home: {
    screen: HomePage
  },
  SearchPage: {
    screen: SearchPage
  },
  Detail: {
    screen: StockDetail
  },
  Login: {
    screen: Login
  }
});

export const PortfolioStack = createStackNavigator({
  Portfolio: {
    screen: Portfolio
  },
  SearchPage: {
    screen: SearchPage
  },
  AddPosition: {
    screen: AddPosition
  }
});

export default createBottomTabNavigator(
  {
    Market: {
      screen: StockStack
    },
    Portfolio: {
      screen: PortfolioStack
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      /* eslint react/display-name: 0 */
      /* eslint react/prop-types: 0 */
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Market') {
          iconName = `ios-trending-up${focused ? '' : '-outline'}`;
        } else if (routeName === 'Portfolio') {
          iconName = `ios-folder-open${focused ? '' : '-outline'}`;
        }

        return <Ionicons name={iconName} size={scale(30)} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: 'black',
      showLabel: false
    },
    initialRouteName: 'Market',
    style: {
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
    }
  }
);
