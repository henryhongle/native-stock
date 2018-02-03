import { STOCK } from '../actions/stockActions';
import createReducer from '../helpers/createReducer';

const INITIAL_STATE = {
    stocks: [],
    tickers: [],
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
            const newTickers = [payload.stock].concat(state.tickers);
            return {
                ...state,
                tickers: newTickers
            };

        case STOCK.ADD_STOCK_SUCCESS:
            const newStocks = payload.stockData.concat(state.stocks);
            return {
                ...state,
                stocks: newStocks
            };

        case STOCK.ADD_STOCK_FAIL:
            //HANDLE FLASH MESSAGE
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
