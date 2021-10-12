import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../backend/entity";
import { userAutoLogin, userLogin, userLogout } from "../actions/user";

export interface UserState {
    currentUser: User | undefined;
    isLoggedIn: boolean;
    autoLoggedIn: boolean;
}

export const INIT_STATE: UserState = {
    currentUser: undefined,
    isLoggedIn: false,
    autoLoggedIn: false,
};

const reducer = createSlice({
    name: "users",
    initialState: INIT_STATE,
    reducers: {},
    extraReducers: {
        [userAutoLogin.fulfilled.type]: (state, action) => {
            const user: User | undefined = action.payload;
            if (user?.logged_in) {
                state.currentUser = action.payload;
                state.isLoggedIn = true;
            }
            state.autoLoggedIn = true;
        },
        [userLogin.fulfilled.type]: (state, action) => {
            state.currentUser = action.payload.user;
            state.isLoggedIn = action.payload.loggedIn;
        },
        [userLogout.fulfilled.type]: (state) => {
            state.currentUser = undefined;
            state.isLoggedIn = false;
        },
    },
}).reducer;

export default reducer;
