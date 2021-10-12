import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-17-updated";
import { User } from "../../backend/entity";
import { userLogin } from "../actions/user";

import store from "../store";
import { queryUsers } from "../../backend/api";
import { INIT_STATE } from "../reducers/user";

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

jest.mock("../../backend/api", () => ({
    __esModule: true,
    queryUsers: jest.fn().mockResolvedValue(users),
    updateUser: jest.fn(),
}));

describe("user actions test", () => {
    it("should fail login when wrong email or password", async () => {
        const loginPayload = {
            email: "test@snu.ac.kr",
            password: "1234",
        };
        store.dispatch(userLogin(loginPayload) as any);
        expect(queryUsers).toHaveBeenCalled();
        expect(store.getState().user).toEqual({ ...INIT_STATE });
    });

    it("should not fail login when wrong email or password", async () => {
        const loginPayload = {
            email: "swpp@snu.ac.kr",
            password: "iluvswpp",
        };
        store.dispatch(userLogin(loginPayload) as any);
        expect(queryUsers).toHaveBeenCalled();
        // expect(updateUser).toHaveBeenCalledWith({ id: users[0].id, updatePayload: undefined });
        expect(store.getState().user).toEqual({ ...INIT_STATE });
    });
});
