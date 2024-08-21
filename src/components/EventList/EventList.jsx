// import React from 'react';
// import { Box, List, ListItem, ListItemText } from '@mui/material';

// const events = [
//   { id: 1, title: 'Event 1', description: 'Description for Event 1' },
//   { id: 2, title: 'Event 2', description: 'Description for Event 2' },
//   { id: 3, title: 'Event 3', description: 'Description for Event 3' },
//   { id: 4, title: 'Event 4', description: 'Description for Event 4' },
// ];

// const EventList = () => {
//   return (
//     <Box sx={{ p: 2 }}>
//       <List>
//         {events.map((event) => (
//           <ListItem key={event.id}>
//             <ListItemText primary={event.title} secondary={event.description} />
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );
// };

// export default EventList;

import React from 'react';
import { Box, Grid } from '@mui/material';
import EventCard from '../EventCard/EventCard';

const events = [
  {
    id: 1,
    title: 'Event 1',
    description: 'Description for Event 1',
    // shortDescription: 'lzlzlz',
    // place: 'Tl',
    // musicStyle: ['lala', 'lala'],
    date: '2024-08-01',
    time: '18:00',
    price: 300,
    image: 'event.jpg',
  },
  {
    id: 2,
    title: 'Event 2',
    description: 'Description for Event 2',
    date: '2024-08-02',
    time: '19:00',
    price: 350,
    image: 'event.jpg',
  },
  {
    id: 3,
    title: 'Event 3',
    description: 'Description for Event 3',
    date: '2024-08-03',
    time: '20:00',
    price: 400,
    image: 'event.jpg',
  },
  {
    id: 4,
    title: 'Event 4',
    description: 'Description for Event 4',
    date: '2024-08-04',
    time: '21:00',
    price: 450,
    image: 'event.jpg',
  },
];

// const EventList = () => {
//   return (
//     <Box sx={{ p: 2 }}>
//       <Grid container spacing={2} justifyContent="center">
//         {events.map((event) => (
//           <Grid item key={event.id} xs={12}>
//             <EventCard event={event} />
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };
const EventList = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} justifyContent="center">
        {events.map((event) => (
          <Grid item key={event.id} xs={12} sm={6} md={6} lg={6}>
            <EventCard event={event} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EventList;
