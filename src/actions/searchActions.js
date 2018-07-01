import stockService from '../services/StockService';
import { createTypes, asyncVariants } from '../helpers/actionTypes';

export const SEARCH = createTypes([
  asyncVariants('GET_SUGGESTED_TICKERS'),
  'CLEAR_SEARCH'
], 'SEARCH');

export const searchTicker = ticker => (dispatch) => {
  dispatch({
    type: SEARCH.GET_SUGGESTED_TICKERS
  });

  stockService.getSuggestions(ticker)
    .then((tickers) => {
      dispatch({
        type: SEARCH.GET_SUGGESTED_TICKERS_SUCCESS,
        payload: {
          tickers,
          keyword: ticker
        }
      });
    });
};

export const clearTickerSearch = () => (dispatch) => {
  dispatch({
    type: SEARCH.CLEAR_SEARCH
  });
};
