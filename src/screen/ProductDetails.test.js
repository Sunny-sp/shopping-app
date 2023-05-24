import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ProductDetails from './ProductDetails';
import { Provider } from 'react-redux';
import { Router, BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import * as routerDom from 'react-router-dom';
import { productDetailReducer } from '../redux/productReducer';
import store from '../redux/store';
import CartScreen from './CartScreen';
import { createMemoryHistory } from 'history'
import { renderWithProviders } from '../setupTests';
import { listProductDetails } from '../redux/actions/productActions';
import axios from 'axios';

const initialDetailState = {
  isLoading: false,
  product: {},
  errMess: ''
}

const productDetails = {
  isLoading: false,
  product: {
    "_id": "456756856786",
    "name": "Micromax IN 1b (Purple, 32 GB)",
    "image": "/images/micromaxInB.jpg",
    "description":
      "Say hello to the Micromax IN 1b smartphone whose powerful MediaTek Helio G35 gaming processor and a 5000 mAh battery will pave the way for effortless multitasking and usage.",
    "brand": "Micromax",
    "category": "Electronics",
    "price": 599.99,
    "countInStock": 7,
    "rating": 4,
    "numReviews": 8
  },
  errMess: ''
}

let mockStore = configureStore({
  reducer: {
    reducer: productDetailReducer
  }, initialDetailState
});
const response = {
  data: productDetails
}

jest.mock("axios");

describe('validating ProductDetails component', () => {
  it('should validate all elemets from productDetails page', async () => {
    // window.history.pushState({}, '', '/product/456756856786')
    // render(
    //   <BrowserRouter >
    //     <Provider store={store} >
    //       <ProductDetails />
    //     </Provider >
    //   </BrowserRouter >
    // );

    await axios.get.mockImplementation(() => Promise.resolve(response));
    await store.dispatch(listProductDetails('456756856786'));

    render(
      <BrowserRouter >
        <Provider store={store} >
          <ProductDetails />
        </Provider >
      </BrowserRouter >
    );
    const prod = store.getState().productDetails.product;
    console.log('after render' +JSON.stringify(prod));
    // renderWithProviders(<ProductDetails />, { preloadedState: productDetails, store: store });
    console.log(screen.debug());
    expect(await screen.findByRole('heading', { name: 'Component' })).toBeInTheDocument();
    const button = screen.getByRole('button', { name: 'Add to cart' })
    expect(button).toBeInTheDocument();

    expect(screen.getByRole('link')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Go Back' })).toBeInTheDocument();

    expect(screen.getByRole('img')).toBeInTheDocument();

    expect(screen.getByText('Status', { exact: false })).toBeInTheDocument();

    // await waitFor(() => {
    //   expect(window.location.pathname).toBe('/product/456756856786');
    // });

  });
});
