import uuid from 'uuid/v4';
import stockService from '../services/StockService';
import { createTypes } from '../helpers/actionTypes';
import { STOCK } from './stockActions';

export const PORTFOLIO = createTypes([
  'ADD_POSITION'
], 'PORTFOLIO');

export const addPosition = position => (dispatch, getState) => {
  const state = getState();
  const { allIds } = state.stocks.stocks;
  const { symbol } = position;
  position.id = uuid();

  if (allIds.indexOf(symbol) === -1) {
    stockService.getStocksData(symbol)
      .then((stockData) => {
        dispatch({
          type: STOCK.ADD_STOCK_DATA_SUCCESS,
          payload: {
            newStock: stockData[0]
          }
        });

        dispatch({
          type: PORTFOLIO.ADD_POSITION,
          payload: {
            position
          }
        });
      })
      .catch((error) => {
        dispatch({
          type: STOCK.ADD_STOCK_DATA_FAILURE,
          error
        });
      });
  } else {
    dispatch({
      type: PORTFOLIO.ADD_POSITION,
      payload: {
        position
      }
    });
  }
};
