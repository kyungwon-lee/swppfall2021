import { createAsyncThunk } from "@reduxjs/toolkit";
import { queryUsers, updateUser } from "../../backend/api";
import { User } from "../../backend/entity";
import { ReduxState } from "../store";

enum UserActionEnum {
    AUTO_LOGIN = "AUTO_LOGIN",
    LOGIN_USER = "LOGIN_USER",
    LOGOUT_USER = "LOGOUT_USER",
}

// export const userAutoLogin = createAsyncThunk<User | undefined>(
//   UserActionEnum.AUTO_LOGIN,
//   async () => {
//     const user: User = (await readUser({ id: 1 })).entity;
//     return user;
//   }
// );

export const autoLogin = async () => {
    const lastLoggedInUserString = localStorage.getItem("lastUser");
    const lastLoggedInUser: User = lastLoggedInUserString ? JSON.parse(lastLoggedInUserString) : undefined;
    return lastLoggedInUser;
};

export const userAutoLogin = createAsyncThunk<User | undefined>(UserActionEnum.AUTO_LOGIN, autoLogin);

// export const userLogin = createAsyncThunk<User, { id: number }>(
//   UserActionEnum.LOGIN_USER,
//   async ({ id = 1 }) => {
//     const user = (await readUser({ id })).entity;
//     await updateUser({ id, updatePayload: { ...user, logged_in: true } });
//     return user;
//   }
// );

export const login = async ({ email, password }: { email: string; password: string }) => {
    const users = (await queryUsers()).items;
    const loggedInUser = users.find((user) => user.email === email && user.password === password);
    if (loggedInUser) {
        const updatedUser = { ...loggedInUser, logged_in: true };
        await updateUser({ id: loggedInUser.id, updatePayload: updatedUser });
        localStorage.setItem("lastUser", JSON.stringify(updatedUser));
    } else alert("Email or password is wrong");
    return { user: loggedInUser, loggedIn: !!loggedInUser };
};

export const userLogin = createAsyncThunk<{ user?: User; loggedIn: boolean }, { email: string; password: string }>(
    UserActionEnum.LOGIN_USER,
    login
);

// export const userLogout = createAsyncThunk<
//   void,
//   void,
//   {
//     state: ReduxState;
//   }
// >(UserActionEnum.LOGOUT_USER, async (_, { getState }) => {
//   const { currentUser } = getState().user;
//   if (currentUser)
//     await updateUser({
//       id: currentUser.id,
//       updatePayload: { ...currentUser, logged_in: false },
//     });
// });

export const logout = async (_: void, { getState }: any) => {
    const { currentUser } = getState().user;
    await updateUser({
        id: currentUser.id,
        updatePayload: { ...currentUser, logged_in: false },
    });
    localStorage.removeItem("lastUser");
};

export const userLogout = createAsyncThunk<
    void,
    void,
    {
        state: ReduxState;
    }
>(UserActionEnum.LOGOUT_USER, logout);
