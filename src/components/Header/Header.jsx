import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu'; // Иконка для бургер-меню от MUI
import c from './Header.module.css';
import sprite from '../../img/sprite.svg';

export const Header = () => {
  // Состояние для бургер-меню
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // Проверка, является ли экран мобильным
  const isMobile = useMediaQuery('(max-width:600px)');

  // Функция для переключения меню
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  // Список навигации для мобильной версии
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
            {/* Бургер-меню для мобильной версии */}
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
                  backgroundColor: '#f4f4f4', // Задаем цвет фона
                  width: 250, // Ширина дравера
                },
              }}
            >
              {menuItems}
            </Drawer>

            {/* Заголовок по центру */}
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: 'center' }}
            >
              Tickets
            </Typography>

            {/* Иконка корзинки справа */}
            {/* <IconButton edge="end" color="inherit">
              <svg width="24" height="24">
                <use href={`${sprite}#icon-shop-cart`} />
              </svg>
            </IconButton> */}
          </>
        ) : (
          <>
            {/* Для десктопной версии */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Tickets
            </Typography>
            <Box sx={{ display: 'flex' }}>
              {/* <Button
                component={NavLink}
                to="/about"
                sx={{
                  color: 'black',
                  textDecoration: 'none',
                  marginRight: 2,
                  '&.active': {
                    textDecoration: 'underline',
                    color: '#ffffff',
                  },
                }}
                exact
              >
                Про нас
              </Button> */}
              <Button
                component={NavLink}
                to="/"
                sx={{
                  fontWeight: '600',
                  color: 'black',
                  textDecoration: 'none',
                  '&.active': {
                    // textDecoration: 'underline',
                    // color: '#ffffff',
                  },
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
                  '&.active': {
                    // textDecoration: 'underline',
                    // color: '#ffffff',
                  },
                }}
              >
                Про нас
              </Button>
            </Box>
            {/* <IconButton edge="end" color="inherit">
              <svg width="24" height="24">
                <use href={`${sprite}#icon-shop-cart`} />
              </svg>
            </IconButton> */}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
