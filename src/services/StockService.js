import * as R from 'ramda';

const EXCHANGE_CODES = ['ASE', 'NYQ', 'NAS', 'NGM', 'NMS', 'NYS'];
const STOCKS_API = 'https://query1.finance.yahoo.com/v7/finance/quote?symbols=#STOCKS#';
const SUGGESTIONS_API = 'http://d.yimg.com/aq/autoc?query=#STOCK#&region=US&lang=en-US';

function getTickers(stocks) {
  if (!Array.isArray(stocks)) {
    if (typeof stocks === 'string') {
      stocks = {
        [stocks]: stocks
      };
    }
    stocks = Object.values(stocks);
  }
  const queryString = stocks.join(',');
  return fetch(STOCKS_API.replace('#STOCKS#', queryString));
}

function getStocksData(tickers) {
  return getTickers(tickers)
    .then(response => response.json())
    .then(json => json.quoteResponse.result)
    .catch((error) => {
      if (error instanceof TypeError) {
        throw new Error(error.message);
      }
    });
}

function getSuggestions(suggestion) {
  const q = SUGGESTIONS_API.replace('#STOCK#', suggestion.toUpperCase());
  return fetch(q)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const tickers = json.ResultSet.Result;
      if (tickers && tickers.length !== 0) {
        return R.filter((ticker) => {
          if (EXCHANGE_CODES.indexOf(ticker.exch) !== -1) {
            return ticker;
          }
          return null;
        }, tickers);
      }

      return [];
    })
    .catch((error) => {
      if (error instanceof TypeError) {
        throw new Error(error.message);
      } else {
        throw new Error('Oops..Something failed');
      }
    });
}

const stockService = {
  getStocksData,
  getSuggestions
};

export default stockService;
