import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Асинхронный экшен для загрузки событий
export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const response = await axios.get('http://localhost:3300/events'); // URL бэкенда
  return response.data; // Предполагается, что данные приходят в виде { total, events }
});

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [], // Массив событий
    total: 0, // Общее количество событий, если нужно
    status: 'idle', // Статус запроса: idle | loading | succeeded | failed
    error: null, // Ошибка при загрузке, если есть
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading'; // Запрос в процессе
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Запрос выполнен успешно
        state.events = action.payload.events; // Сохраняем события
        state.total = action.payload.total; // Сохраняем общее количество (если оно есть)
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed'; // Запрос завершился с ошибкой
        state.error = action.error.message; // Сохраняем сообщение об ошибке
      });
  },
});

export const selectEvents = (state) => state.events.events; // Селектор для получения событий
export const selectStatus = (state) => state.events.status; // Селектор для статуса запроса
export const selectError = (state) => state.events.error; // Селектор для ошибки

export default eventSlice.reducer;
