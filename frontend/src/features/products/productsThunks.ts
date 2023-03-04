import {createAsyncThunk} from "@reduxjs/toolkit";
import {Product} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchAll',
  async () => {
    const response = await axiosApi.get<Product[]>('/products');
    return response.data;
  }
);