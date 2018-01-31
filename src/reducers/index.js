import navReducer from './nav';
import stockReducer from './stocks';
import { combineReducers } from 'redux';

const initialState = {
    errors: null
}

const errorsReducer = (state = initialState, action) => {
    const { error, type } = action;

    if (error) {
        return {
            errors: error
        }
    }

    return state;
}

export default AppReducer = combineReducers({
    nav: navReducer,
    stocks: stockReducer,
    errors: errorsReducer
});