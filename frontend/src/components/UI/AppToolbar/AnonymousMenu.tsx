import React from 'react';
import { Button } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';

const AnonymousMenu = () => {
  return (
    <>
      <Button component={NavLink} to="/register" color="inherit">Sign up</Button>
      <Button component={NavLink} to="/login" color="inherit">Sign in </Button>
    </>
  );
};

export default AnonymousMenu;