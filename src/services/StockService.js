const EXCHANGE_CODES = [ 'ASE', 'NYQ', 'NAS', 'NGM', 'NMS', 'NYS'];
const stocks_api = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=#STOCKS#`;
const suggestions_api = `http://d.yimg.com/aq/autoc?query=#STOCK#&region=US&lang=en-US`;

function getTickers(stocks) {
    if (!Array.isArray(stocks)) {
        if (typeof stocks === 'string') {
            stocks = {
                [stocks]: stocks
            }
        }
        stocks = Object.values(stocks);
    }
    const queryString = stocks.join(',');
    return fetch(stocks_api.replace('#STOCKS#', queryString));
}

//helper to specificly conver stock data array to object
function arrayToObject(array) {
    if (!Array.isArray(array)) {
        return {};
    }

    const data = array.reduce((obj, item) => {
        obj[item.symbol] = item;
        return obj;
    }, {});

    return data;
}

class StockService {
    getStocksData(tickers) {
        return getTickers(tickers)
        .then(response => {
            return response.json();
        })
        .then((json) => {
            const data = arrayToObject(json.quoteResponse.result);
            return data;
        })
        .catch(error => {
            if (error instanceof TypeError) {
                throw new Error(error.message);
            }
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
        .catch( error => {
            if (error instanceof TypeError) {
                throw new Error(error.message);
            } else {
                throw new Error('Oops..Something failed');
            }
        });
    }
}

export let stockService = new StockService();

