import React from 'react';
import { AppBar, Grid, styled, Toolbar, Typography } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';
import UserMenu from './UserMenu';
import AnonymousMenu from './AnonymousMenu';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit'
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{mb: 5, backgroundColor: '#344955'}}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            <Link to="/" sx={{display: 'flex', alignItems: 'center'}}>Emir's market place
              <div style={{
                borderRadius: '50%',
                width: '32px', height: '32px',
                backgroundColor: '#7ba5f1',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginLeft: '10px'
              }}>
                <LocalMallRoundedIcon fontSize="medium"/>
              </div>
            </Link>
          </Typography>
          <Grid item>
            {user ? (<UserMenu user={user}/>) : (<AnonymousMenu/>)}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;