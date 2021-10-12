import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-17-updated";
import { User } from "../../backend/entity";
import { userAutoLogin, userLogin, userLogout } from "../actions/user";
import reducer, { INIT_STATE } from "./user";

Enzyme.configure({
    adapter: new (EnzymeAdapter as any)(),
    disableLifecycleMethods: true,
});

const user1: User = {
    id: 1,
    email: "swpp@snu.ac.kr",
    password: "iluvswpp",
    name: "Software Lover",
    logged_in: true,
};

describe("user reducer test", () => {
    it("check init state", () => {
        expect(INIT_STATE).toEqual({ autoLoggedIn: false, currentUser: undefined, isLoggedIn: false });
    });

    it("changes state when auto login success", () => {
        const loggedInUser = { ...user1, logged_in: true };
        const action = { type: userAutoLogin.fulfilled.type, payload: loggedInUser };
        const state = reducer(INIT_STATE, action);
        expect(state).toEqual({ autoLoggedIn: true, currentUser: loggedInUser, isLoggedIn: true });
    });

    it("changes state when auto login fail", () => {
        const loggedInUser = { ...user1, logged_in: false };
        const action = { type: userAutoLogin.fulfilled.type, payload: loggedInUser };
        const state = reducer(INIT_STATE, action);
        expect(state).toEqual({ ...INIT_STATE, autoLoggedIn: true });
    });

    it("changes state when user login fail", () => {
        const action = { type: userLogin.fulfilled.type, payload: { user: undefined, loggedIn: false } };
        const state = reducer(INIT_STATE, action);
        expect(state).toEqual({ ...INIT_STATE });
    });

    it("changes state when user logout", () => {
        const action = { type: userLogout.fulfilled.type };
        const state = reducer(INIT_STATE, action);
        expect(state).toEqual({ ...INIT_STATE, currentUser: undefined, isLoggedIn: false });
    });
});
