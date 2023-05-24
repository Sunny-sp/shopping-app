import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { applyMiddleware } from '@reduxjs/toolkit';
import { productReducer, productDetailReducer } from './productReducer';
import { cartReducer } from './cartReducer';

const cartItemsFromStorage = localStorage.getItem('cartItems') || [];
const reducers =combineReducers({
    productList: productReducer,
    productDetails: productDetailReducer,
    cart: cartReducer
});
// const initialState = {
//     cart: { cartItems: cartItemsFromStorage}
// };
const middleWares =[thunk];
const store = configureStore(
    {reducer: reducers},
    applyMiddleware(middleWares)
)

export default store;
