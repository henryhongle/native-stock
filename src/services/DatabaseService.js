'use strict';
import { AsyncStorage } from 'react-native';

const STOCKS = 'STOCKS';
const DEFAULT = [
    'AAPL',
    'FB',
    'SNAP',
    'TWLO',
    'YELP'
];

class DatabaseService {
    update(stocks) {
        return AsyncStorage.setItem(STOCKS, JSON.stringify(stocks));
    }

    async get() {
        try {
            const tickers = await AsyncStorage.getItem(STOCKS);
            console.log('Go to hereeee', tickers);
            if (tickers === null) {
                return DEFAULT;
            }
            return JSON.parse(tickers);
        } catch (error) {
            return DEFAULT;
        }
    }

    removeAll() {
        return AsyncStorage.removeItem(STOCKS);
    }
}

export let databaseService = new DatabaseService();