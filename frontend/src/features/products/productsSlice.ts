import { Category, FullProduct, Product, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import {
  createProduct, deleteProduct,
  fetchCategories,
  fetchOneProduct,
  fetchProducts,
  fetchProductsByCategory
} from './productsThunks';
import { RootState } from '../../app/store';

export interface ProductsState {
  items: Product[];
  oneItem: FullProduct | null;
  categories: Category[],
  productsFetchLoading: boolean;
  productCreatingLoading: boolean;
  productDeletingLoading: false | string;
  validationError: ValidationError | null;
}

const initialState: ProductsState = {
  items: [],
  oneItem: null,
  categories: [],
  productsFetchLoading: false,
  productCreatingLoading: false,
  productDeletingLoading: false,
  validationError: null,
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
    builder.addCase(createProduct.pending, (state) => {
      state.validationError = null;
      state.productCreatingLoading = true;
    });
    builder.addCase(createProduct.fulfilled, (state) => {
      state.productCreatingLoading = false;
    });
    builder.addCase(createProduct.rejected, (state, {payload: error}) => {
      state.validationError = error || null;
      state.productCreatingLoading = false;
    });
    builder.addCase(deleteProduct.pending, (state, {meta: {arg: productId}}) => {
      state.productDeletingLoading = productId;
    });
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.productDeletingLoading = false;
    });
    builder.addCase(deleteProduct.rejected, (state) => {
      state.productDeletingLoading = false;
    });
  }
});

export const productsReducer = productsSlice.reducer;

export const selectProducts = (state: RootState) => state.products.items;
export const selectOneProduct = (state: RootState) => state.products.oneItem;
export const selectCategories = (state: RootState) => state.products.categories;
export const selectProductsFetchLoading = (state: RootState) => state.products.productsFetchLoading;
export const selectProductCreatingLoading = (state: RootState) => state.products.productCreatingLoading;
export const selectProductDeletingLoading = (state: RootState) => state.products.productDeletingLoading;
export const selectValidationError = (state: RootState) => state.products.validationError;

