import {createAsyncThunk} from "@reduxjs/toolkit";
import {Category, FullProduct, Product} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchAll',
  async () => {
    const response = await axiosApi.get<Product[]>('/products');
    return response.data;
  }
);

export const fetchCategories = createAsyncThunk<Category[]>(
  'products/fetchCategories',
  async () => {
    const response = await axiosApi.get<Category[]>('/categories');
    return response.data;
  }
);

export const fetchProductsByCategory = createAsyncThunk<Product[], string>(
  'products/fetchByCategory',
  async (categoryId) => {

    const response = await axiosApi.get<Product[]>('/products?category=' + categoryId);
    if (response) {
      return response.data;
    }
    return [];
  }
);

export const fetchOneProduct = createAsyncThunk<FullProduct, string>(
  'products/fetchOne',
  async (productId) => {
    const response = await axiosApi.get<FullProduct>('/products/' + productId);
    return response.data;
  }
);

