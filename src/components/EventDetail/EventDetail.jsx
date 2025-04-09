// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Button,
//   Box,
//   useMediaQuery,
//   useTheme,
// } from '@mui/material';
// import sprite from '../../img/sprite.svg';
// import { format } from 'date-fns';
// import uk from 'date-fns/locale/uk';

// const EventDetail = () => {
//   const { id } = useParams(); // Получаем id из параметров URL
//   const [event, setEvent] = useState(null);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const API_URL = process.env.REACT_APP_API_URL;

//   useEffect(() => {
//     // Запрос на сервер для получения данных о выбранном ивенте
//     axios
//       .get(`${API_URL}/events/${id}`)
//       .then((response) => {
//         setEvent(response.data); // Сохраняем данные о ивенте в state
//       })
//       .catch((error) => console.error('Failed to fetch event:', error));
//   }, [id]); // useEffect срабатывает при изменении id в URL

//   if (!event) {
//     return <div>Loading...</div>; // Пока данные не загружены
//   }

//   if (!event) {
//     return <Typography variant="h6">Подію не знайдено</Typography>;
//   }

//   const eventDate = new Date(event.date);

//   // Форматируем дату и время
//   const formattedDateTime = format(eventDate, 'd MMMM yyyy, EEE. HH:mm', {
//     locale: uk,
//   });
//   return (
//     <Box>
//       <Card
//         sx={{
//           maxWidth: 1000,
//           margin: 'auto',
//           boxShadow: 'none',
//           display: 'flex',
//           flexWrap: isMobile ? 'no-wrap' : 'wrap',
//           backgroundColor: 'inherit',
//           flexDirection: isMobile ? 'column' : 'row',
//         }}
//       >
//         <Box sx={{ paddingTop: isMobile ? '0' : '32px' }}>
//           <CardMedia
//             component="img"
//             sx={{
//               borderRadius: '15px',
//               objectFit: 'cover',
//             }}
//             // image={`https://back.toptickets.com.ua/images/${event._id}.jpg`}
//             image={`${API_URL}/images/${event._id}.jpg`}
//             alt={event.title}
//           />
//         </Box>
//         <CardContent sx={{ flex: '1', padding: isMobile ? 2 : 4 }}>
//           <Typography
//             gutterBottom
//             variant={isMobile ? 'h5' : 'h4'}
//             component="div"
//             sx={{ fontWeight: 'bold', marginBottom: 2 }}
//           >
//             {event.title}
//           </Typography>

//           <Box
//             sx={{
//               backgroundColor: '#FFFFFF',
//               borderRadius: '8px',
//               padding: 2,
//               boxShadow: isMobile ? '0px 4px 10px rgba(0, 0, 0, 0.1)' : 'none',
//               marginBottom: isMobile ? 2 : 0,
//             }}
//           >
//             <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
//                 <svg width="20" height="20" style={{ marginRight: 8 }}>
//                   <use href={`${sprite}#icon-calendar`} />
//                 </svg>
//                 <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     sx={{ textTransform: 'lowercase' }}
//                   >
//                     {formattedDateTime}
//                   </Typography>
//                   {/* <Typography
//                     variant="body1"
//                     color="text.primary"
//                     sx={{ fontWeight: 'bold' }}
//                   >
//                     {formattedTime}
//                   </Typography> */}
//                 </Box>
//               </Box>
//             </Box>

//             <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
//                 <svg width="20" height="20" style={{ marginRight: 8 }}>
//                   <use href={`${sprite}#icon-place`} />
//                 </svg>
//                 <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//                   <Typography variant="body2" color="text.secondary">
//                     {event.place}
//                   </Typography>
//                   <Typography
//                     variant="body1"
//                     color="text.primary"
//                     sx={{ fontWeight: 'bold' }}
//                   >
//                     {event.address}
//                   </Typography>
//                 </Box>
//               </Box>
//             </Box>

//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <svg width="20" height="20" style={{ marginRight: 8 }}>
//                 <use href={`${sprite}#icon-ticket`} />
//               </svg>
//               <Typography
//                 variant="body1"
//                 color="text.primary"
//                 sx={{ fontWeight: 'bold' }}
//               >
//                 від {event.price} грн
//               </Typography>
//             </Box>
//             {/* Кнопка для настольной версии */}
//             {!isMobile && (
//               <Button
//                 component={Link}
//                 to={`/purchase/${event._id}`}
//                 variant="contained"
//                 sx={{
//                   width: '100%',
//                   marginTop: '24px',
//                   backgroundColor: '#007AFF',
//                   color: 'white',
//                   fontSize: '16px',
//                   padding: '12px 0',
//                   '&:hover': {
//                     backgroundColor: '#005bb5',
//                   },
//                 }}
//               >
//                 купити квиток
//               </Button>
//             )}
//           </Box>
//         </CardContent>
//         {/* описание */}
//         <Box sx={{ mt: 2 }}>
//           <Typography
//             variant="body1"
//             component="div"
//             dangerouslySetInnerHTML={{ __html: event.description }}
//           />
//         </Box>
//       </Card>

