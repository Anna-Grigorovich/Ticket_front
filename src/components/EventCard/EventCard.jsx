import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { Link } from 'react-router-dom';
const API_URL = process.env.REACT_APP_API_URL;

const EventCard = ({ event }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const eventDate = new Date(event.date);

  // Форматируем дату и время
  const formattedDateTime = format(eventDate, 'd MMMM yyyy, EEE. HH:mm', {
    locale: uk,
  });

  return (
    <Card
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 800,
        margin: 2,
        padding: 2,
        borderRadius: '15px',
        backgroundColor: '#FFFFFF',
        boxShadow: 'none',
        overflow: 'hidden',

        // Псевдоэлементы для вырезов по бокам
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          width: '30px', // Ширина каждого круга
          height: '30px', // Высота каждого круга
          backgroundColor: '#E5E5E5',
          borderRadius: '50%', // Радиус для круглого элемента
          zIndex: 1,
        },
        '&::before': {
          top: '58%',
          left: '-18px', // Смещение влево для левого круга
          transform: 'translateY(-50%)',
        },
        '&::after': {
          top: '58%',
          right: '-18px', // Смещение вправо для правого круга
          transform: 'translateY(-50%)',
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px dashed #E5E5E5',
          paddingBottom: '14px',
        }}
      >
        {/* Блок с изображением */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
          <CardMedia
            component="img"
            sx={{
              width: 50,
              height: 70,
              borderRadius: '8px',
              objectFit: 'cover',
            }}
            // image={`https://back.toptickets.com.ua/images/${event._id}.jpg`}
            image={`${API_URL}/images/${event._id}.jpg`}
            alt={event.title}
          />
        </Box>

        {/* Блок с датой и названием */}
        <CardContent
          sx={{
            flex: 1,
            padding: '0 !important',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {formattedDateTime}
          </Typography>
          <Typography variant="h8" color="text.primary" fontWeight="bold">
            {event.title}
          </Typography>
        </CardContent>
      </Box>

      {/* Блок с кнопкой "купити квиток" */}
      <Box sx={{ marginTop: '15px' }}>
        <Link to={`/event/${event._id}`} style={{ textDecoration: 'none' }}>
          <Button
            variant="text"
            sx={{
              fontWeight: 'bold',
              fontSize: 'large',
              color: '#007AFF',
              '&:hover': {
                color: '#005bb5',
              },
            }}
          >
            КУПИТИ
          </Button>
        </Link>
      </Box>
    </Card>
  );
};

export default EventCard;
