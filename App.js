import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';

import AppReducer from './src/reducers';
import AppWithNavigationState from './src/AppNavigator';

const logger = store => next => action => {
    console.log('dispatching', action);
    return next(action);
}

const middlewares = [
    Thunk.withExtraArgument()
]

const store = createStore(
    AppReducer,
    applyMiddleware(...middlewares)
)

const App = () => {
    return (
        <Provider store={store} >
            <AppWithNavigationState />
        </Provider>
    );
}

export default App;
