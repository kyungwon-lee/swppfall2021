import { createSlice } from "@reduxjs/toolkit";
import { userAutoLogin, userLogin, userLogout } from "../actions/user";

const INIT_STATE = {
    currentUser: undefined,
    isLoggedIn: false,
};

export default createSlice({
    name: "users",
    initialState: INIT_STATE,
    reducers: {},
    extraReducers: {
        [userAutoLogin.fulfilled.type]: (state, action) => {
            state.currentUser = action.user;
            state.isLoggedIn = true;
        },
        [userLogin.fulfilled.type]: (state, action) => {
            state.currentUser = action.user;
            state.isLoggedIn = true;
        },
        [userLogout.fulfilled.type]: (state, action) => {
            state.currentUser = undefined;
            state.isLoggedIn = false;
        },
    },
}).reducer;
