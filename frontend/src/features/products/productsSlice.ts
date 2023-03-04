import { Category, FullProduct, Product } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories, fetchOneProduct, fetchProducts, fetchProductsByCategory } from './productsThunks';
import { RootState } from '../../app/store';

export interface ProductsState {
  items: Product[];
  oneItem: FullProduct | null;
  categories: Category[],
  productsFetchLoading: boolean;
}

const initialState: ProductsState = {
  items: [],
  oneItem: null,
  categories: [],
  productsFetchLoading: false,
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.items = [];
      state.productsFetchLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, {payload: products}) => {
      state.productsFetchLoading = false;
      state.items = products;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.productsFetchLoading = false;
    });
    builder.addCase(fetchCategories.pending, (state) => {
      state.productsFetchLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, {payload: products}) => {
      state.productsFetchLoading = false;
      state.categories = products;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.productsFetchLoading = false;
    });
    builder.addCase(fetchProductsByCategory.pending, (state) => {
      state.items = [];
      state.productsFetchLoading = true;
    });
    builder.addCase(fetchProductsByCategory.fulfilled, (state, {payload: products}) => {
      state.productsFetchLoading = false;
      state.items = products;
    });
    builder.addCase(fetchProductsByCategory.rejected, (state) => {
      state.productsFetchLoading = false;
    });
    builder.addCase(fetchOneProduct.pending, (state) => {
      state.oneItem = null;
      state.productsFetchLoading = true;
    });
    builder.addCase(fetchOneProduct.fulfilled, (state, {payload: product}) => {
      state.productsFetchLoading = false;
      state.oneItem = product;
    });
    builder.addCase(fetchOneProduct.rejected, (state) => {
      state.productsFetchLoading = false;
    });
  }
});

export const productsReducer = productsSlice.reducer;

export const selectProducts = (state: RootState) => state.products.items;
export const selectOneProduct = (state: RootState) => state.products.oneItem;
export const selectCategories = (state: RootState) => state.products.categories;
export const selectProductsFetchLoading = (state: RootState) => state.products.productsFetchLoading;
