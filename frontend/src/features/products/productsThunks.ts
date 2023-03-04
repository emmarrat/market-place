import { createAsyncThunk } from '@reduxjs/toolkit';
import { Category, FullProduct, Product, ProductToData, ValidationError } from '../../types';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';
import { isAxiosError } from 'axios';

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

export const createProduct = createAsyncThunk<void, ProductToData, { rejectValue: ValidationError, state: RootState }>(
  'products/createOne',
  async (productToData, {getState, rejectWithValue}) => {
    const user = getState().users.user;

    const formData = new FormData();

    const keys = Object.keys(productToData) as (keyof ProductToData)[];

    keys.forEach(key => {
      const value = productToData[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });

    if (user) {
      try {
        await axiosApi.post('/products', formData, {headers: {'Authorization': user.token}});
      } catch (e) {
        if (isAxiosError(e) && e.response && e.response.status === 400) {
          return rejectWithValue(e.response.data as ValidationError);
        }
        throw e;
      }
    }
  }
);

export const deleteProduct = createAsyncThunk<void, string, { state: RootState }>(
  'products/delete',
  async (productId, {getState}) => {
    const user = getState().users.user;
    if (user) {
        await axiosApi.delete('/products/' + productId, {headers: {'Authorization': user.token}});
    }
  }
);

