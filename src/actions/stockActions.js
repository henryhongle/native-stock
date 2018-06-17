import * as R from 'ramda';
import { stockService } from '../services/StockService';
import { createTypes, asyncVariants } from '../helpers/actionTypes';

export const STOCK = createTypes([
  asyncVariants('GET_STOCKS'),
  asyncVariants('ADD_STOCK'),
  asyncVariants('DELETE_STOCK')
], 'STOCK');

function normalizeStocksData(stocks) {
  const byId = {};
  const allIds = [];

  R.forEach((stock) => {
    byId[stock.symbol] = stock;
    allIds.push(stock.symbol);
  }, stocks);

  return {
    byId,
    allIds
  };
}

export const getStocks = (enableLoading = false) => (dispatch, getState) => {
  if (enableLoading) dispatch({ type: STOCK.GET_STOCKS });

  const state = getState();
  const { tickers } = state.stocks;

  stockService.getStocksData(tickers)
    .then((stocks) => {
      const normalizedStocks = normalizeStocksData(stocks);
      dispatch({
        type: STOCK.GET_STOCKS_SUCCESS,
        payload: {
          stocks: normalizedStocks
        }
      });
    })
    .catch((error) => {
      dispatch({
        type: STOCK.GET_STOCKS_FAILURE,
        error: error.message
      });
    });
};

export const addStock = stock => (dispatch, getState) => {
  const state = getState();
  const { tickers } = state.stocks;

  if (tickers[stock] !== undefined) {
    return;
  }

  dispatch({
    type: STOCK.ADD_STOCK,
    payload: {
      stock
    }
  });

  stockService.getStocksData(stock)
    .then((stockData) => {
      dispatch({
        type: STOCK.ADD_STOCK_SUCCESS,
        payload: {
          newStock: stockData[0]
        }
      });
    })
    .catch((error) => {
      dispatch({
        type: STOCK.ADD_STOCK_FAILURE,
        error
      });
    });
};

export const deleteStock = stock => (dispatch) => {
  dispatch({
    type: STOCK.DELETE_STOCK,
    payload: {
      stock
    }
  });

  dispatch({
    type: STOCK.DELETE_STOCK_CLEANUP,
    payload: {
      stock
    }
  });
};
