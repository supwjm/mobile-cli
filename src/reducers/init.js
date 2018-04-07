import {
    LOGIN_LOADING,
} from '../actions';

export function init(state = {}, action) {
    switch(action.type) {
        case LOGIN_SUCCESS:
        let res = Object.assign({},state,{loginUser: action.payload});
        return res;
    default:
        return state;
    }
}
