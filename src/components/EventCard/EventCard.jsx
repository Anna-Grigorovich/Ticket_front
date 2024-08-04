// import React from 'react';
// import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

// const EventCard = ({ event }) => {
//   return (
//     <Card sx={{ maxWidth: 345, margin: 2 }}>
//       <CardMedia
//         component="img"
//         height="140"
//         image={require(`../../img/${event.image}`)}
//         alt={event.title}
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           {event.title}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {event.description}
//         </Typography>
//         <Box sx={{ mt: 2 }}>
//           <Typography variant="body2" color="text.secondary">
//             Дата: {event.date}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Время: {event.time}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Цена: {event.price} грн
//           </Typography>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default EventCard;
import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
} from '@mui/material';

const EventCard = ({ event }) => {
  return (
    <Card sx={{ display: 'flex', maxWidth: 800, margin: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <CardMedia
            component="img"
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            image={require(`../../img/${event.image}`)}
            alt={event.title}
          />
        </Grid>
        <Grid item xs={8}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {event.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event.description}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Дата: {event.date}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Время: {event.time}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Цена: {event.price} грн
              </Typography>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default EventCard;
