import { configureStore } from '@reduxjs/toolkit';

import productReducer from './Reducers/ProductsSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export default store;
