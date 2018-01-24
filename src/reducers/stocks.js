import { STOCK } from '../actions/stockActions';
import createReducer from '../helpers/createReducer';

const DEFAULT = [
    'AAPL',
    'FB',
    'SNAP',
    'TWLO'
];

const INITIAL_STATE = {
    stocks: [],
    tickers: DEFAULT,
    isFetching: false,
}

const getStocks = (state, action) => {
    const { payload, type } = action;

    switch (action.type) {
        case STOCK.GET_STOCKS:
            return {
                ...state,
                isFetching: true
            };

        case STOCK.GET_STOCKS_SUCCESS:
            const { stocks } = payload;
            return {
                ...state,
                stocks: stocks,
                isFetching: false
            }

        case STOCK.GET_STOCKS_ERROR:
            return {
                ...state,
                isFetching: false
            }
    }
}

const addTicker = (state, action) => {
    const { payload, type } = action;

    switch (action.type) {

    }
}


let stockReducer = createReducer(INITIAL_STATE, [
    getStocks
]);

export default stockReducer;
