'use strict';
import { AsyncStorage } from 'react-native';

const STOCKS = 'STOCKS';
const DEFAULT = [
    'AAPL',
    'FB',
    'SNAP',
    'TWLO'
];

export default class DatabaseService {
    update(stocks) {
        return AsyncStorage.setItem(STOCKS, JSON.stringify(stocks));
    }

    get() {
        return AsyncStorage.getItem(STOCKS)
        .then((tickers) => {
            if (tickers != null) {
                return JSON.parse(tickers);
            } else {
                return DEFAULT;
            }
        })
        .catch((error) => {
            console.log('Cannot retrieve local');
        });
    }

    removeAll() {
        return AsyncStorage.removeItem(STOCKS);
    }
}