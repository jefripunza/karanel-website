import { MenuOpenReducer } from './MenuOpenReducer';
// import { NavPageReducer } from './NavPageReducer';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
    menuState: MenuOpenReducer,
    // pageState: NavPageReducer,
});
