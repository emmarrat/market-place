import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {Product} from "../../../types";
import {apiURL} from "../../../constants";
import {Link as NavLink} from "react-router-dom";


interface Props {
  product: Product;
}
const ProductCard: React.FC<Props> = ({product}) => {

  return (
    <Card sx={{ maxWidth: 330 }}>
      <CardActionArea component={NavLink} to={`/products/${product._id}`}>
        <CardMedia
          component="img"
          height="330"
          image={apiURL + '/' + product.image}
          alt={product.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.price} USD $
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;