// redux/purchaseSlice.js
import { createSlice } from '@reduxjs/toolkit';

const purchaseSlice = createSlice({
  name: 'purchase',
  initialState: {
    event: null,
    quantity: 1,
  },
  reducers: {
    setPurchaseDetails: (state, action) => {
      state.event = action.payload.event;
      state.quantity = action.payload.quantity;
    },
    clearPurchaseDetails: (state) => {
      state.event = null;
      state.quantity = 1;
    },
  },
});

export const { setPurchaseDetails, clearPurchaseDetails } =
  purchaseSlice.actions;
export const selectPurchaseDetails = (state) => state.purchase;
export default purchaseSlice.reducer;
