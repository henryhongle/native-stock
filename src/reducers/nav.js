import { NavigationActions } from 'react-navigation';
import { StockStack } from '../AppNavigator';

const firstAction = StockStack.router.getActionForPathAndParams('Home');
const initialState = StockStack.router.getStateForAction(firstAction);

const navReducer = (state = initialState, action) => {
    const nextState = StockStack.router.getStateForAction(action, state);
    
    return nextState || state;
}

export default navReducer;