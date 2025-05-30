// src/page/ContactsPage/ContactsPage.js
import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const ContactsPage = () => {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Контакти
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        Зв'яжіться з нами:
      </Typography>
      <Link
        href="tel:+380636037569"
        sx={{ display: 'block', color: '#4c4646', mb: 1 }}
      >
        +38 (063) 603-75-69
      </Link>
      <Link
        href="tel:+380500777644"
        sx={{ display: 'block', color: '#4c4646', mb: 1 }}
      >
        +38 (050) 077-76-44
      </Link>
      <Link
        href="mailto:support@toptickets.com"
        sx={{ display: 'block', color: '#4c4646', mb: 2 }}
      >
        support@toptickets.com
      </Link>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Ми завжди готові допомогти вам з будь-якими питаннями.
      </Typography>
    </Box>
  );
};

export default ContactsPage;
