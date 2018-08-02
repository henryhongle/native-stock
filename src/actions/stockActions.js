import * as R from 'ramda';
import stockService from '../services/StockService';
import { createTypes, asyncVariants } from '../helpers/actionTypes';

export const STOCK = createTypes([
  asyncVariants('GET_STOCKS'),
  asyncVariants('ADD_STOCK'),
  asyncVariants('ADD_STOCK_DATA'),
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

  const positionTickers = R.reduce((acc, val) => {
    acc.push(val.symbol);
    return acc;
  }, [], R.values(state.portfolios.positions.byId));

  stockService.getStocksData(R.union(positionTickers, tickers))
    .then((stocks) => {
      const normalizedStocks = normalizeStocksData(stocks);

      if (R.equals(normalizedStocks.byId, state.stocks.stocks.byId)) {
        return;
      }

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

  if (tickers.indexOf(stock) !== -1) {
    return;
  }

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
};
