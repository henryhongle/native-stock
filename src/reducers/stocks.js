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

    switch (type) {
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
            };

        case STOCK.GET_STOCKS_ERROR:
            return {
                ...state,
                isFetching: false
            };
    }
}

const addStock = (state, action) => {
    const { payload, type } = action;

    switch (type) {
        case STOCK.ADD_STOCK:
            const newTickers = [payload.stock].concat(state.tickers);
            return {
                ...state,
                tickers: newTickers
            };
    }
}

const deleteStock = (state, action) => {
    const { payload, type } = action;
    
    switch (type) {
        case STOCK.DELETE_STOCK:
            const newTickers = state.tickers.filter((ticker, index) => index !== payload.index);
            return {
                ...state,
                tickers: newTickers
            };

        case STOCK.DELETE_STOCK_CLEANUP:
            const newStocks = state.stocks.filter((stock, index) => index !== payload.index);
            return {
                ...state,
                stocks: newStocks
            };
    }
}

let stockReducer = createReducer(INITIAL_STATE, [
    getStocks,
    addStock,
    deleteStock
]);

export default stockReducer;
