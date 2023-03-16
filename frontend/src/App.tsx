import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container, CssBaseline, Typography } from '@mui/material';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import Login from './features/users/Login';
import Register from './features/users/Register';
import Products from './features/products/Products';
import OneProduct from './features/products/OneProduct';
import AddProduct from './features/products/AddProduct';

const App = () => {
  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Container maxWidth="xl" sx={{paddingBottom: 5}}>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/" element={<Products/>}/>
            <Route path="/category/:id" element={<Products/>}/>
            <Route path="/products/:id" element={<OneProduct/>}/>
            <Route path="/add-product" element={<AddProduct/>}/>

            <Route path="*" element={
              (<Typography variant="h3" fontWeight="bold" textAlign="center" mt={5}>Page not found!</Typography>)
            }/>
          </Routes>
        </Container>
      </main>
    </>
  );
}
export default App;
