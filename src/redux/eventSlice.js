// redux/eventSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [
    {
      id: 1,
      title: 'POVYTA - CОЛЬНИЙ КОНЦЕРТ',
      description: 'Описание события...',
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
      description: 'Описание события...',
      date: '2024-08-02',
      time: '19:00',
      price: 350,
      image: 'event.png',
      place: 'Арт-клуб Теплий Ламповий',
      address: 'конскої залупи 13/12 а',
    },
    // другие события
  ],
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
});

export const selectEvents = (state) => state.events.events;
export default eventSlice.reducer;
