import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  name: null,
  uid: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.uid = action.payload.uid;
    },
    setLogout: (state) => {
      state.token = null;
      state.uid = null;
      state.name = null;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
