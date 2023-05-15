import axios from "axios"
import * as ACTION_TYPES from '../actionTypes/cartActionTypes';
const baseUrl ='http://localhost:8080/';

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const response = await axios.get(baseUrl + 'products/' + id);
    const data = response.data;
    console.log('cartitems:' + JSON.stringify(data));
    dispatch({
        type: ACTION_TYPES.CART_ADD_ITEM,
        payload : {...data, qty}
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}
