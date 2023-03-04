import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Container, CssBaseline, Typography} from '@mui/material';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import Login from './features/users/Login';
import Register from "./features/users/Register";
import Products from "./features/products/Products";

const App = () => {
  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>} />
            <Route path="/" element={<Products/>} />
            <Route path="/category/:id" element={<Products/>}/>
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