//       {isMobile && (
//         <Box sx={{ position: 'relative', bottom: 0, paddingBottom: '100px' }}>
//           <Button
//             component={Link}
//             to={`/purchase/${event._id}`}
//             variant="contained"
//             sx={{
//               width: 'calc(100% - 30px)',
//               margin: '0 auto',
//               backgroundColor: '#007AFF',
//               color: 'white',
//               fontSize: '16px',
//               textAlign: 'center',
//               padding: '12px 0',
//               position: 'fixed',
//               bottom: 10,
//               left: '15px',
//               zIndex: 10,
//               '&:hover': {
//                 backgroundColor: '#005bb5',
//               },
//             }}
//           >
//             купити квиток
//           </Button>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default EventDetail;
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import sprite from '../../img/sprite.svg';
import { format } from 'date-fns';
import uk from 'date-fns/locale/uk';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/events/${id}`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => console.error('Failed to fetch event:', error));
  }, [id, API_URL]);

  if (!event) {
    return <div>Loading...</div>;
  }

  const eventDate = new Date(event.date);
  const formattedDateTime = format(eventDate, 'd MMMM yyyy, EEE. HH:mm', {
    locale: uk,
  });

  // Get the lowest price from prices array if it exists
  const lowestPrice =
    event.prices && event.prices.length > 0
      ? Math.min(...event.prices.map((p) => p.price))
      : event.price; // Fallback to event.price if needed

  return (
    <Box>
      <Card
        sx={{
          maxWidth: 1000,
          margin: 'auto',
          boxShadow: 'none',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'inherit',
        }}
      >
        {/* Top section with image and info */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
          }}
        >
          <Box
            sx={{
              paddingTop: isMobile ? '0' : '32px',
              width: isMobile ? '100%' : '50%',
            }}
          >
            {/* <CardMedia
              component="img"
              sx={{
                borderRadius: '15px',
                objectFit: 'cover',
                height: isMobile ? 'auto' : '400px',
              }}
              image={`${API_URL}/images/${event._id}.jpg`}
              alt={event.title}
            /> */}
            <CardMedia
              component="img"
              sx={{
                borderRadius: '15px',
                objectFit: 'cover',
              }}
              // image={`https://back.toptickets.com.ua/images/${event._id}.jpg`}
              image={`${API_URL}/images/${event._id}.jpg`}
              alt={event.title}
            />
          </Box>
          <CardContent sx={{ flex: '1', padding: isMobile ? 2 : 4 }}>
            <Typography
              gutterBottom
              variant={isMobile ? 'h5' : 'h4'}
              component="div"
              sx={{ fontWeight: 'bold', marginBottom: 2 }}
            >
              {event.title}
            </Typography>

            <Box
              sx={{
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                padding: 2,
                boxShadow: isMobile
                  ? '0px 4px 10px rgba(0, 0, 0, 0.1)'
                  : 'none',
                marginBottom: isMobile ? 2 : 0,
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <svg width="20" height="20" style={{ marginRight: 8 }}>
                    <use href={`${sprite}#icon-calendar`} />
                  </svg>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textTransform: 'lowercase' }}
                    >
                      {formattedDateTime}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <svg width="20" height="20" style={{ marginRight: 8 }}>
                    <use href={`${sprite}#icon-place`} />
                  </svg>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body2" color="text.secondary">
                      {event.place}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      sx={{ fontWeight: 'bold' }}
                    >
                      {event.address}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <svg width="20" height="20" style={{ marginRight: 8 }}>
                  <use href={`${sprite}#icon-ticket`} />
                </svg>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ fontWeight: 'bold' }}
                >
                  від {lowestPrice} грн
                </Typography>
              </Box>

              {!isMobile && (
                <Button
                  component={Link}
                  to={`/purchase/${event._id}`}
                  variant="contained"
                  sx={{
                    width: '100%',
                    marginTop: '24px',
                    backgroundColor: '#007AFF',
                    color: 'white',
                    fontSize: '16px',
                    padding: '12px 0',
                    '&:hover': {
                      backgroundColor: '#005bb5',
                    },
                  }}
                >
                  купити квиток
                </Button>
              )}
            </Box>
          </CardContent>
        </Box>

        {/* Description section always below */}
        <Box sx={{ padding: isMobile ? 2 : 4, mt: 2 }}>
          {event.description && event.description.trim() !== '' ? (
            <Typography
              variant="body1"
              component="div"
              dangerouslySetInnerHTML={{ __html: event.description }}
            />
          ) : (
            <Typography variant="body1" color="text.secondary">
              Немає опису події
            </Typography>
          )}
        </Box>
      </Card>

      {isMobile && (
        <Box sx={{ position: 'relative', bottom: 0, paddingBottom: '100px' }}>
          <Button
            component={Link}
            to={`/purchase/${event._id}`}
            variant="contained"
            sx={{
              width: 'calc(100% - 30px)',
              margin: '0 auto',
              backgroundColor: '#007AFF',
              color: 'white',
              fontSize: '16px',
              textAlign: 'center',
              padding: '12px 0',
              position: 'fixed',
              bottom: 10,
              left: '15px',
              zIndex: 10,
              '&:hover': {
                backgroundColor: '#005bb5',
              },
            }}
          >
            купити квиток
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default EventDetail;
