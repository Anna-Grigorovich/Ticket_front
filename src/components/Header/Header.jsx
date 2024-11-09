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
        <ListItem button component={NavLink} to="/">
          <ListItemText primary="Головна" />
        </ListItem>
        <ListItem button component={NavLink} to="/events">
          <ListItemText primary="Події" />
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
              <Button
                component={NavLink}
                to="/"
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
                Головна
              </Button>
              <Button
                component={NavLink}
                to="/events"
                sx={{
                  color: 'black',
                  textDecoration: 'none',
                  '&.active': {
                    textDecoration: 'underline',
                    color: '#ffffff',
                  },
                }}
              >
                Події
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

// export const Header = () => {
//   return (
//     <AppBar
//       position="static"
//       sx={{ backgroundColor: 'inherit', color: 'black', boxShadow: 'none' }}
//       className={c.header}
//     >
//       <Toolbar className={c.headerWrap}>
//         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//           Tickets
//         </Typography>
//         <Box sx={{ display: 'flex' }}>
//           <Button
//             component={NavLink}
//             to="/"
//             sx={{
//               color: 'black',
//               textDecoration: 'none',
//               marginRight: 2,
//               '&.active': {
//                 textDecoration: 'underline',
//                 color: '#ffffff',
//               },
//             }}
//             exact
//           >
//             Головна
//           </Button>
//           <Button
//             component={NavLink}
//             to="/events"
//             sx={{
//               color: 'black',
//               textDecoration: 'none',
//               '&.active': {
//                 textDecoration: 'underline',
//                 color: '#ffffff',
//               },
//             }}
//           >
//             Події
//           </Button>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };
