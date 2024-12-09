import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    addToCart: (state, action) => {
      const { productId, quantity, size, name, price, imageUrl } = action.payload;
      const existingItem = state.items.find(
        item => item.productId === productId && item.size === size
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          productId,
          quantity,
          size,
          name,
          price,
          imageUrl
        });
      }
    },
    updateCartItemQuantity: (state, action) => {
      const { productId, size, quantity } = action.payload;
      const item = state.items.find(
        item => item.productId === productId && item.size === size
      );
      if (item) {
        item.quantity = quantity;
      }
    },
    removeFromCart: (state, action) => {
      const { productId, size } = action.payload;
      state.items = state.items.filter(
        item => !(item.productId === productId && item.size === size)
      );
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const {
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
