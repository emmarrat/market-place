import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink as CategoryLink } from 'react-router-dom';
import LabelIcon from '@mui/icons-material/Label';
import { Category } from '../../../types';

interface Props {
  categories: Category[]
}

const CategoriesList: React.FC<Props> = ({categories}) => {

  return (
    <List sx={{backgroundColor: 'background.paper'}}>
      <ListItemButton component={CategoryLink} to="/" sx={{color: 'inherit'}}>
        <ListItem>
          <ListItemIcon>
            <LabelIcon/>
          </ListItemIcon>
          <ListItemText
            primary="All"
          ></ListItemText>
        </ListItem>
      </ListItemButton>
      {categories.map((category) => (
        <ListItemButton
          component={CategoryLink}
          to={`/category/${category._id}`}
          sx={{color: 'inherit'}}
          key={category._id}>
          <ListItem>
            <ListItemIcon>
              <LabelIcon/>
            </ListItemIcon>
            <ListItemText
              primary={category.title}
            ></ListItemText>
          </ListItem>
        </ListItemButton>
      ))}

    </List>
  );
};

export default CategoriesList;