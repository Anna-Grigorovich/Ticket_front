import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectPurchaseDetails } from '../../redux/purchaseSlice';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import sprite from '../../img/sprite.svg';

const CheckoutPage = () => {
  const [timeLeft, setTimeLeft] = useState(300); // 10 минут в секундах
  const [email, setEmail] = useState('');
  const { event, quantity } = useSelector(selectPurchaseDetails);
  const navigate = useNavigate();

  useEffect(() => {
    // Переход на страницу /purchase, если данные о событии не загружены
    if (!event) {
      navigate('/events');
      return;
    }

    // Таймер обратного отсчета
    if (timeLeft <= 0) {
      navigate('/events');
      return;
    }

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [event, timeLeft, navigate]);

  // Формат отображения времени
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleConfirm = () => {
    console.log('Переход на страницу оплаты с email:', email);
    navigate('/payment'); // Укажите здесь URL для страницы оплаты
  };

  if (!event) {
    return <Typography>Загрузка данных...</Typography>;
  }

  const ticketTotal = event.price * quantity;
  const serviceFee = Math.round(ticketTotal * 0.1);
  const grandTotal = ticketTotal + serviceFee;

  return (
    <Box>
      {/* Таймер */}
      <Typography variant="body2" color="error" sx={{ mb: 2 }}>
        Час на оформлення : {formatTime(timeLeft)}
      </Typography>

      <Typography sx={{ fontWeight: 'bold', mb: 2, fontSize: '24px' }}>
        Доставка
      </Typography>

      {/* Блок с email */}
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
          sx={{
            fontWeight: 'bold',
            mb: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <svg width="20" height="20" style={{ marginRight: 8 }}>
            <use href={`${sprite}#icon-check`} />
          </svg>{' '}
          На Email
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Введите email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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
        <Typography
          variant="body1"
          color="text.primary"
          sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
        >
          <svg width="20" height="20" style={{ marginRight: 8 }}>
            <use href={`${sprite}#icon-check`} />
          </svg>
          Банківською карткою
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, paddingLeft: '28px' }}
        >
          Безпека платежів гарантується банками-партнерами і системами
          VISA/MasterCard.
        </Typography>
      </Box>

      {/* Блок с общей суммой */}
      <Typography sx={{ fontWeight: 'bold', mb: 2, fontSize: '24px' }}>
        До сплати
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
            mt: 2,
          }}
        >
          <Typography
            variant="body1"
            color="text.primary"
            sx={{ fontWeight: 'bold' }}
          >
            Усього
          </Typography>
          <Typography
            variant="body1"
            color="text.primary"
            sx={{ fontWeight: 'bold' }}
          >
            {grandTotal} грн
          </Typography>
        </Box>
      </Box>

      {/* Кнопка оформления */}
      <Button
        onClick={handleConfirm}
        variant="contained"
        sx={{
          width: '100%',
          backgroundColor: '#007AFF',
          color: 'white',
          fontSize: '16px',
          padding: '12px 0',
          '&:hover': { backgroundColor: '#005bb5' },
        }}
      >
        Оформити
      </Button>
    </Box>
  );
};

export default CheckoutPage;
