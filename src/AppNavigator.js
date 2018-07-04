import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import HomePage from './containers/HomePage';
import Portfolio from './containers/Portfolio';
import StockDetail from './components/StockDetail';
import { scale, colors } from './helpers/baseStyles';

export const StockStack = createStackNavigator({
  Home: {
    screen: HomePage
  },
  Detail: {
    screen: StockDetail
  }
});

export const PortfolioStack = createStackNavigator({
  Porfolio: {
    screen: Portfolio
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
          iconName = `ios-folder${focused ? '' : '-outline'}`;
        }

        return <Ionicons name={iconName} size={scale(30)} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: colors.green,
      showLabel: false
    },
    initialRouteName: 'Market'
  }
);
