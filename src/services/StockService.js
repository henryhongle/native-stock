import * as R from 'ramda';

const EXCHANGE_CODES = ['ASE', 'NYQ', 'NAS', 'NGM', 'NMS', 'NYS'];
const STOCKS_API = 'https://query1.finance.yahoo.com/v7/finance/quote?symbols=#STOCKS#';
const SUGGESTIONS_API = 'http://d.yimg.com/aq/autoc?query=#STOCK#&region=US&lang=en-US';

const errMsg = 'Oops..Something failed';

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

async function getStocksData(tickers) {
  try {
    const response = await getTickers(tickers);
    const data = await response.json();
    return data.quoteResponse.result;
  } catch (error) {
    throw new Error(errMsg);
  }
}

async function getSuggestions(suggestion) {
  const api = SUGGESTIONS_API.replace('#STOCK#', suggestion.toUpperCase());
  try {
    const response = await fetch(api);
    const data = await response.json();
    const tickers = R.pathOr([], ['ResultSet', 'Result'])(data);
    return R.filter((ticker) => {
      return EXCHANGE_CODES.indexOf(ticker.exch) !== -1;
    }, tickers);
  } catch (error) {
    throw new Error(errMsg);
  }
}

const stockService = {
  getStocksData,
  getSuggestions
};

export default stockService;
