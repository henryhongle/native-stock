import { combineReducers } from 'redux';
import navReducer from './nav';
import stockReducer from './stocks';

import { ERRORS } from '../actions/errorActions';

const initialState = {
  errors: {
    message: null
  }
};

const errorsReducer = (state = initialState, action) => {
  const { error, type } = action;
  if (error) {
    return {
      message: error
    };
  }

  switch (type) {
    case ERRORS.DISMISS_ERROR:
      return {
        message: null
      };

    default:
      return state;
  }
};

const AppReducer = combineReducers({
  nav: navReducer,
  stocks: stockReducer,
  errors: errorsReducer
});

export default AppReducer;
