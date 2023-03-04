import {Category, Product} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchCategories, fetchProducts, fetchProductsByCategory} from "./productsThunks";
import {RootState} from "../../app/store";

export interface ProductsState{
  items: Product[];
  categories: Category[],
  productsFetchLoading: boolean;
}

const initialState: ProductsState = {
  items: [],
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
  }
});

export const productsReducer = productsSlice.reducer;

export const selectProducts = (state: RootState) => state.products.items;
export const selectCategories = (state: RootState) => state.products.categories;
export const selectProductsFetchLoading = (state: RootState) => state.products.productsFetchLoading;
