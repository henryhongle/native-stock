import { SEARCH } from '../actions/searchActions';
import createReducer from '../helpers/createReducer';

const INITIAL_STATE = {
  tickers: [],
  isSearching: false,
  keyword: ''
};

const searchTicker = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case SEARCH.GET_SUGGESTED_TICKERS:
      return {
        ...state,
        isSearching: true
      };

    case SEARCH.GET_SUGGESTED_TICKERS_SUCCESS:
      return {
        ...state,
        isSearching: false,
        tickers: payload.tickers,
        keyword: payload.keyword
      };

    default:
      return state;
  }
};

const clearSearch = (state, action) => {
  const { type } = action;

  switch (type) {
    case SEARCH.CLEAR_SEARCH:
      return INITIAL_STATE;

    default:
      return state;
  }
};

const searchReducer = createReducer(INITIAL_STATE, [
  searchTicker,
  clearSearch
]);

export default searchReducer;

