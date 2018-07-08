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

    R.forEach((id) => {
      const position = positions.byId[id];
      const stock = stocks.byId[position.symbol];

      if (stock) {
        position.totalValue = calcTotalValue(position, stock);
        position.totalCost = calcTotalCost(position, stock);

        position.totalGain = calcTotalGain(position.totalValue, position.totalCost);
        position.totalGainPercent = calcTotalGainPercent(position.totalGain, position.totalCost);

        const yesterdayTotalValue = calculateYesterdayTotalValue(position, stock);

        position.dayGain = calcDayGain(yesterdayTotalValue, position.totalValue);
        position.dayGainPercent = calcDayGainPercent(position.dayGain, yesterdayTotalValue);
      }

      result.push(position);
    }, positions.allIds);

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
