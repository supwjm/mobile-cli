import { combineReducers } from 'redux';
import { entities,loginPageData } from './login';

let reducers = combineReducers({
    entities,
    loginPageData
});

export default reducers;
