import { createSelector } from 'reselect';
import * as R from 'ramda';

const getStocksState = state => state.stocks.stocks;
const getTickersState = state => state.stocks.tickers;

export const getStocksSelector = createSelector(
  [
    getStocksState,
    getTickersState
  ],
  (stocks, tickers) => {
    const { byId, allIds } = stocks;
    if (allIds.length === 0) return [];
    return R.map(ticker => byId[ticker], tickers);
  }
);

export default {
  getStocksSelector
};
