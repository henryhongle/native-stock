import navReducer from './nav';
import stockReducer from './stocks';
import { combineReducers } from 'redux';
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
    }
  }

  switch (type) {
    case ERRORS.DISMISS_ERROR:
      return {
        message: null
      }
  }

  return state;
}

export default AppReducer = combineReducers({
  nav: navReducer,
  stocks: stockReducer,
  errors: errorsReducer
});