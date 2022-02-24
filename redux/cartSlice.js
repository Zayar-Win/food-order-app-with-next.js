import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    total: 0,
    quantity: 0,
  },
  reducers: {
    addProducts: (state, action) => {
      state.products.push(action.payload);
      state.quantity++;
      state.total +=
        action.payload.price *
        action.payload.quantity;
    },

    reset: (state) => {
      state.products = [];
      state.total = 0;
      state.quantity = 0;
    },
  },
});

export const { addProducts, reset } =
  cartSlice.actions;
export default cartSlice.reducer;
