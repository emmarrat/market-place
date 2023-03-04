import {createAsyncThunk} from "@reduxjs/toolkit";
import {Category, Product} from "../../types";
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

