import DatabaseService from './DatabaseService';
const databaseService = new DatabaseService();

let tickers = [];
const EXCHANGE_CODES = [ 'ASE', 'NYQ', 'NAS', 'NGM', 'NMS', 'NYS'];
const stocks_api = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=#STOCKS#`;
const suggestions_api = `http://d.yimg.com/aq/autoc?query=#STOCK#&region=US&lang=en-US`;

function getTickers(stocks) {
    if (!Array.isArray(stocks)) {
        stocks = [stocks];
    }

    let queryString = stocks.reduce((query,stock) => {
        return query + "," + stock.toUpperCase();
    }, "");

    return fetch(stocks_api.replace('#STOCKS#', queryString));
}

class StockService {
    constructor() {
        databaseService.removeAll();
    }

    getStocksData(tickers) {
        return getTickers(tickers)
        .then(response => {
            return response.json();
        })
        .then((json) => {
            return json.quoteResponse.result || [];
        })
        .catch(error => {
            return error;
        });
    }

    getSuggestions(ticker) {
        let q = suggestions_api.replace('#STOCK#', ticker.toUpperCase());
        return fetch(q)
        .then(response => {
            return response.json();
        })
        .then((json) => {
            let tickers = json.ResultSet.Result;
            if (tickers && tickers.length !== 0) {
                let usTickers = tickers.filter(ticker => {
                    if (EXCHANGE_CODES.indexOf(ticker.exch) !== -1) {
                        return ticker;
                    }
                });
                return usTickers;
            } else {
                throw new Error('Invalid ticker');
            }
        })
        .catch( error => error);
    }
}

export let stockService = new StockService();

