import createReducer from '../helpers/createReducer';

const INITIAL_STATE = {
  positions: {
    byId: {
      1: {
        id: 1,
        symbol: 'MSFT',
        numShares: 100,
        costPerShare: 90,
        fees: 14.00
      },
      2: {
        id: 2,
        symbol: 'AAPL',
        numShares: 10,
        costPerShare: 130,
        fees: 14.00
      }
    },
    allIds: [1, 2]
  }
};

const addPosition = (state) => {
  return state;
};


const portfoliosReducer = createReducer(INITIAL_STATE, [
  addPosition
]);

export default portfoliosReducer;
