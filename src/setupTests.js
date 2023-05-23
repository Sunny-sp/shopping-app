// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';


/////////////////////////////////

import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
// As a basic setup, import your same slice reducers
import productDetails from './redux/productReducer';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

export function renderWithProviders(
  ui,
  {
    initialState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: { reducer: productDetails }, initialState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (<BrowserRouter>
        <Provider store={store}>{children}</Provider>
    </BrowserRouter>
    )
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
