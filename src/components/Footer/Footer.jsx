// src/components/Footer/Footer.js
import React from 'react';
import { Box, Button, Link, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Facebook, Instagram } from '@mui/icons-material';

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        p: 4,
        borderTop: '1px solid #b8b1b1',
        backgroundColor: 'inherit',
        textAlign: 'center',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      {/* Секция навигации */}
      <Box sx={{ textAlign: 'left' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
          Top Tickets
        </Typography>
        <Button
          component={NavLink}
          to="/about"
          sx={{
            color: '#4c4646',
            textDecoration: 'none',
            fontWeight: 'bold',
            marginRight: 2,
            '&.active': { textDecoration: 'underline' },
          }}
          exact
        >
          Про нас
        </Button>
        <Button
          component={NavLink}
          to="/contacts"
          sx={{
            color: '#4c4646',
            textDecoration: 'none',
            fontWeight: 'bold',
            marginRight: 2,
            '&.active': { textDecoration: 'underline' },
          }}
          exact
        >
          Контакти
        </Button>
        <Button
          component={NavLink}
          to="/offer"
          sx={{
            color: '#4c4646',
            textDecoration: 'none',
            fontWeight: 'bold',
            '&.active': { textDecoration: 'underline' },
          }}
          exact
        >
          Оферта
        </Button>
      </Box>

      {/* Секция контактов */}
      <Box sx={{ textAlign: 'center', mt: { xs: 2, sm: 0 } }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#333' }}>
          Контакти
        </Typography>
        <Link
          href="tel:+380991234567"
          sx={{ color: '#4c4646', display: 'block' }}
        >
          +38 (063) 601-57-18
        </Link>
        {/* <Link
          href="tel:+380991234567"
          sx={{ color: '#4c4646', display: 'block' }}
        >
          +38 (099) 123-45-67
        </Link> */}
        <Link
          href="mailto:support@toptickets.com"
          sx={{ color: '#4c4646', display: 'block' }}
        >
          support@toptickets.com
        </Link>
      </Box>

      {/* Социальные сети */}
      <Box sx={{ textAlign: 'right', mt: { xs: 2, sm: 0 } }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#333' }}>
          Ми у соціальних мережах
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          <Link
            href="https://www.instagram.com"
            target="_blank"
            sx={{ color: '#4c4646', mx: 1 }}
          >
            <Instagram fontSize="large" />
          </Link>
          <Link
            href="https://www.facebook.com"
            target="_blank"
            sx={{ color: '#4c4646', mx: 1 }}
          >
            <Facebook fontSize="large" />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
