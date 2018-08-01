import * as R from 'ramda';
import { STOCK } from '../actions/stockActions';
import createReducer from '../helpers/createReducer';

const INITIAL_STATE = {
  stocks: {
    byId: {},
    allIds: []
  },
  tickers: [],
  isFetching: false
};

const getStocks = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case STOCK.GET_STOCKS:
      return {
        ...state,
        isFetching: true
      };

    case STOCK.GET_STOCKS_SUCCESS:
      return {
        ...state,
        stocks: payload.stocks,
        isFetching: false
      };

    case STOCK.GET_STOCKS_FAILURE:
      return {
        ...state,
        isFetching: false
      };

    default:
      return state;
  }
};

const addStock = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case STOCK.ADD_STOCK_SUCCESS:
      const { newStock } = payload;
      const tickers = R.prepend(newStock.symbol, state.tickers);

      return {
        ...state,
        stocks: {
          byId: {
            ...state.stocks.byId,
            [newStock.symbol]: newStock
          },
          allIds: [newStock.symbol].concat(state.stocks.allIds)
        },
        tickers
      };

    case STOCK.ADD_STOCK_FAILURE:
    default:
      return state;
  }
};

const addStockData = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case STOCK.ADD_STOCK_DATA_SUCCESS:
      const { newStock } = payload;

      return {
        ...state,
        stocks: {
          byId: {
            ...state.stocks.byId,
            [newStock.symbol]: newStock
          },
          allIds: [newStock.symbol].concat(state.stocks.allIds)
        }
      };

    case STOCK.ADD_STOCK_FAILURE:
    default:
      return state;
  }
};

const deleteStock = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case STOCK.DELETE_STOCK:
      const tickers = R.reject(R.equals(payload.stock), state.tickers);

      return {
        ...state,
        tickers
      };

    default:
      return state;
  }
};

const stockReducer = createReducer(INITIAL_STATE, [
  getStocks,
  addStock,
  deleteStock,
  addStockData
]);

export default stockReducer;
