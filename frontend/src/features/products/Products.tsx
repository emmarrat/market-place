import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectProducts, selectProductsFetchLoading} from "./productsSlice";
import {fetchProducts} from "./productsThunks";
import {CircularProgress, Grid} from "@mui/material";
import ProductCard from "./components/ProductCard";

const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const fetchLoading = useAppSelector(selectProductsFetchLoading);

  useEffect( () => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Grid container alignItems="center" flexWrap="wrap" spacing={3}>
        {fetchLoading ? <CircularProgress color="inherit" sx={{mt: 5}}/> : products.map((product) => (
          <Grid item width="25%" key={product._id}>
            <ProductCard  product={product}/>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Products;