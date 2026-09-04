import { createSlice } from "@reduxjs/toolkit";

const savedOrders =
  JSON.parse(localStorage.getItem("orders")) || [];

const orderSlice = createSlice({
  name: "orders",

  initialState: {
    items: savedOrders,
  },

  reducers: {
    addOrder: (state, action) => {
      state.items.push(action.payload);

      localStorage.setItem(
        "orders",
        JSON.stringify(state.items)
      );
    },

    clearOrders: (state) => {
      state.items = [];

      localStorage.removeItem("orders");
    },
  },
});

export const {
  addOrder,
  clearOrders,
} = orderSlice.actions;

export default orderSlice.reducer;