import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../backend/entity";
import { userAutoLogin, userLogin, userLogout } from "../actions/user";

export interface UserState {
  currentUser: User | undefined;
  isLoggedIn: boolean;
}

const INIT_STATE: UserState = {
  currentUser: undefined,
  isLoggedIn: false,
};

const reducer = createSlice({
  name: "users",
  initialState: INIT_STATE,
  reducers: {},
  extraReducers: {
    [userAutoLogin.fulfilled.type]: (state, action) => {
      const user: User = action.payload;
      if (user.logged_in) {
        state.currentUser = action.payload;
        state.isLoggedIn = true;
      }
    },
    [userLogin.fulfilled.type]: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },
    [userLogout.fulfilled.type]: (state) => {
      state.currentUser = undefined;
      state.isLoggedIn = false;
    },
  },
}).reducer;

export default reducer;