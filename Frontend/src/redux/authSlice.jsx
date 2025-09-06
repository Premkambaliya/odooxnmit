import { createSlice } from "@reduxjs/toolkit";

// Load user and cart from localStorage if exists
const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const cartFromStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userFromStorage,
    cart: cartFromStorage,
  },
  reducers: {
    // 🔹 Auth Reducers
    loginSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.cart = []; // clear cart on logout
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
    },

    // 🔹 Cart Reducers
    addToCart: (state, action) => {
      const item = action.payload;

      // check if item already exists
      const existingItem = state.cart.find((i) => i._id === item._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...item, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((i) => i._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { loginSuccess, logout, addToCart, removeFromCart, clearCart } =
  authSlice.actions;

export default authSlice.reducer;

