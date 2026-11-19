import { createSlice } from '@reduxjs/toolkit';

// Each cart item: { name, image, cost, quantity }
const initialState = {
  items: [],
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add a plant, or bump its quantity if it is already in the cart
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existing = state.items.find((item) => item.name === name);
      if (existing) {
        existing.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    // Remove a plant type from the cart completely
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
    },

    // Set a plant's quantity (used by the + and - buttons)
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find((i) => i.name === name);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
