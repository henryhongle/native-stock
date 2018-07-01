import { createSelector } from 'reselect';
import * as R from 'ramda';

const getStocksState = state => state.stocks.stocks;

export const getStocksSelector = createSelector(
  [getStocksState],
  (stocks) => {
    const { byId, allIds } = stocks;
    const result = [];
    R.forEach((id) => {
      result.push(byId[id]);
    }, allIds);
    return result;
  }
);

export default {
  getStocksSelector
};
