import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Products from "./Products";
// import { products } from "../products";
import { listProducts } from "../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import LoadSpinner from "../components/shared/LoadSpinner";
import MessageAlert from "../components/shared/Message";

function HomeScreen () {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const {isLoading, products, errMess} = productList;
    useEffect(()=>{
        dispatch(listProducts());
    },[dispatch]);
    return (
        <>
            {
                isLoading ? <LoadSpinner/>
                : errMess ? <MessageAlert variant='danger' message={errMess}/>
                :<Row>
                    {
                        products.map( product => (
                            <Col key={product._id}  md={3} className="my-3">
                                <Products product={product}/>
                            </Col>
                        ))
                    }
                </Row>
            }
        </>
    );
}
export default HomeScreen;
