'use strict';
import DatabaseService from './DatabaseService';
const databaseService = new DatabaseService();

let tickers = [];

//https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=demo

var q_getStocks = 'Select * from yahoo.finance.quotes where symbol in (STOCKS);';
const api = 'https://query.yahooapis.com/v1/public/yql'

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


export default class StockService {
    constructor() {
        //databaseService.removeAll();
    }

    getTickers() {
        return databaseService.get()
        .then((data) => {
            tickers = data;
            console.log('TICKERS', tickers);
            return getTickers(tickers)
            .then(response => {
                return response.json();
            })
            .then((json) => {
                return json.query.results.quote || [];
            })
            .catch(error => {
                console.log(error);
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
        .then(json => json.qury.results.quote)
        .catch(error => 'Something wrong' + error);
    }
}

