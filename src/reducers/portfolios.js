import uuid from 'uuid/v4';
import { PORTFOLIO } from '../actions/portfolioActions';
import createReducer from '../helpers/createReducer';

const id1 = uuid();

const INITIAL_STATE = {
  positions: {
    byId: {
      [id1]: {
        id: id1,
        symbol: 'MSFT',
        numShares: 100,
        costPerShare: 90,
        fees: 14.00
      }
    },
    allIds: [id1]
  }
};

const addPosition = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case PORTFOLIO.ADD_POSITION:
      const { position } = payload;
      const { id } = position;

      return {
        ...state,
        positions: {
          byId: {
            ...state.positions.byId,
            [id]: position
          },
          allIds: [id].concat(state.positions.allIds)
        }
      };

    default:
      return state;
  }
};


const portfoliosReducer = createReducer(INITIAL_STATE, [
  addPosition
]);

export default portfoliosReducer;
