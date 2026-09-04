import { createSlice } from "@reduxjs/toolkit";

const savedUser =
  JSON.parse(localStorage.getItem("currentUser")) || null;

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: savedUser,
    isLoggedIn: !!savedUser,
  },

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;

      localStorage.setItem(
        "currentUser",
        JSON.stringify(action.payload)
      );
    },

    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;

      localStorage.removeItem("currentUser");
    },

    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };

      localStorage.setItem(
        "currentUser",
        JSON.stringify(state.user)
      );
    },
  },
});

export const {
  login,
  logout,
  updateUser,
} = authSlice.actions;

export default authSlice.reducer;