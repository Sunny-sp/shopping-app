import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ProductDetails from './ProductDetails';
import { Provider } from 'react-redux';
import { Router, BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import * as redux from 'react-redux';
import * as routerDom from 'react-router-dom';
import { productDetailReducer } from '../redux/productReducer';
import store from '../redux/store';
import CartScreen from './CartScreen';
import {createMemoryHistory} from 'history'
let mock;

const initialDetailState = {
  isLoading: false,
  product: {},
  errMess: ''
}

const productDetails = {
  isLoading: false,
  product: {
    "id": "456756856786",
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

jest.mock("react-redux", () => (
  {
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: jest.fn()
  }
));
// jest.mock("react-router-dom", () => (
//   {
//     ...jest.requireActual('react-router-dom'),
//     useParams: jest.fn()
//   }
// ));
// jest.mock('react-redux');

describe('validating ProductDetails component', () => {
  // let tempSelector;
  // beforeAll(() => {
  //   tempSelector = jest.spyOn(redux, 'useSelector');
  // });
  beforeEach(() => {
    // jest.spyOn(routerDom, 'useParams')
    // .mockReturnValueOnce('456756856786');
    // window.history.pushState({}, '', '/product/456756856786')
    jest.spyOn(redux, 'useSelector')
    .mockReturnValueOnce(productDetails);
  });

  // beforeEach(() => {
  //   tempSelector.mockReturnValueOnce(productDetails);

  //   jest.spyOn(routerDom, 'useParams')
  //   .mockReturnValueOnce('456756856786');
  // });

  // it('should validate all elemets from productDetails page', async () => {
  //   window.history.pushState({}, '', '/product/456756856786')

  //   render(
  //     <BrowserRouter>
  //       <Provider store={mockStore}>
  //         <Routes>
  //           <Route path='/product/:id' element={<ProductDetails />} />
  //         </Routes>
  //         // <ProductDetails />
  //       </Provider>
  //     </BrowserRouter>
  //   );

  //   expect(await screen.findByRole('heading', { name: 'Component' })).toBeInTheDocument();
  //   const button = screen.getByRole('button', { name: 'Add to cart' })
  //   expect(button).toBeInTheDocument();

  //   expect(screen.getByRole('link')).toBeInTheDocument();

  //   expect(screen.getByRole('button', { name: 'Go Back' })).toBeInTheDocument();

  //   expect(screen.getByRole('img')).toBeInTheDocument();

  //   expect(screen.getByText('Status', { exact: false })).toBeInTheDocument();

  //   await waitFor(() => {
  //     expect(window.location.pathname).toBe('/product/456756856786');
  //   });
  // });
  // it('should validate back button is working', async () => {
  //   window.history.pushState({}, '', '/product/456756856786')
  //   const { debug } = render(
  //     <BrowserRouter>
  //       <Provider store={mockStore}>
  //         <Routes>
  //           <Route path='/product/:id' element={<ProductDetails />} />
  //         </Routes>
  //        // <ProductDetails />
  //       </Provider>
  //     </BrowserRouter>
  //   );
  //   console.log(debug());
  //   const backButton = screen.getByRole('button', { name: /go back/i })
  //   fireEvent.click(backButton);
  //   console.log(debug());
  //   await waitFor(() => {
  //     expect(window.location.pathname).toBe('/home');
  //   });
  // });
  it('should validate add to cart button is working', async () => {
    try {
      // const history = createMemoryHistory({initialEntries: ["/product/"]});
      // jest.restoreAllMocks();
      // jest.clearAllMocks();
      // jest.deepUnmock();
      const { debug } = render(
        <BrowserRouter>
          <Provider store={store}>
            <ProductDetails />
          </Provider>
        </BrowserRouter>
      );
      console.log(debug());
      const addButton = screen.getByRole('button', { name: /Add to cart/i })
      fireEvent.click(addButton);
      // await waitFor(() => {
      //   expect(window.location.pathname).toContain('/cart');
      // });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  });
});
