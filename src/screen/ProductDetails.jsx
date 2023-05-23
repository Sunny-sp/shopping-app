import React, { useEffect, useState } from "react";
import { Row, Col, ListGroupItem, Button, Image, Container, ListGroup, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import { Link, useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import { listProductDetails } from '../redux/actions/productActions';
import { useDispatch, useSelector } from "react-redux";
// const baseUrl = 'http://localhost:8080/';
function ProductDetails () {
    const {id} = useParams();
    // console.log('id of the product: ' + id);

    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails);
    const { isLoading, product, errMess } = productDetails
    console.log(isLoading);
    console.log(errMess);
    useEffect(()=>{
        if(id !== undefined){
            dispatch(listProductDetails(id));
        }
    },[dispatch, id]);
    const navigate = useNavigate();
    const [items, setItems] =useState(1);
    const selectItems = (e) => {
        setItems(e.target.value)
    }
    const addToCartHandler = () => {
        navigate(`/cart/${product._id}?qty=${items}`);
    }
    return (
        <Container className="my-3">
            <h1>Component</h1>
            <Link to='/home'>
                <Button>
                    <i className="fa fa-arrow-left"></i>
                    &nbsp;&nbsp;Go Back</Button>
            </Link>
            <hr/>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid></Image>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h3>{product.name}</h3>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                        </ListGroupItem>
                        <ListGroupItem>
                            Price: ${product.price}
                        </ListGroupItem>
                        <ListGroupItem>
                            {product.description}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <ListGroup>
                        <ListGroupItem>
                            <Row className="text-center">
                                <Col md={3}>Status: </Col>
                                <Col>{product.countInStock > 0 ? ' In-Stock' : 'Out Of Stock'}</Col>
                            </Row>
                        </ListGroupItem>
                        {
                            product.countInStock > 0
                            ?
                            <ListGroupItem>
                                <Row>
                                    <Col md={5}>QTY: </Col>
                                    <Col>
                                        <Form.Select onChange={e => selectItems(e)}>
                                            {
                                                [...Array(product.countInStock).keys()].map((x, index) => 
                                                      {return <option key={x + index} value={x+1}>{x+1}</option>}
                                                )
                                            }
                                        </Form.Select>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            : null
                        }
                        <ListGroupItem className="d-grid">
                                <Button id='Add to cart' name='Add to cart' onClick={addToCartHandler} disabled={product.countInStock < 1}>Add to cart</Button>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default ProductDetails;
