import React from 'react';
import { AppState } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import logger from 'redux-logger';
import databaseService from './src/services/DatabaseService';
import AppReducer from './src/reducers';
import AppWithNavigationState from './src/AppNavigator';

const middlewares = [
  Thunk.withExtraArgument()
];

if (__DEV__) {
  middlewares.push(logger);
}

const store = createStore(
  AppReducer,
  applyMiddleware(...middlewares)
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStoreLoading: true,
      store,
      unsubscribe: null
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange.bind(this));

    databaseService.get()
      .then((persistedTickers) => {
        const oldData = this.state.store.getState();
        const newData = {
          ...oldData,
          stocks: {
            ...oldData.stocks,
            tickers: persistedTickers
          }
        };

        const newStore = createStore(AppReducer, newData, applyMiddleware(...middlewares));
        const unsubscribe = newStore.subscribe(this.handleAppStateChange.bind(this));
        this.setState({
          store: newStore,
          isStoreLoading: false,
          unsubscribe
        });
      });
  }

  componentWillUnmount() {
    if (typeof this.state.unsubscribe === 'function') {
      this.state.unsubscribe();
    }
    AppState.removeEventListener('change', this.handleAppStateChange.bind(this));
  }

  handleAppStateChange() {
    const data = this.state.store.getState();
    const { tickers } = data.stocks;
    databaseService.update(tickers);
  }

  render() {
    return !this.state.isStoreLoading && (
      <Provider store={this.state.store} >
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default App;
