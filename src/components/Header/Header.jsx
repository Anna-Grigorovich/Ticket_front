import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Button,
  Box,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

import c from './Header.module.css';

export const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: '#000000', color: '#ffffff' }}
      className={c.header}
    >
      <Toolbar className={c.headerWrap}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Tickets
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Button
            component={NavLink}
            to="/"
            sx={{
              color: 'white',
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
              color: 'white',
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
      </Toolbar>
    </AppBar>
  );
};

// export const Header = () => {
//   return (
//     <AppBar
//       position="static"
//       sx={{ backgroundColor: '#000000', color: '#ffffff' }}
//       className={c.header}
//     >
//       <Toolbar>
//         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//           Tickets
//         </Typography>
//         <Tabs>
//           <Tab
//             label="Головна"
//             component={NavLink}
//             to="/"
//             sx={{ color: 'white', '&.Mui-selected': { color: '#ffffff' } }}
//           />
//           <Tab
//             label="Концерти"
//             component={NavLink}
//             to="/events"
//             sx={{ color: 'white', '&.Mui-selected': { color: '#ffffff' } }}
//           />
//         </Tabs>
//       </Toolbar>
//     </AppBar>
//   );
// };
