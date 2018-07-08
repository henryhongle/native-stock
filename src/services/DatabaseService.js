import { AsyncStorage } from 'react-native';

const STOCKS = 'STOCKS';
const DEFAULT = ['AAPL', 'FB', 'MSFT'];

function update(stocks) {
  return AsyncStorage.setItem(STOCKS, JSON.stringify(stocks));
}

function removeAll() {
  return AsyncStorage.removeItem(STOCKS);
}

async function get() {
  try {
    const tickers = await AsyncStorage.getItem(STOCKS);
    if (tickers === null) {
      return DEFAULT;
    }
    return JSON.parse(tickers);
  } catch (error) {
    this.removeAll();
    return DEFAULT;
  }
}

const databaseService = {
  update,
  removeAll,
  get
};

export default databaseService;
