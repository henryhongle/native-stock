import { combineReducers } from 'redux';
import { ERRORS } from '../actions/errorActions';
import navReducer from './nav';
import stockReducer from './stocks';
import searchReducer from './search';

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
  errors: errorsReducer,
  search: searchReducer
});

export default AppReducer;
