import React from "react";
import { Card, CardImg } from "react-bootstrap";
import Rating from "../components/Rating";
import { Link } from 'react-router-dom';

function Products ({product}) {
    return (
        <>
            <Card>
                <Link to={`/product/${product._id}`}>
                    <CardImg src={product.image}/>
                </Link>   
                <Card.Body>
                    <Link to={`/product/${product._id}`}>
                        <Card.Title>{product.name}</Card.Title>
                    </Link>
                    <Card.Text as="div">
                        <Rating value={product.rating} text={` from ${product.numReviews} reviews`}/>
                    </Card.Text>
                    <Card.Text as="div">
                        ${product.price}
                    </Card.Text>
                </Card.Body>
                </Card>
        </>
    );
}
export default Products;
