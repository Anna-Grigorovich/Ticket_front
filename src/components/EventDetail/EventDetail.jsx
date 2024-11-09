import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

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

const events = [
  {
    id: 1,
    title: 'POVYTA - CОЛЬНИЙ КОНЦЕРТ',
    description:
      ' 31/10/2024 Кавер Вечір пісень В.Стрикало live-looping by Rodin N 💃Готуйте дупці для святкування Хеловіна 💀 в компанії Rodin N! 🌪👻❤️‍🔥 Буде все як ми любимо: угар, відрив і експеременти! Цього разу в форматі вечірки! Буде багато пісень від RODIN, DJ Polly та прекрасні танцівниці! Вхід - 300 грн. в попередньому продажі 400 грн. на вході в день концерту Арт-Клуб "Теплий Ламповий"',
    date: '2024-08-01',
    time: '18:00',
    price: 300,
    image: 'event.png',
    place: 'Арт-клуб Теплий Ламповий',
    address: 'конскої залупи 13/12 а',
  },
  {
    id: 2,
    title: 'Event 2',
    description: 'Description for Event 2',
    description: `
    <p>🎶 Благодійний та затишний квартирник від молодіжного центру Київ Хаб 🎶</p>
    <p>17 листопада 2024 року запрошуємо вас на вечір теплої атмосфери, неймовірної музики та творчості!</p>
    <p>Що вас чекає:</p>
    <ul>
      <li>Живе виконання 🎙️авторських пісень від талановитих студентів КМАМ ім. Глієра, які поділяться своїми емоціями та музичними шедеврами.</li>
      <li>Виставка робіт 🖼️неймовірних художників - яскраві картини, які ви зможете не тільки оглянути, а й придбати, щоб прикрасити свій будинок.</li>
      <li>Ароматний глінтвейн🍷 - за вільний донат, щоб зігрітися в холодний вечір.</li>
      <li>Благодійний аукціон - кошти з якого будуть передані на ЗСУ.</li>
    </ul>
    <p><strong>Де:</strong> Арт-клуб «Теплий Ламповий» (м. Арсенальна, пров. Бутишів 14)</p>
    <p><strong>Коли:</strong> 17 листопада о 18:00</p>
    <p><strong>Вхід:</strong> 300 грн. (в попередньому продажі) / 400 грн. (на вході в день концерту)</p>
    <p>Не пропустіть можливість провести чудовий вечір в колі друзів, підтримати молодих талантів та зробити добру справу!</p>
  `,
    date: '2024-08-02',
    time: '19:00',
    price: 350,
    image: 'event.png',
    place: 'Арт-клуб Теплий Ламповий',
    address: 'конскої залупи 13/12 а',
  },
];

const EventDetail = () => {
  const { id } = useParams();
  const event = events.find((event) => event.id === parseInt(id));
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!event) {
    return <Typography variant="h6">Event not found</Typography>;
  }

  const eventDate = new Date(event.date);
  const formattedDay = format(eventDate, 'd MMMM yyyy', {
    locale: uk,
  }).toUpperCase();
  const formattedTime = event.time;

  return (
    <Box>
      <Card
        sx={{
          maxWidth: 1000,
          margin: 'auto',
          boxShadow: 'none',
          display: 'flex',
          flexWrap: isMobile ? 'no-wrap' : 'wrap',
          backgroundColor: 'inherit',
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        <Box sx={{ paddingTop: isMobile ? '0' : '32px' }}>
          <CardMedia
            component="img"
            sx={{
              borderRadius: '15px',
              objectFit: 'cover',
            }}
            image={require(`../../img/${event.image}`)}
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
              boxShadow: isMobile ? '0px 4px 10px rgba(0, 0, 0, 0.1)' : 'none',
              marginBottom: isMobile ? 2 : 0,
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <svg width="20" height="20" style={{ marginRight: 8 }}>
                  <use href={`${sprite}#icon-calendar`} />
                </svg>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="body2" color="text.secondary">
                    {formattedDay}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.primary"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {formattedTime}
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
                від {event.price} грн
              </Typography>
            </Box>
            {/* Кнопка для настольной версии */}
            {!isMobile && (
              <Button
                component={Link}
                to={`/purchase/${event.id}`}
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
        {/* описание */}
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="body1"
            component="div"
            dangerouslySetInnerHTML={{ __html: event.description }}
          />
        </Box>
      </Card>

      {isMobile && (
        <Box sx={{ position: 'relative', bottom: 0, paddingBottom: '100px' }}>
          <Button
            component={Link}
            to={`/purchase/${event.id}`}
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
