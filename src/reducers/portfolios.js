import uuid from 'uuid/v4';
import * as R from 'ramda';
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

const deletePosition = (state, action) => {
  const { payload, type } = action;
  const { positions } = state;

  switch (type) {
    case PORTFOLIO.DELETE_POSITION:
      const allIds = R.reject(R.equals(payload.id), positions.allIds);
      const byId = R.reject(R.equals(payload.id), positions.byId);
      return {
        ...state,
        positions: {
          byId,
          allIds
        }
      };

    default:
      return state;
  }
};


const portfoliosReducer = createReducer(INITIAL_STATE, [
  addPosition,
  deletePosition
]);

export default portfoliosReducer;
