import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { addToCart } from "../redux/actions/cartActions";


function CartScreen () {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const {id} = useParams();
    const location = useLocation();
    const qty = location.search ? location.search.split('=')[1] : 1;
    useEffect(() => {
        if(id){
            dispatch(addToCart(id, qty));
        }
    },[dispatch, id, qty])
    return (
        <h1>{cart.cartItems.name}</h1>
    )
}

export default CartScreen;
