import React, { useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectProductCreatingLoading, selectValidationError } from '../productsSlice';
import { selectUser } from '../../users/usersSlice';
import { Category, ProductMutation, ProductToData } from '../../../types';
import { Navigate } from 'react-router-dom';
import { Grid, InputAdornment, MenuItem, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import FileInput from '../../../components/UI/FileInput/FileInput';

interface Props {
  onSubmit: (product: ProductToData) => void;
  categories: Category[]
}

const ProductForm: React.FC<Props> = ({onSubmit, categories}) => {
  const error = useAppSelector(selectValidationError);
  const loading = useAppSelector(selectProductCreatingLoading);
  const user = useAppSelector(selectUser);
  const [state, setState] = useState<ProductMutation>({
    category: '',
    title: '',
    description: '',
    price: 0,
    image: null,
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...state,
      price: state.price.toString(),
    });
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    setState(prevState => ({
      ...prevState, [name]: files && files[0] ? files[0] : null,
    }));
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  if (!user) {
    return <Navigate to="/register"/>
  }

  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
      style={{margin: '30px'}}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            select
            label="Category"
            name="category"
            value={state.category}
            onChange={inputChangeHandler}
            required
          >
            <MenuItem value="" disabled>Please select a category</MenuItem>
            {categories.map(category => (
              <MenuItem key={category._id} value={category._id}>{category.title}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs>
          <TextField
            id="title" label="Title"
            value={state.title}
            onChange={inputChangeHandler}
            name="title"
            error={Boolean(getFieldError('title'))}
            helperText={getFieldError('title')}
            required
          />
        </Grid>
        <Grid item xs>
          <TextField
            multiline rows={3}
            label="Description"
            value={state.description}
            onChange={inputChangeHandler}
            name="description"
            autoComplete="new-description"
            error={Boolean(getFieldError('description'))}
            helperText={getFieldError('description')}
            required
          />
        </Grid>
        <Grid item xs>
          <TextField
            label="Price"
            value={state.price === 0 ? '' : state.price}
            onChange={inputChangeHandler}
            name="price"
            type="number"
            InputProps={{
              inputProps: {min: 0.01, step: 0.01},
              startAdornment: <InputAdornment position="start">USD$</InputAdornment>
            }}
            autoComplete="new-price"
            error={Boolean(getFieldError('price'))}
            helperText={getFieldError('price')}
            required
          />
        </Grid>
        <Grid item xs>
          <FileInput
            label="Image"
            onChange={fileInputChangeHandler}
            name="image"
            type="image/*"
            errorCheck={getFieldError}

          />
        </Grid>
        <Grid item xs>
          <LoadingButton
            color="success"
            loading={loading}
            variant="contained"
            type="submit"
          >
            <span>Post</span>
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductForm;