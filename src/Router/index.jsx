import { lazy, Suspense } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Provider } from 'react-redux';

import { ThemeProvider } from '@mui/material';

import MainLayout from '../Components/Layouts/MainLayout';

import store from '../Redux/store';

import mainTheme from '../Theme/MainTheme';

const Products = lazy(() => import('./../Pages/Products'));
const NewProduct = lazy(() => import('../Pages/NewProduct'));
const EditProduct = lazy(() => import('../Pages/EditProduct'));
const SearchResults = lazy(() => import('../Pages/SearchResults'));
const FavoriteProducts = lazy(() => import('../Pages/FavoriteProducts'));

const Router = () => (
  <Provider store={store}>
    <ThemeProvider theme={mainTheme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route
              index
              element={
                <Suspense fallback={<div>loading...</div>}>
                  <Products />
                </Suspense>
              }
            />
            <Route
              path='new-product'
              element={
                <Suspense fallback={<div>loading...</div>}>
                  <NewProduct />
                </Suspense>
              }
            />
            <Route
              path='edit-product/:productID'
              element={
                <Suspense fallback={<div>loading...</div>}>
                  <EditProduct />
                </Suspense>
              }
            />
            <Route
              path='search/:query'
              element={
                <Suspense fallback={<div>loading...</div>}>
                  <SearchResults />
                </Suspense>
              }
            />
            <Route
              path='favorite'
              element={
                <Suspense fallback={<div>loading...</div>}>
                  <FavoriteProducts />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);

export default Router;
