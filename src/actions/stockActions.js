import { stockService } from '../services/StockService';
import { createTypes, async } from '../helpers/actionTypes';

export const STOCK = createTypes([
    async('GET_STOCKS'),
    async('ADD_TICKER')
], 'STOCK');

export const getStocks = () => (dispatch, getState) => {
    dispatch({ type: STOCK.GET_STOCKS });
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

export const addTicker = (ticker) => (dispatch, getState) => {
    dipatch({
        type: STOCK.ADD_TICKER_SUCCESS,
        payload: {
            ticker
        }
    })

    setTimeout(() => {
        getStock();
    }, 0);
}
