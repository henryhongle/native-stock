import { createSelector } from 'reselect';
import * as R from 'ramda';

const getStocksState = state => state.stocks.stocks;
const getPositionsState = state => state.portfolios.positions;

export const getPositions = createSelector(
  [
    getPositionsState,
    getStocksState
  ],
  (positions, stocks) => {
    const result = [];

    if (stocks.allIds.length === 0) {
      return result;
    }

    R.forEach((id) => {
      const position = positions.byId[id];
      const stock = stocks.byId[position.symbol];
      const item = R.merge({}, position);

      if (stock) {
        item.totalValue = calcTotalValue(item, stock);
        item.totalCost = calcTotalCost(item, stock);

        item.totalGain = calcTotalGain(item.totalValue, item.totalCost);
        item.totalGainPercent = calcTotalGainPercent(item.totalGain, item.totalCost);

        const yesterdayTotalValue = calculateYesterdayTotalValue(item, stock);

        item.dayGain = calcDayGain(yesterdayTotalValue, item.totalValue);
        item.dayGainPercent = calcDayGainPercent(item.dayGain, yesterdayTotalValue);
      }

      result.push(item);
    }, positions.allIds);

    console.log('result', result);
    return result;
  }
);

function calcTotalValue(position, stock) {
  return position.numShares * stock.regularMarketPrice;
}

function calcTotalCost(position) {
  return (position.numShares * position.costPerShare) + position.fees;
}

function calcTotalGain(totalValue, totalCost) {
  return totalValue - totalCost;
}

function calcTotalGainPercent(totalGain, totalCost) {
  return (totalGain / totalCost) * 100;
}

function calculateYesterdayTotalValue(position, stock) {
  return position.numShares * stock.regularMarketPreviousClose;
}

function calcDayGain(yesterday, today) {
  return today - yesterday;
}

function calcDayGainPercent(dayGain, yesterday) {
  return (dayGain / yesterday) * 100;
}

export default {
  getPositions
};
