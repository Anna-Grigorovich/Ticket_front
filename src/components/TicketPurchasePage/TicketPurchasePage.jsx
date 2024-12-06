import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPurchaseDetails } from '../../redux/purchaseSlice';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import axios from 'axios';

import sprite from '../../img/sprite.svg';
import { format } from 'date-fns';
import uk from 'date-fns/locale/uk';

const TicketPurchasePage = () => {
  const { eventId } = useParams(); // Получаем id из параметров URL
  const [event, setEvent] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate(); // инициализация
  const dispatch = useDispatch();
  useEffect(() => {
    // Запрос на сервер для получения данных о выбранном ивенте
    axios
      .get(`https://back.toptickets.com.ua/events/${eventId}`)
      .then((response) => {
        console.log(eventId);
        setEvent(response.data); // Сохраняем данные о ивенте в state
      })
      .catch((error) => console.log(eventId));
  }, [eventId]); // useEffect срабатывает при изменении id в URL

  if (!event) return <Typography>Завантаження події...</Typography>;

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const ticketTotal = event.price * quantity;
  const serviceFee = Math.round(ticketTotal * 0.1);
  const grandTotal = ticketTotal + serviceFee;

  const handleConfirmPurchase = () => {
    dispatch(
      setPurchaseDetails({
        event,
        quantity,
      }),
    );
    navigate(`/checkout/${event._id}`);
  };
  const eventDate = new Date(event.date);

  // Форматируем дату и время
  const formattedDateTime = format(eventDate, 'd MMMM yyyy, EEE. HH:mm', {
    locale: uk,
  });
  return (
    <Box>
      <Typography sx={{ fontWeight: 'bold', fontSize: '24px', mb: 2 }}>
        {event.title}
      </Typography>

      {/* infa */}
      <Box
        sx={{
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          padding: 2,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          marginBottom: 2,
        }}
      >
        {/* Location */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
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

        {/* Date and Time */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <svg width="20" height="20" style={{ marginRight: 8 }}>
            <use href={`${sprite}#icon-calendar`} />
          </svg>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textTransform: 'lowercase' }}
          >
            {formattedDateTime}
          </Typography>
        </Box>

        {/* Price */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <svg width="20" height="20" style={{ marginRight: 8 }}>
            <use href={`${sprite}#icon-ticket`} />
          </svg>
          <Typography
            variant="body1"
            color="text.primary"
            sx={{ fontWeight: 'bold' }}
          >
            {event.price} грн
          </Typography>
        </Box>
      </Box>

      {/* Ticket Quantity and Summary */}
      <Box
        sx={{
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          padding: 2,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          marginBottom: 2,
        }}
      >
        {/* Ticket Quantity Label */}
        <Typography
          variant="body2"
          color="text.primary"
          sx={{ mb: 1, fontWeight: 'bold' }}
        >
          Оберіть кількість квитків
        </Typography>

        {/* Ticket Quantity Selector */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Button onClick={handleDecrease} disabled={quantity <= 1}>
            -
          </Button>
          <Typography sx={{ mx: 2 }}>{quantity}</Typography>
          <Button onClick={handleIncrease}>+</Button>
        </Box>

        {/* Summary Details */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Квитків {quantity}x
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {ticketTotal} грн
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Сервісний збір
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {serviceFee} грн
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 'bold',
            mb: 2,
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }} color="text.primary">
            Усього
          </Typography>
          <Typography sx={{ fontWeight: 'bold' }} color="text.primary">
            {grandTotal} грн
          </Typography>
        </Box>

        {/* Confirm Purchase Button */}
        <Button
          onClick={handleConfirmPurchase}
          variant="contained"
          sx={{
            width: '100%',
            backgroundColor: '#007AFF',
            color: 'white',
            fontSize: '16px',
            padding: '12px 0',
            '&:hover': {
              backgroundColor: '#005bb5',
            },
          }}
        >
          Підтвердити
        </Button>
      </Box>
    </Box>
  );
};

export default TicketPurchasePage;
