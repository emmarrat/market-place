import React, { useEffect } from 'react';
import { CardMedia, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOneProduct, selectProductsFetchLoading } from './productsSlice';
import { fetchOneProduct } from './productsThunks';
import { useParams } from 'react-router-dom';
import { apiURL } from '../../constants';

const OneProduct = () => {
  const {id} = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectOneProduct);
  const loading = useAppSelector(selectProductsFetchLoading);

  useEffect(() => {
    dispatch(fetchOneProduct(id));
  }, [dispatch, id]);

  return (
    <Grid mt={5}>
      {loading ? <CircularProgress/> : product && (<>
        <Grid container justifyContent="space-evenly" mb={4}>
          <Grid item boxShadow="0px 0px 8px 5px #BEBEBE" padding={3} borderRadius={7} width={400}>
            <Typography variant="h5" textTransform="uppercase" mb={2}>
              {product.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="p" mb={2}>
              <b> Category: {product.category.title}</b>
            </Typography>
            <Divider/>
            <Typography variant="subtitle1" fontWeight="bold" color="text.secondary">Description:</Typography>
            <Typography variant="subtitle1" mb={3}>{product.description}</Typography>
            <Divider/>

            <Typography variant="subtitle1" color="text.secondary"><b>Price: </b>{product.price} USD $</Typography>
          </Grid>
          <Grid item mr={5}>
            <CardMedia
              component="img"
              sx={{maxWidth: 400, borderRadius: 7, boxShadow: '0px 0px 8px 5px #BEBEBE'}}
              image={apiURL + '/' + product.image}
              alt={product.title}

            />
          </Grid>
        </Grid>
        <Grid item container justifyContent="center">
          <Typography variant="subtitle1">
            To buy this product please contacts with customer: <b> {product.customer.displayUsername}</b> by
            phone: <b> {product.customer.phone}</b>
          </Typography>
        </Grid>
      </>)}
    </Grid>
  );
};

export default OneProduct;