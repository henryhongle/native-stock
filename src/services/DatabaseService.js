import { AsyncStorage } from 'react-native';

const STOCKS_PORTFOLIO = 'STOCKS_PORTFOLIO';

function update(data) {
  AsyncStorage.setItem(STOCKS_PORTFOLIO, JSON.stringify(data));
}

function remove() {
  AsyncStorage.removeItem(STOCKS_PORTFOLIO);
}

async function get() {
  const initial = {
    tickers: [],
    positions: {
      byId: {},
      allIds: []
    }
  };

  try {
    const data = JSON.parse(await AsyncStorage.getItem(STOCKS_PORTFOLIO));
    if (data === null) {
      return initial;
    }
    return data;
  } catch (error) {
    this.removeAll();
    return initial;
  }
}

const databaseService = {
  update,
  remove,
  get
};

export default databaseService;
