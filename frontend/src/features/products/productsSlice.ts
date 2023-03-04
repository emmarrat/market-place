import {Product} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchProducts} from "./productsThunks";
import {RootState} from "../../app/store";

export interface ProductsState{
  items: Product[];
  productsFetchLoading: boolean;
}

const initialState: ProductsState = {
  items: [],
  productsFetchLoading: false,
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.productsFetchLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, {payload: products}) => {
      state.productsFetchLoading = false;
      state.items = products;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.productsFetchLoading = false;
    });
  }
});

export const productsReducer = productsSlice.reducer;

export const selectProducts = (state: RootState) => state.products.items;
export const selectProductsFetchLoading = (state: RootState) => state.products.productsFetchLoading;
