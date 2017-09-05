import React from 'react';
import { 
  Platform,
  StatusBar 
} from 'react-native';

import { StackNavigator, TabNavigator } from 'react-navigation';
import HomePage from './HomePage';
import MyStocks from './MyStocks';
import StockDetail from './components/StockDetail';

const StockStack = StackNavigator(
    {
        Home: {
            screen: HomePage,
            navigationOptions: {
                header: null
            }
        },
        Detail: {
            screen: StockDetail
        }
    }, 
    {
        cardStyle: {
            paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
        }
    }
);

const Tabs = TabNavigator(
    {
        HomePage: {
            screen: StockStack,
            path: '/',
            navigationOptions: {
                tabBarLabel: 'Home'
            }
        }
    },
    {
        animationEnabled: false,
        tabBarPosition: 'top',
        swipeEnabled: false,
        tabBarOptions: {

        }
    }
);

export default StockStack;
