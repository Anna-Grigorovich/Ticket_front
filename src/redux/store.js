import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './eventSlice';
import purchaseReducer from './purchaseSlice';

export const store = configureStore({
  reducer: {
    events: eventReducer,
    purchase: purchaseReducer,
  },
});
