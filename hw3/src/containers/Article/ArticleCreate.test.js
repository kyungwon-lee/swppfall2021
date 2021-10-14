import React from "react";
import Enzyme, { mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-17-updated";
import * as redux from "react-redux";
import * as api from "../../backend/api";
import ArticleCreate from "./ArticleCreate";

Enzyme.configure({
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: false,
});

const currentUser = {
    id: 1,
    email: "swpp@snu.ac.kr",
    password: "iluvswpp",
    name: "Software Lover",
    logged_in: true,
};

jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useHistory: () => ({ push: mockPush }),
}));

const useSelectorMock = jest.spyOn(redux, "useSelector");
const useStateMock = jest.spyOn(React, "useState");
const createArticleMock = jest.spyOn(api, "createArticle");
const setTitleMock = jest.fn();
const setContentMock = jest.fn();
const mockPush = jest.fn();

describe("App test", () => {
    let articleCreate;

    beforeEach(() => {
        useSelectorMock.mockImplementation((callback) => callback({ user: { currentUser } }));
        createArticleMock.mockResolvedValue({ entityId: 1 });
        articleCreate = <ArticleCreate />;
    });

    it("renders without crashing", () => {
        useStateMock.mockReturnValueOnce(["title", setTitleMock]).mockReturnValueOnce(["content", setContentMock]);
        const component = mount(articleCreate);
        expect(component.find("#article-create").length).toBe(1);
    });

    it("renders without crashing", () => {
        useStateMock.mockReturnValueOnce(["title", setTitleMock]).mockReturnValueOnce(["content", setContentMock]);
        const component = mount(articleCreate);
        const confirmButton = component.find("#fake-button");
        confirmButton.simulate("click");
    });

    it("renders without crashing", () => {
        useStateMock.mockReturnValueOnce([undefined, setTitleMock]).mockReturnValueOnce([undefined, setContentMock]);
        const component = mount(articleCreate);
        const confirmButton = component.find("#fake-button");
        confirmButton.simulate("click");
    });
});
