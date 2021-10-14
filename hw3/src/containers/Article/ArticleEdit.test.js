import React from "react";
import Enzyme, { mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-17-updated";
import * as redux from "react-redux";
import router from "react-router";

import ArticleEdit from "./ArticleEdit";
import * as api from "../../backend/api";

Enzyme.configure({
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true,
});

const mockPush = jest.fn();

jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useHistory: () => ({ push: mockPush }),
}));

const article1 = {
    id: 0,
    author_id: 1,
    title: "title",
    content: "content",
};

const user1 = {
    id: 1,
    email: "swpp@snu.ac.kr",
    password: "iluvswpp",
    name: "Software Lover",
    logged_in: false,
};

const useParamsMock = jest.spyOn(router, "useParams");
const useSelectorMock = jest.spyOn(redux, "useSelector");
const useStateMock = jest.spyOn(React, "useState");
const setArticleMock = jest.fn();
const setTitleMock = jest.fn();
const setContentMock = jest.fn();
const readArticleMock = jest.spyOn(api, "readArticle");
const readUserMock = jest.spyOn(api, "readUser");
const updateArticleMock = jest.spyOn(api, "updateArticle");
const confirmMock = jest.spyOn(window, "confirm");

describe("Article Detail test", () => {
    let articleEdit;

    afterEach(() => {
        jest.resetAllMocks();
    });

    beforeEach(() => {
        useSelectorMock.mockImplementation((callback) => callback({ user: { currentUser: user1 } }));
        useParamsMock.mockReturnValue({ id: "1" });
        articleEdit = <ArticleEdit />;

        readArticleMock.mockResolvedValue({ entity: article1 });
        readUserMock.mockResolvedValue({ entity: user1 });
        updateArticleMock.mockResolvedValue(undefined);
    });

    it("renders without crashing", () => {
        useStateMock
            .mockReturnValueOnce([undefined, setArticleMock])
            .mockReturnValueOnce(["", setTitleMock])
            .mockReturnValueOnce(["", setContentMock]);

        mount(articleEdit);
    });

    it("renders without crashing", () => {
        useStateMock
            .mockReturnValueOnce([article1, setArticleMock])
            .mockReturnValueOnce(["", setTitleMock])
            .mockReturnValueOnce(["", setContentMock]);

        mount(articleEdit);
    });

    it("renders without crashing", () => {
        useStateMock
            .mockReturnValueOnce([article1, setArticleMock])
            .mockReturnValueOnce(["", setTitleMock])
            .mockReturnValueOnce(["", setContentMock]);

        const component = mount(articleEdit);
        const saveButton = component.find("#fake-button2");
        saveButton.simulate("click");
    });

    it("renders without crashing", () => {
        useStateMock
            .mockReturnValueOnce([article1, setArticleMock])
            .mockReturnValueOnce(["title", setTitleMock])
            .mockReturnValueOnce(["content", setContentMock]);

        const component = mount(articleEdit);
        const saveButton = component.find("#fake-button1");
        saveButton.simulate("click");
    });

    it("renders without crashing", () => {
        useStateMock
            .mockReturnValueOnce([article1, setArticleMock])
            .mockReturnValueOnce(["", setTitleMock])
            .mockReturnValueOnce(["", setContentMock]);
        confirmMock.mockReturnValue(true);

        const component = mount(articleEdit);
        const saveButton = component.find("#fake-button1");
        saveButton.simulate("click");
    });

    it("renders without crashing", () => {
        useStateMock
            .mockReturnValueOnce([article1, setArticleMock])
            .mockReturnValueOnce(["", setTitleMock])
            .mockReturnValueOnce(["", setContentMock]);
        confirmMock.mockReturnValue(false);

        const component = mount(articleEdit);
        const saveButton = component.find("#fake-button1");
        saveButton.simulate("click");
    });

    it("renders without crashing", () => {
        useStateMock
            .mockReturnValueOnce([article1, setArticleMock])
            .mockReturnValueOnce(["title", setTitleMock])
            .mockReturnValueOnce(["content", setContentMock]);

        const component = mount(articleEdit);

        const saveButton = component.find("#fake-button2");
        saveButton.simulate("click");
    });

    it("renders without crashing", () => {
        useSelectorMock.mockReturnValue({ currentUser: { ...user1, id: 2 } });
        useStateMock
            .mockReturnValueOnce([article1, setArticleMock])
            .mockReturnValueOnce(["title", setTitleMock])
            .mockReturnValueOnce(["content", setContentMock]);

        mount(articleEdit);
    });
});
