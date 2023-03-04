import React, {useState} from 'react';
import {User} from '../../../types';
import {Button, CircularProgress, Menu, MenuItem} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {logout} from '../../../features/users/usersThunks';
import {Link as NavLink} from "react-router-dom";
import {selectLogoutLoading} from "../../../features/users/usersSlice";


interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLogoutLoading);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
  <>
    {loading ? <CircularProgress/> : <Button
      onClick={handleClick}
      color="inherit"
    >
      Hello, {user.displayUsername}
    </Button>}
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem component={NavLink} to="/add-product">Sell new product</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  </>

  );
};

export default UserMenu;
