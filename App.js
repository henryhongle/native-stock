import React from 'react';
import {
    Text,
    AppState,
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import { databaseService } from './src/services/DatabaseService';

import AppReducer from './src/reducers';
import AppWithNavigationState from './src/AppNavigator';

const logger = store => next => action => {
    let result = next(action)
    console.log('next state', store.getState().stocks.tickers);
    return result;
}

const middlewares = [
    Thunk.withExtraArgument(),
    //logger
]

let store = createStore(
    AppReducer,
    applyMiddleware(...middlewares)
)

const App2 = () => {
    return (
        <Provider store={store} >
            <AppWithNavigationState />
        </Provider>
    );
}

//to get persisted state before mounting the app
//can also use redux-persist
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isStoreLoading: true,
            store: store,
            unsubscribe: null
        }
    }

    componentWillMount() {
        AppState.addEventListener('change', this._handleAppStateChange.bind(this));

        databaseService.get()
        .then(persistedTickers => {
            //persisted state only contain stocks.tickers
            const oldData = this.state.store.getState();
            const newData = {
                ...oldData,
                stocks: {
                    ...oldData.stocks,
                    tickers: persistedTickers
                }
            };

            const newStore = createStore(AppReducer, newData,  applyMiddleware(...middlewares));
            const unsubscribe = newStore.subscribe(this._handleAppStateChange.bind(this));
            this.setState({
                store: newStore,
                isStoreLoading: false,
                unsubscribe: unsubscribe
            }); 
        });
    }

    componentWillUnmount() {
        if (typeof(this.state.unsubscribe) === "function" ) {
            this.state.unsubscribe();
        }
        AppState.removeEventListener('change', this._handleAppStateChange.bind(this));
    }

    _handleAppStateChange() {
        const data = this.state.store.getState();
        const { tickers } = data.stocks;
        databaseService.update(tickers);
    }

    render() {
        return !this.state.isStoreLoading && (
            <Provider store={this.state.store} >
                <AppWithNavigationState />
            </Provider>
        )
    }
}

export default App;
