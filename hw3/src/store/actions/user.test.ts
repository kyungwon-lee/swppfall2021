import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-17-updated";

import store from "../store";
import { User } from "../../backend/entity";
import * as actions from "../actions/user";
import * as api from "../../backend/api";

Enzyme.configure({
    adapter: new (EnzymeAdapter as any)(),
    disableLifecycleMethods: true,
});

const users: User[] = [
    {
        id: 1,
        email: "swpp@snu.ac.kr",
        password: "iluvswpp",
        name: "Software Lover",
        logged_in: false,
    },
    {
        id: 2,
        email: "alan@turing.com",
        password: "iluvswpp",
        name: "Alan Turing",
        logged_in: false,
    },
];

const queryUserMock = jest.spyOn(api, "queryUsers");
const updateUserMock = jest.spyOn(api, "updateUser");
const alertMock = jest.spyOn(window, "alert");
const localStorageGetItemMock = jest.spyOn(window.localStorage.__proto__, "getItem");
jest.spyOn(window.localStorage.__proto__, "setItem");
jest.spyOn(window.localStorage.__proto__, "removeItem");

describe("user actions test", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        queryUserMock.mockResolvedValue({ items: users });
    });

    it("should fail login when wrong email or password", async () => {
        const loginPayload = {
            email: "test@snu.ac.kr",
            password: "1234",
        };
        await store.dispatch(actions.userLogin(loginPayload) as any);
        expect(queryUserMock).toHaveBeenCalled();
        expect(alertMock).toHaveBeenCalled();
    });

    it("should login properly when correct email and password", async () => {
        const loginPayload = {
            email: "swpp@snu.ac.kr",
            password: "iluvswpp",
        };
        await store.dispatch(actions.userLogin(loginPayload) as any);
        expect(queryUserMock).toHaveBeenCalled();
    });

    it("should not auto login when no last user in storage", async () => {
        localStorageGetItemMock.mockReturnValue(undefined);
        await store.dispatch(actions.userAutoLogin() as any);
    });

    it("should auto login properly when last user in storage", async () => {
        localStorageGetItemMock.mockReturnValue(JSON.stringify(users[0]));
        await store.dispatch(actions.userAutoLogin() as any);
    });

    it("should logout properly", async () => {
        await store.dispatch(actions.userLogout() as any);
        expect(updateUserMock).toHaveBeenCalled();
    });
});
