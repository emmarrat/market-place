import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCategories, selectProducts, selectProductsFetchLoading } from './productsSlice';
import { fetchCategories, fetchProducts, fetchProductsByCategory } from './productsThunks';
import { CircularProgress, Grid, Typography } from '@mui/material';
import ProductCard from './components/ProductCard';
import { useParams } from 'react-router-dom';
import CategoriesList from './components/CategoriesList';


const Products = () => {
  const {id} = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const fetchLoading = useAppSelector(selectProductsFetchLoading);
  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
    if (id) {
      dispatch(fetchProductsByCategory(id))
    } else {
      dispatch(fetchProducts());
    }
  }, [dispatch, id]);

  const category = categories.find((category) => {
    return category._id === id;
  });

  let content = (
    <>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product._id}>
          <ProductCard product={product}/>
        </Grid>
      ))}
    </>
  );

  if (fetchLoading) {
    content = (<CircularProgress color="inherit" sx={{mt: 5}}/>)
  }
  if (products.length === 0) {
    content = (<Typography variant="h5" mb={4} fontWeight="bold" textAlign="center">No products</Typography>)
  }

  return (
    <>
      <Typography
        variant="h5"
        mb={4}
        fontWeight="bold"
        textAlign="center"
      >
        {category ? category.title + ':' : 'All products:'}
      </Typography>
      <Grid container justifyContent="space-between">
        <Grid item container xs={12} md={3}>
          <CategoriesList categories={categories}/>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          flexWrap="wrap"
          justifyContent="center"
          spacing={3}
          xs={12} md={9}
        >
          {content}
        </Grid>
      </Grid>
    </>
  );
};

export default Products;