import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import ProductForm from './components/ProductForm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { ProductToData } from '../../types';
import { createProduct, fetchCategories } from './productsThunks';
import { selectCategories } from './productsSlice';



const AddProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories = useAppSelector(selectCategories);

  useEffect( () => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const onFormSubmit = async (product: ProductToData) => {
    await dispatch(createProduct(product)).unwrap();
    navigate('/')
  };

  return (
    <Grid container flexDirection="column" alignItems="center">
      <Typography variant="h5" mb={3}>Post a new advertisement:</Typography>
      <Grid item xs={12} width="80%">
        <ProductForm onSubmit={onFormSubmit} categories={categories}/>
      </Grid>
    </Grid>
  );
};

export default AddProduct;