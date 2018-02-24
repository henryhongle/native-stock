import { STOCK } from '../actions/stockActions';
import createReducer from '../helpers/createReducer';

const INITIAL_STATE = {
    stocks: {},
    tickers: {},
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

        case STOCK.GET_STOCKS_FAIL:
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
            const ticker = {
                [payload.stock]: payload.stock
            };

            return {
                ...state,
                tickers: {
                    ...ticker,
                    ...state.tickers
                },
            };

        case STOCK.ADD_STOCK_SUCCESS:
            const newStock = payload.stockData;
            return {
                ...state,
                stocks: {
                    ...newStock,
                    ...state.stocks
                }
            };

        case STOCK.ADD_STOCK_FAIL:
            //HANDLE FLASH MESSAGE
    }
}

const deleteStock = (state, action) => {
    const { payload, type } = action;
    
    switch (type) {
        case STOCK.DELETE_STOCK:
            const newTickers = Object.assign({}, state.tickers);
            delete newTickers[payload.stock];

            return {
                ...state,
                tickers: newTickers
            };

        case STOCK.DELETE_STOCK_CLEANUP:
            const newStocks = Object.assign({}, state.stocks);
            delete newStocks[payload.stock];

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
