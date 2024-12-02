import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu'; // Иконка для бургер-меню от MUI
import c from './Header.module.css';
import sprite from '../../img/sprite.svg';

export const Header = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogoClick = () => {
    navigate('/events');
  };

  const menuItems = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem
          button
          component={NavLink}
          to="/events"
          sx={{ textDecoration: 'none', color: 'black' }}
        >
          <ListItemText primary="Події" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/about"
          sx={{ textDecoration: 'none', color: 'black' }}
        >
          <ListItemText primary="Про нас" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/offer"
          sx={{ textDecoration: 'none', color: 'black' }}
        >
          <ListItemText primary="Оферта" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/contacts"
          sx={{ textDecoration: 'none', color: 'black' }}
        >
          <ListItemText primary="Контакти" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: 'inherit', color: 'black', boxShadow: 'none' }}
      className={c.header}
    >
      <Toolbar className={c.headerWrap}>
        {isMobile ? (
          <>
            {/* Иконка для открытия дравера слева */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={isDrawerOpen}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  backgroundColor: '#f4f4f4',
                  width: 250,
                },
              }}
            >
              {menuItems}
            </Drawer>

            {/* Логотип справа */}
            <Box
              sx={{
                marginLeft: 'auto',
                cursor: 'pointer',
              }}
              onClick={handleLogoClick}
            >
              <svg width="100" height="100">
                <use href={`${sprite}#icon-logo`} />
              </svg>
            </Box>
          </>
        ) : (
          <>
            {/* Логотип слева */}
            <Box
              sx={{
                marginRight: 2,
                cursor: 'pointer',
              }}
              onClick={handleLogoClick}
            >
              <svg width="150" height="150">
                <use href={`${sprite}#icon-logo`} />
              </svg>
            </Box>

            {/* Навигационные элементы справа */}
            <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
              <Button
                component={NavLink}
                to="/events"
                sx={{
                  fontWeight: '600',
                  color: 'black',
                  textDecoration: 'none',
                }}
              >
                Події
              </Button>
              <Button
                component={NavLink}
                to="/about"
                sx={{
                  color: 'black',
                  textDecoration: 'none',
                  fontWeight: '600',
                }}
              >
                Про нас
              </Button>
              {/* <Button
                component={NavLink}
                to="/offer"
                sx={{
                  color: 'black',
                  textDecoration: 'none',
                  fontWeight: '600',
                }}
              >
                Оферта
              </Button>
              <Button
                component={NavLink}
                to="/contacts"
                sx={{
                  color: 'black',
                  textDecoration: 'none',
                  fontWeight: '600',
                }}
              >
                Контакти
              </Button> */}
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
