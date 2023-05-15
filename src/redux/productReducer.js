import * as ACTION_TYPES from './actionTypes/productActionTypes.js';
const initialState = {
    isLoading: false,
    products: [],
    errMess: ''
}

export const productReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTION_TYPES.PRODUCT_LIST_REQUEST:{
            return {...state, isLoading: true};
        }
        case ACTION_TYPES.PRODUCT_LIST_SUCCESS:{
            return {...state, isLoading: false, products: action.payload};
        }
        case ACTION_TYPES.PRODUCT_LIST_FAILED:{
            return {...state, isLoading: false, errMess: action.payload};
        }
        default: return state;
    }
}
const initialDetailState = {
    isLoading: false,
    product: {},
    errMess: ''
}
export const productDetailReducer = (state = initialDetailState, action) => {
    switch(action.type){
        case ACTION_TYPES.PRODUCT_DETAIL_REQUEST:{
            return {...state, isLoading: true};
        }
        case ACTION_TYPES.PRODUCT_DETAIL_SUCCESS:{
            return {...state, isLoading: false, product: action.payload};
        }
        case ACTION_TYPES.PRODUCT_DETAIL_FAILED:{
            return {...state, isLoading: false, errMess: action.payload};
        }
        default: return state;
    }
}
