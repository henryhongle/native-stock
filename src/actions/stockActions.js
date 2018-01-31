import { stockService } from '../services/StockService';
import { createTypes, async } from '../helpers/actionTypes';

export const STOCK = createTypes([
    async('GET_STOCKS'),
    async('ADD_STOCK'),
    async('DELETE_STOCK')
], 'STOCK');

export const getStocks = (enableLoading) => (dispatch, getState) => {
    if (enableLoading) dispatch({ type: STOCK.GET_STOCKS });
    const state = getState();
    const { tickers }  = state.stocks;

    stockService.getStocksData(tickers)
    .then(stocks => {
        dispatch({
            type: STOCK.GET_STOCKS_SUCCESS,
            payload: {
                stocks
            }
        });
    })
    .catch(error => {
        dispatch({
            type: STOCK.GET_STOCKS_FAIL,
            error
        });
    });
};

export const addStock = (stock) => (dispatch, getState) => {
    const state = getState();
    const { tickers }  = state.stocks;

    //already in the list
    if (tickers.indexOf(stock) !== -1) {
        return;
    }

    dispatch({
        type: STOCK.ADD_STOCK,
        payload: {
            stock
        }
    });

    stockService.getStocksData(stock)
    .then(stockData => {
        dispatch({
            type: STOCK.ADD_STOCK_SUCCESS,
            payload: {
                stockData
            }
        })
    })
    .catch( error => {
        dispatch({
            type: STOCK.ADD_STOCK_FAIL,
            error
        });
    })
}

export const deleteStock = (index) => (dispatch, getState) => {
    dispatch({
        type: STOCK.DELETE_STOCK,
        payload: {
            index
        }
    });

    dispatch({
        type: STOCK.DELETE_STOCK_CLEANUP,
        payload: {
            index
        }
    });
}
