import * as ACTION_TYPES from './actionTypes/cartActionTypes';

const initialCartState = {
    cartItems: [],
}
export const cartReducer = (state = initialCartState, action) => {
    switch(action.type) {
        case ACTION_TYPES.CART_ADD_ITEM: 
            return {...state, cartItems: [...state.cartItems, action.payload]}
        case ACTION_TYPES.CART_REMOVE_ITEM: {
            const item = action.payload;
            const newItems = state.cartItems.filter( product => product !== item);
            return { ...state, cartItems: newItems}
        }
        default: return state 
    }
}
