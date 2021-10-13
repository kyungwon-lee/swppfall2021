import axios from "axios";
import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-17-updated";

import * as api from "./api";

Enzyme.configure({
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true,
});
const users = [
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

const articleCreatePayload = {
    author_id: 1,
    title: "10 React JS Articles Every Web Developer Should Read",
    content:
        "Hello Guys, React or React JS is a JavaScript front-end library from Facebook which lets you create HTML based GUI. It makes the task easier by providing a component-based architecture which was only available to languages like Java and C# before.",
};

const getMock = jest.spyOn(axios, "get");
const postMock = jest.spyOn(axios, "post");
const putMock = jest.spyOn(axios, "put");
const deleteMock = jest.spyOn(axios, "delete");

describe("user actions test", () => {
    it("create API on success", async () => {
        postMock.mockResolvedValue({ data: { id: 0 } });
        const createArticle = api.produceCreateAPI("/articles");
        await createArticle({ createPayload: articleCreatePayload });
        expect(postMock).toHaveBeenCalled();
    });

    it("create API on error", async () => {
        const error = new Error();
        postMock.mockRejectedValue(error);
        const createArticle = api.produceCreateAPI("/articles");
        try {
            await createArticle({ createPayload: articleCreatePayload });
        } catch (e) {
            expect(e).toBe(error);
        }
        expect(postMock).toHaveBeenCalled();
    });

    it("query API on success", async () => {
        getMock.mockResolvedValue({ data: users });
        const queryUser = api.produceQueryAPI("/user");
        await queryUser();
        expect(getMock).toHaveBeenCalled();
    });

    it("query API on error", async () => {
        const error = new Error();
        getMock.mockRejectedValue(error);
        const queryUser = api.produceQueryAPI("/user");
        try {
            await queryUser();
        } catch (e) {
            expect(e).toBe(error);
        }
        expect(getMock).toHaveBeenCalled();
    });

    it("read API on success", async () => {
        getMock.mockResolvedValue({ data: users[0] });
        const readUser = api.produceReadAPI("/user");
        await readUser({ id: 0 });
        expect(getMock).toHaveBeenCalled();
    });

    it("read API on error", async () => {
        const error = new Error();
        getMock.mockRejectedValue(error);
        const readUser = api.produceReadAPI("/user");
        try {
            await readUser({ id: 0 });
        } catch (e) {
            expect(e).toBe(error);
        }
        expect(getMock).toHaveBeenCalled();
    });

    it("update API on success", async () => {
        const updateUser = api.produceUpdateAPI("/user");
        await updateUser({ id: 0, updatePayload: users[0] });
        expect(putMock).toHaveBeenCalled();
    });

    it("update API on error", async () => {
        const error = new Error();
        putMock.mockRejectedValue(error);
        const updateUser = api.produceUpdateAPI("/user");
        try {
            await updateUser({ id: 0, updatePayload: users[0] });
        } catch (e) {
            expect(e).toBe(error);
        }
        expect(putMock).toHaveBeenCalled();
    });

    it("delete API on success", async () => {
        const deleteUser = api.produceDeleteAPI("/user");
        await deleteUser({ id: 0 });
        expect(deleteMock).toHaveBeenCalled();
    });

    it("delete API on error", async () => {
        const error = new Error();
        deleteMock.mockRejectedValue(error);
        const deleteUser = api.produceDeleteAPI("/user");
        try {
            await deleteUser({ id: 0 });
        } catch (e) {
            expect(e).toBe(error);
        }
        expect(deleteMock).toHaveBeenCalled();
    });
});
