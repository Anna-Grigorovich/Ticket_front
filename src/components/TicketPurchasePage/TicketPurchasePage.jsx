import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPurchaseDetails } from '../../redux/purchaseSlice';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Button, Typography, Box, TextField, FormControl } from '@mui/material';
import axios from 'axios';

import sprite from '../../img/sprite.svg';
import { format } from 'date-fns';
import uk from 'date-fns/locale/uk';

const TicketPurchasePage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Email validation function
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      alert(
        'Час на придбання квитків закінчився. Сторінка буде перезавантажена.',
      );
      navigate('/events');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  // Format timer to display minutes and seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  // Fetch event data
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/events/${eventId}`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => console.log('Помилка отримання події:', error));
  }, [eventId]);

  if (!event) return <Typography>Завантаження події...</Typography>;

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const ticketPrice = event.prices?.[0]?.price || 0;
  const serviceFee = event.prices?.[0]?.serviceFee || 0;
  const ticketTotal = ticketPrice * quantity;
  const grandTotal = ticketTotal + serviceFee * quantity;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Only show error if field is not empty and email is invalid
    if (value && !validateEmail(value)) {
      setEmailError('Будь ласка, введіть коректний email');
    } else {
      setEmailError('');
    }
  };

  const handleConfirmPurchase = () => {
    if (!email) {
      setEmailError('Будь ласка, введіть email для доставки квитка.');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Будь ласка, введіть коректний email');
      return;
    }

    setIsSubmitting(true);

    // Создаем URL для успешного редиректа - этот URL важен для перенаправления
    const successUrl = `${window.location.origin}/success`;

    const requestData = {
      mail: email,
      eventId: event._id,
      price: ticketPrice,
      quantity: quantity,
      result_url: successUrl, // URL для перенаправления после успешной оплаты
      server_url: `${process.env.REACT_APP_API_URL}/payment-callback`, // URL для серверных уведомлений
      mode: 'redirect', // Обязательно используем режим redirect
    };

    console.log('Відправляємо запит:', requestData);

    axios
      .post(`${process.env.REACT_APP_API_URL}/order`, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Відповідь сервера:', response.data);

        // Store minimal details in Redux
        dispatch(
          setPurchaseDetails({
            email,
            orderReference: response.data._id,
          }),
        );

        // Redirect to LiqPay hosted checkout
        if (response.data.checkout_url) {
          // Проверяем, содержит ли URL параметр result_url
          const url = new URL(response.data.checkout_url);
          if (!url.searchParams.has('result_url')) {
            url.searchParams.append('result_url', successUrl);
            window.location.href = url.toString();
          } else {
            window.location.href = response.data.checkout_url;
          }
        } else if (response.data.data && response.data.signature) {
          // Если бэкенд возвращает data и signature, создаем форму вручную
          const form = document.createElement('form');
          form.method = 'POST';
          form.action = 'https://www.liqpay.ua/api/3/checkout';
          // НЕ открываем в новом окне, чтобы редирект работал
          // form.target = '_blank';

          const dataInput = document.createElement('input');
          dataInput.type = 'hidden';
          dataInput.name = 'data';
          dataInput.value = response.data.data;
          form.appendChild(dataInput);

          const signatureInput = document.createElement('input');
          signatureInput.type = 'hidden';
          signatureInput.name = 'signature';
          signatureInput.value = response.data.signature;
          form.appendChild(signatureInput);

          // Добавляем result_url явно
          const resultUrlInput = document.createElement('input');
          resultUrlInput.type = 'hidden';
          resultUrlInput.name = 'result_url';
          resultUrlInput.value = successUrl;
          form.appendChild(resultUrlInput);

          document.body.appendChild(form);
          form.submit();
          document.body.removeChild(form);
        } else {
          console.error('Не вдалося отримати посилання на оплату');
          alert('Помилка при створенні замовлення. Спробуйте ще раз.');
          setIsSubmitting(false);
        }
      })
      .catch((error) => {
        console.error('Error creating order:', error);
        if (error.response) {
          console.error('Відповідь від сервера:', error.response.data);
        }
        alert('Помилка при створенні замовлення. Спробуйте ще раз.');
        setIsSubmitting(false);
      });
  };

  const eventDate = new Date(event.date);
  const formattedDateTime = format(eventDate, 'd MMMM yyyy, EEE. HH:mm', {
    locale: uk,
  });

  return (
    <Box>
      {/* Timer */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FEF3C7',
          padding: 1,
          borderRadius: '8px',
          marginBottom: 2,
          fontWeight: 'bold',
        }}
      >
        <svg width="20" height="20" style={{ marginRight: 8 }}>
          <use href={`${sprite}#icon-clock`} />
        </svg>
        <Typography color="warning.dark">
          Час на покупку: {formatTime(timeLeft)}
        </Typography>
      </Box>

      <Typography sx={{ fontWeight: 'bold', fontSize: '24px', mb: 2 }}>
        {event.title}
      </Typography>

      {/* Информация о событии */}
      <Box
        sx={{
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          padding: 2,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          marginBottom: 2,
        }}
      >
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

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <svg width="20" height="20" style={{ marginRight: 8 }}>
            <use href={`${sprite}#icon-ticket`} />
          </svg>
          <Typography
            variant="body1"
            color="text.primary"
            sx={{ fontWeight: 'bold' }}
          >
            {ticketPrice} грн
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
        <Typography
          variant="body2"
          color="text.primary"
          sx={{ mb: 1, fontWeight: 'bold' }}
        >
          Оберіть кількість квитків
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Button
            onClick={handleDecrease}
            disabled={quantity <= 1}
            variant="outlined"
            sx={{ minWidth: '40px', height: '40px', p: 0 }}
          >
            -
          </Button>
          <Typography sx={{ mx: 2 }}>{quantity}</Typography>
          <Button
            onClick={handleIncrease}
            variant="outlined"
            sx={{ minWidth: '40px', height: '40px', p: 0 }}
          >
            +
          </Button>
        </Box>

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
            {serviceFee * quantity} грн
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
      </Box>

      {/* Блок с информацией об оплате */}
      <Typography sx={{ fontWeight: 'bold', mb: 2, fontSize: '24px' }}>
        Оплата
      </Typography>
      <Box
        sx={{
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          padding: 2,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          mb: 3,
        }}
      >
        <FormControl component="fieldset" sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <svg width="20" height="20" style={{ marginRight: 8 }}>
                <use href={`${sprite}#icon-check`} />
              </svg>
              Банківською карткою
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
              Безпека платежів гарантується банками-партнерами і системами
              VISA/MasterCard.
            </Typography>
          </Box>
        </FormControl>
      </Box>

      {/* Доставка */}
      <Typography sx={{ fontWeight: 'bold', mb: 2, fontSize: '24px' }}>
        Доставка
      </Typography>
      <Box
        sx={{
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          padding: 2,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          mb: 3,
        }}
      >
        <Typography
          variant="body1"
          color="text.primary"
          sx={{ fontWeight: 'bold', mb: 1 }}
        >
          На Email
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Введіть email"
          value={email}
          onChange={handleEmailChange}
          error={!!emailError}
          helperText={emailError}
          type="email"
          sx={{
            mt: 1,
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#007AFF',
              },
            },
          }}
          inputProps={{
            autoComplete: 'email',
          }}
        />
      </Box>

      {/* Confirm Purchase Button */}
      <Button
        onClick={handleConfirmPurchase}
        variant="contained"
        disabled={isSubmitting}
        sx={{
          width: '100%',
          backgroundColor: '#007AFF',
          color: 'white',
          fontSize: '16px',
          padding: '12px 0',
          '&:hover': { backgroundColor: '#005bb5' },
          '&.Mui-disabled': {
            backgroundColor: '#cccccc',
            color: '#666666',
          },
        }}
      >
        {isSubmitting ? 'Обробка...' : 'Перейти до оплати'}
      </Button>
    </Box>
  );
};

export default TicketPurchasePage;
