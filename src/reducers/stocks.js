import * as R from 'ramda';
import { STOCK } from '../actions/stockActions';
import createReducer from '../helpers/createReducer';

const INITIAL_STATE = {
  stocks: {
    byId: {},
    allIds: []
  },
  tickers: {},
  isFetching: false,
}

const getStocks = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case STOCK.GET_STOCKS:
      return {
        ...state,
        isFetching: true
      };

    case STOCK.GET_STOCKS_SUCCESS:
      const { stocks } = payload;
      return {
        ...state,
        stocks: stocks,
        isFetching: false
      };

    case STOCK.GET_STOCKS_FAILURE:
      return {
        ...state,
        isFetching: false
      };
  }
}

const addStock = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case STOCK.ADD_STOCK:
      const ticker = {
        [payload.stock]: payload.stock
      };

      return {
        ...state,
        tickers: {
          ...ticker,
          ...state.tickers
        },
      };

    case STOCK.ADD_STOCK_SUCCESS:
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
      //HANDLE FLASH MESSAGE
  }
}

const deleteStock = (state, action) => {
  const { payload, type } = action;
  
  switch (type) {
    case STOCK.DELETE_STOCK:
      const newTickers = Object.assign({}, state.tickers);
      delete newTickers[payload.stock];

      return {
        ...state,
        tickers: newTickers
      };

    case STOCK.DELETE_STOCK_CLEANUP:
      const newStocks = Object.assign({}, state.stocks.byId);
      delete newStocks[payload.stock];

      const newAllIds = R.filter((id) => {
        return id !== payload.stock;
      }, state.stocks.allIds)

      return {
        ...state,
        stocks: {
          byId: newStocks,
          allIds: newAllIds
        }
      };
  }
}

let stockReducer = createReducer(INITIAL_STATE, [
  getStocks,
  addStock,
  deleteStock
]);

export default stockReducer;
