import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCategories, selectProducts, selectProductsFetchLoading } from './productsSlice';
import { fetchCategories, fetchProducts, fetchProductsByCategory } from './productsThunks';
import { CircularProgress, Grid } from '@mui/material';
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

  return (
    <>
      <Grid container justifyContent="space-between">
        <Grid item container xs={12} md={2}>
          <CategoriesList categories={categories}/>
        </Grid>
        <Grid item container alignItems="center" flexWrap="wrap" justifyContent="center" spacing={3} xs={12} md={10}>
          {fetchLoading ? <CircularProgress color="inherit" sx={{mt: 5}}/> : products.map((product) => (
            <Grid item width="25%" key={product._id}>
              <ProductCard product={product}/>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Products;