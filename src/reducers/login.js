import {
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from '../actions';

export function entities(state = {}, action) {
    switch(action.type) {
        case LOGIN_SUCCESS:
        let res = Object.assign({},state,{loginUser: action.payload});
        return res;
    default:
        return state;
    }
}

export function loginPageData(state = {}, action) {
    switch(action.type) {
        case LOGIN_LOADING:
            return state;

            //return {...state, loading: action.payload};
        case LOGIN_FAILURE:
            return state;
            //return {...state, error: action.payload};
        case LOGIN_SUCCESS:
            return state;
            console.log(state)
            //return {...state, error: null};
        default:
            return state;
    }
}
