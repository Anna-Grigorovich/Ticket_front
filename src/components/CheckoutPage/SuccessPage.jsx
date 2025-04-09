// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { selectPurchaseDetails } from '../../redux/purchaseSlice';
// import { useNavigate } from 'react-router-dom';
// import { Box, Typography, TextField, Button } from '@mui/material';
// import sprite from '../../img/sprite.svg';

// const CheckoutPage = () => {
//   const [timeLeft, setTimeLeft] = useState(300); // 10 минут в секундах
//   const [email, setEmail] = useState('');
//   const { event, quantity } = useSelector(selectPurchaseDetails);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Переход на страницу /purchase, если данные о событии не загружены
//     if (!event) {
//       navigate('/events');
//       return;
//     }

//     // Таймер обратного отсчета
//     if (timeLeft <= 0) {
//       navigate('/events');
//       return;
//     }

//     const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
//     return () => clearInterval(timer);
//   }, [event, timeLeft, navigate]);

//   // Формат отображения времени
//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = time % 60;
//     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//   };

//   const handleConfirm = () => {
//     console.log('Переход на страницу оплаты с email:', email);
//     navigate('/payment'); // Укажите здесь URL для страницы оплаты
//   };

//   if (!event) {
//     return <Typography>Загрузка данных...</Typography>;
//   }

//   const ticketTotal = event.price * quantity;
//   const serviceFee = Math.round(ticketTotal * 0.1);
//   const grandTotal = ticketTotal + serviceFee;

//   return (
//     <Box>
//       {/* Таймер */}
//       <Typography variant="body2" color="error" sx={{ mb: 2 }}>
//         Час на оформлення : {formatTime(timeLeft)}
//       </Typography>

//       <Typography sx={{ fontWeight: 'bold', mb: 2, fontSize: '24px' }}>
//         Доставка
//       </Typography>

//       {/* Блок с email */}
//       <Box
//         sx={{
//           backgroundColor: '#FFFFFF',
//           borderRadius: '8px',
//           padding: 2,
//           boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
//           mb: 3,
//         }}
//       >
//         <Typography
//           variant="body1"
//           color="text.primary"
//           sx={{
//             fontWeight: 'bold',
//             mb: 1,
//             display: 'flex',
//             alignItems: 'center',
//           }}
//         >
//           <svg width="20" height="20" style={{ marginRight: 8 }}>
//             <use href={`${sprite}#icon-check`} />
//           </svg>{' '}
//           На Email
//         </Typography>
//         <TextField
//           fullWidth
//           variant="outlined"
//           placeholder="Введите email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </Box>

//       {/* Блок с информацией об оплате */}
//       <Typography sx={{ fontWeight: 'bold', mb: 2, fontSize: '24px' }}>
//         Оплата
//       </Typography>
//       <Box
//         sx={{
//           backgroundColor: '#FFFFFF',
//           borderRadius: '8px',
//           padding: 2,
//           boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
//           mb: 3,
//         }}
//       >
//         <Typography
//           variant="body1"
//           color="text.primary"
//           sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
//         >
//           <svg width="20" height="20" style={{ marginRight: 8 }}>
//             <use href={`${sprite}#icon-check`} />
//           </svg>
//           Банківською карткою
//         </Typography>
//         <Typography
//           variant="body2"
//           color="text.secondary"
//           sx={{ mt: 1, paddingLeft: '28px' }}
//         >
//           Безпека платежів гарантується банками-партнерами і системами
//           VISA/MasterCard.
//         </Typography>
//       </Box>

//       {/* Блок с общей суммой */}
//       <Typography sx={{ fontWeight: 'bold', mb: 2, fontSize: '24px' }}>
//         До сплати
//       </Typography>
//       <Box
//         sx={{
//           backgroundColor: '#FFFFFF',
//           borderRadius: '8px',
//           padding: 2,
//           boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
//           mb: 3,
//         }}
//       >
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//           <Typography variant="body2" color="text.secondary">
//             Квитків {quantity}x
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             {ticketTotal} грн
//           </Typography>
//         </Box>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//           <Typography variant="body2" color="text.secondary">
//             Сервісний збір
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             {serviceFee} грн
//           </Typography>
//         </Box>
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             fontWeight: 'bold',
//             mt: 2,
//           }}
//         >
//           <Typography
//             variant="body1"
//             color="text.primary"
//             sx={{ fontWeight: 'bold' }}
//           >
//             Усього
//           </Typography>
//           <Typography
//             variant="body1"
//             color="text.primary"
//             sx={{ fontWeight: 'bold' }}
//           >
//             {grandTotal} грн
//           </Typography>
//         </Box>
//       </Box>

//       {/* Кнопка оформления */}
//       <Button
//         onClick={handleConfirm}
//         variant="contained"
//         sx={{
//           width: '100%',
//           backgroundColor: '#007AFF',
//           color: 'white',
//           fontSize: '16px',
//           padding: '12px 0',
//           '&:hover': { backgroundColor: '#005bb5' },
//         }}
//       >
//         Оформити
//       </Button>
//     </Box>
//   );
// };

// export default CheckoutPage;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EventIcon from '@mui/icons-material/Event';
import EmailIcon from '@mui/icons-material/Email';

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, md: 6 } }}>
      <Paper
        elevation={3}
        sx={{
          borderRadius: '16px',
          overflow: 'hidden',
          p: { xs: 3, sm: 4 },
        }}
      >
        {/* Success Header */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <CheckCircleOutlineIcon
            sx={{
              fontSize: { xs: 80, md: 100 },
              color: '#4CAF50',
              mb: 2,
            }}
          />
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '24px', md: '32px' },
              textAlign: 'center',
            }}
          >
            Оплата успішна!
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mt: 1,
              textAlign: 'center',
              fontSize: { xs: '16px', md: '18px' },
            }}
          >
            Дякуємо за Вашу покупку!
          </Typography>
        </Box>

        {/* Email Notification */}
        <Box
          sx={{
            backgroundColor: '#F5F5F5',
            borderRadius: '12px',
            p: 3,
            mb: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <EmailIcon sx={{ color: '#007AFF', fontSize: 28 }} />
          <Typography variant="body1">
            Квитки відправлено на Вашу електронну пошту
          </Typography>
        </Box>

        {/* Action Button */}
        <Button
          variant="contained"
          startIcon={<EventIcon />}
          fullWidth
          sx={{
            py: 1.5,
            backgroundColor: '#007AFF',
            borderRadius: '8px',
            '&:hover': { backgroundColor: '#005bb5' },
          }}
          onClick={() => navigate('/events')}
        >
          Повернутися до подій
        </Button>

        {/* Support Info */}
        <Box
          sx={{
            mt: 4,
            pt: 3,
            borderTop: '1px solid #E0E0E0',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Маєте питання?
          </Typography>
          <Typography
            variant="body2"
            color="primary"
            sx={{
              cursor: 'pointer',
              fontWeight: 'medium',
              mt: 0.5,
            }}
            onClick={() => console.log('Contact support')}
          >
            Зв'яжіться з нашою службою підтримки
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default SuccessPage;
