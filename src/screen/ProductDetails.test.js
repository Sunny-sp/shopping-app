import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ProductDetails from './ProductDetails';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productDetailReducer } from '../redux/productReducer';
import store from '../redux/store';
import { listProductDetails } from '../redux/actions/productActions';
import thunk from 'redux-thunk';
import { applyMiddleware } from '@reduxjs/toolkit';
import axios from 'axios';

const initialDetailState = {
  isLoading: false,
  product: {},
  errMess: ''
}

const productDetails = {
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
};

const reducers = combineReducers({
  productDetails: productDetailReducer
});
// mocked store
let mockStore = configureStore(
  { reducer: reducers },
  initialDetailState,
  applyMiddleware([thunk])
);

// axios response
const response = {
  data: productDetails
}
// mocking axios to dispatch an action and get mocked product details
jest.mock("axios");

describe('validating ProductDetails component', () => {
  it('should validate all elemets from productDetails page', async () => {
    await axios.get.mockImplementation(() => Promise.resolve(response));
    await store.dispatch(listProductDetails('456756856786'));
    // pushing initial pathname
    window.history.pushState({}, '', '/product/456756856786')
    render(
      <Provider store={store} >
        <BrowserRouter>
          <ProductDetails />
        </BrowserRouter >
      </Provider >
    );
    // console.log(screen.debug());
    expect(await screen.findByRole('heading', { name: 'component' })).toBeInTheDocument();
    const button = screen.getByRole('button', { name: 'Add to cart' })
    expect(button).toBeInTheDocument();

    expect(screen.getByRole('link')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Go Back' })).toBeInTheDocument();

    expect(screen.getByRole('img')).toBeInTheDocument();

    expect(screen.getByText('Status', { exact: false })).toBeInTheDocument();
    // validating current pathname
    await waitFor(() => {
      expect(window.location.pathname).toBe('/product/456756856786');
    });
  });

  it('should validate back button is working', async () => {
    window.history.pushState({}, '', '/product/456756856786')
    render(
      <Provider store={store} >
        <BrowserRouter>
          <ProductDetails />
        </BrowserRouter >
      </Provider >
    );
    // console.log(screen.debug());
    const backButton = screen.getByRole('button', { name: /go back/i })
    fireEvent.click(backButton);
    // validating  pathname after clicking on back button
    await waitFor(() => {
      expect(window.location.pathname).toBe('/home');
    });
  });

  it('should validate add to cart button is working', async () => {
    window.history.pushState({}, '', '/product/456756856786')
    render(
      <BrowserRouter>
        <Provider store={store} >
          <ProductDetails />
        </Provider >
      </BrowserRouter >
    );
    // const dropDown = await screen.findByRole('combobox', { name: 'select'});
    // fireEvent.click(dropDown);
    // const option = await screen.findByRole('option', { name: 5});
    // // fireEvent.change(screen.getByLabelText('select', { target :{value : '4'}}));
    // fireEvent.click(option);
    // const currentValue =  screen.getByTestId('items-qty')
    // await waitFor(() => {
    //   expect(currentValue).toHaveAttribute('aria-valuenow','4');
    // });
    const addButton = screen.getByRole('button', { name: /Add to cart/i })
    fireEvent.click(addButton);
    // validating  pathname after clicking on add to cart button
    await waitFor(() => {
      expect(window.location.pathname).toContain('/cart/456756856786');
    });
  });

});
