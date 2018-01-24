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
    dispatch({
        type: STOCK.ADD_STOCK,
        payload: {
            stock
        }
    });
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
