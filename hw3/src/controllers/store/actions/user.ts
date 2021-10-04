import { createAsyncThunk } from "@reduxjs/toolkit";
import { readUser, updateUser } from "../../../backend/api";
import { User } from "../../../backend/entity";
import { ReduxState } from "../store";

enum UserActionEnum {
    AUTO_LOGIN = "AUTO_LOGIN",
    LOGIN_USER = "LOGIN_USER",
    LOGOUT_USER = "LOGOUT_USER",
}

export const userAutoLogin = createAsyncThunk<User>(UserActionEnum.AUTO_LOGIN, async () => {
    const user: User = (await readUser({ id: 1 })).entity;
    return user;
});

export const userLogin = createAsyncThunk<User, { id: number }>(UserActionEnum.LOGIN_USER, async ({ id = 1 }) => {
    const user = (await readUser({ id })).entity;
    await updateUser({ id, updatePayload: { ...user, logged_in: true } });
    return user;
});

export const userLogout = createAsyncThunk<
    void,
    void,
    {
        state: ReduxState;
    }
>(UserActionEnum.LOGOUT_USER, async (_, { getState }) => {
    const { currentUser } = getState().user;
    if (currentUser) await updateUser({ id: currentUser.id, updatePayload: { ...currentUser, logged_in: false } });
});
