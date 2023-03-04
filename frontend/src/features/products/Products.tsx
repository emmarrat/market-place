import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCategories, selectProducts, selectProductsFetchLoading} from "./productsSlice";
import {fetchCategories, fetchProducts} from "./productsThunks";
import {CircularProgress, Grid, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import ProductCard from "./components/ProductCard";
import LabelIcon from '@mui/icons-material/Label';
import {Link as NavLink} from "react-router-dom";


const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const categories =useAppSelector(selectCategories);
  const fetchLoading = useAppSelector(selectProductsFetchLoading);

  useEffect( () => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <Grid container justifyContent="space-between">
        <Grid item container xs={12} md={2}>
          <List>
            <ListItem component={NavLink} to="/">
              <ListItemIcon>
                <LabelIcon />
              </ListItemIcon>
              <ListItemText
                primary="All"
              ></ListItemText>
            </ListItem>
          {categories && categories.map((category) => (
                <ListItem component={NavLink} to={`category/${category._id}`} sx={{color: 'inherit'}}>
                  <ListItemIcon>
                    <LabelIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={category.title}
                  ></ListItemText>
                </ListItem>
          ))}
          </List>
        </Grid>
      <Grid item container alignItems="center" flexWrap="wrap" spacing={3} xs={12} md={10}>
        {fetchLoading ? <CircularProgress color="inherit" sx={{mt: 5}}/> : products.map((product) => (
          <Grid item width="25%" key={product._id}>
            <ProductCard  product={product}/>
          </Grid>
        ))}
      </Grid>
      </Grid>
    </>
  );
};

export default Products;