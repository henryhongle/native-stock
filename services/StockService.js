'use strict';
import DatabaseService from './DatabaseService';
const databaseService = new DatabaseService();

let tickers = [];
let q_getStocks = 'Select * from yahoo.finance.quotes where symbol in (STOCKS);';
const EXCHANGE_CODES = [ 'ASE', 'NYQ', 'NAS', 'NGM', 'NMS', 'NYS'];

//http://d.yimg.com/aq/autoc?query=f&region=IN&lang=en-US&callback=YAHOO.Finance.SymbolSuggest.ssCallback
const api = 'https://query.yahooapis.com/v1/public/yql'

let suggestions_api = `http://d.yimg.com/aq/autoc?query=#STOCK#&region=US&lang=en-US`


let query_default = {
    q: '',
    format: 'json',
    diagnostics: 'false',
    env: 'store://datatables.org/alltableswithkeys',
    callback: ''
};

function getTickers(stocks) {    
    let q_str = stocks.map((stock) => {
        return '"' + stock + '"';
    })
    .join();
    
    let q = q_getStocks.replace('STOCKS', q_str);
    let query = {
        ...query_default,
        q: q
    };
    query = objectToQueryString(query);
    return fetch(api + query);
}

function objectToQueryString(obj) {
    var query = Object.keys(obj)
        .filter(key => obj[key] !== '' && obj[key] !== null)
        .map(key => key + '=' + obj[key])
        .join('&');
    return query.length > 0 ? '?' + query : null;
}


function getSuggestions(ticker) {
    let q = suggestions_api.replace('#STOCK#', ticker.toUpperCase());
    return fetch(q);
}

class StockService {
    constructor() {
        //databaseService.removeAll();
    }

    getTickers() {
        return databaseService.get()
        .then((data) => {
            tickers = data;
            return getTickers(tickers)
            .then(response => {
                return response.json();
            })
            .then((json) => {
                return json.query.results.quote || [];
            })
            .catch(error => {
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
        .catch(error => 'Something wrong' + error);
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

