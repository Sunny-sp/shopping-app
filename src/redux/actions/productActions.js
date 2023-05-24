import axios from 'axios';
import * as ACTION_TYPES from '../actionTypes/productActionTypes.js';
const baseUrl = 'http://localhost:8080/';

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: ACTION_TYPES.PRODUCT_LIST_REQUEST });
        const response = await axios.get(baseUrl + 'products');
        console.log('products: ' + JSON.stringify(response.data));
        dispatch({
            type: ACTION_TYPES.PRODUCT_LIST_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: ACTION_TYPES.PRODUCT_LIST_FAILED,
            payload: error.response.data.message
        });
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ACTION_TYPES.PRODUCT_DETAIL_REQUEST });
        const response = await axios.get(baseUrl + 'products/' + id);
        console.log('product details: ' + JSON.stringify(response.data));
        dispatch({
            type: ACTION_TYPES.PRODUCT_DETAIL_SUCCESS,
            payload: response.data
        });
        console.log('after dispatch: ' + JSON.stringify(response.data));
    } catch (error) {
        dispatch({
            type: ACTION_TYPES.PRODUCT_DETAIL_FAILED,
            payload: error.response.data.message
        });
    }
}
