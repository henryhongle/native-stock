import DatabaseService from './DatabaseService';
const databaseService = new DatabaseService();

let tickers = [];
const EXCHANGE_CODES = [ 'ASE', 'NYQ', 'NAS', 'NGM', 'NMS', 'NYS'];
const stocks_api = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=#STOCKS#`;
const suggestions_api = `http://d.yimg.com/aq/autoc?query=#STOCK#&region=US&lang=en-US`;

function getTickers(stocks) {
    let queryString = stocks.reduce((query,stock) => {
        return query + "," + stock.toUpperCase();
    }, "");
    
    return fetch(stocks_api.replace('#STOCKS#', queryString));
}

function getSuggestions(ticker) {
    return fetch(suggestions_api.replace('#STOCK#', ticker.toUpperCase()));
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

    getTickers() {
        return databaseService.get()
        .then((tickers) => {
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
        });
    }

    addTicker(ticker) {
        if (tickers.indexOf(ticker) === -1) {
            tickers.push(ticker);
            return databaseService.update(tickers)
            .then(() => {
                return this.getTickers();
            });
        } else {
            return this.getTickers();
        }
    }

    removeTicker(index) {
        tickers.splice(index, 1);
        databaseService.update(tickers);
    }

    getDetail(ticker) {
        return getTickers([ticker])
        .then(response => response.json())
        .then(json => json.query.results.quote)
        .catch(error => error);
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

