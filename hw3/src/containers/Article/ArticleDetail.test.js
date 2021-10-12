import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-17-updated";
import * as redux from "react-redux";
import router from "react-router";
import { createComment, deleteArticle, queryComments, readUser } from "../../backend/api";

import ArticleDetail from "./ArticleDetail";

Enzyme.configure({
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true,
});

const mockPush = jest.fn();

jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useHistory: () => ({ push: mockPush }),
}));

const comments = [
    {
        id: 1,
        article_id: 0,
        author_id: 2,
        content: "What do you mean wow?",
    },
    {
        id: 2,
        article_id: 0,
        author_id: 3,
        content: "I was surprised",
    },
    {
        id: 4,
        article_id: 11,
        author_id: 3,
        content: "I agree with you",
    },
];

const user1 = {
    id: 1,
    email: "swpp@snu.ac.kr",
    password: "iluvswpp",
    name: "Software Lover",
    logged_in: false,
};

jest.mock("../../backend/api", () => ({
    __esModule: true,
    deleteArticle: jest.fn(),
    queryComments: jest.fn().mockResolvedValue({ items: comments }),
    readUser: jest.fn(),
    createComment: jest.fn(),
}));

const useLocationMock = jest.spyOn(router, "useLocation");
const useParamsMock = jest.spyOn(router, "useParams");
const useSelectorMock = jest.spyOn(redux, "useSelector");

describe("Article Detail test", () => {
    let articleDetail;

    beforeEach(() => {
        useSelectorMock.mockReturnValue({ isLoggedIn: false, autoLoggedIn: false });
        useLocationMock.mockReturnValue({ pathname: "/" });
        useParamsMock.mockReturnValue({ id: "1" });
        queryComments.mockResolvedValue({ items: comments });
        articleDetail = <ArticleDetail />;
    });

    it("renders without crashing", () => {
        const component = mount(articleDetail);
        expect(component.find("#article-detail-page").length).toBe(1);
    });

    it("should call fetchComments and setCommentsUpdated", () => {
        const stubInitialState = true;
        jest.spyOn(React, "useState").mockImplementationOnce(() => React.useState(stubInitialState));
        mount(articleDetail);
        expect(queryComments).toHaveBeenCalled();
        expect(readUser).toHaveBeenCalled();
    });

    it("should delete article and render to article list", () => {
        const component = shallow(articleDetail);
        const deleteButton = component.find("#delete-article-button");
        deleteButton.simulate("click");

        expect(deleteArticle).toHaveBeenCalled();
        expect(mockPush).not.toHaveBeenCalled();
    });

    it("should onCommentConfirm works well", () => {
        const component = shallow(articleDetail);
        const confirmButton = component.find("#confirm-create-comment-button");
        confirmButton.simulate("click");

        expect(createComment).toHaveBeenCalled();
    });

    // it("logout button rendered when logged in", () => {
    //     useSelectorMock.mockReturnValue({ isLoggedIn: true, autoLoggedIn: false });
    //     const component = shallow(app);
    //     let logoutButton = component.find("#logout-button");
    //     expect(logoutButton.length).toBe(1);
    // });

    // it("logout button not rendered when not logged in", () => {
    //     useSelectorMock.mockReturnValue({ isLoggedIn: false, autoLoggedIn: false });
    //     const component = shallow(app);
    //     let logoutButton = component.find("#logout-button");
    //     expect(logoutButton.length).toBe(0);
    // });

    // it("redirects to login page when tried auto login and failed", () => {
    //     useSelectorMock.mockReturnValue({ isLoggedIn: false, autoLoggedIn: true });
    //     mount(app);
    //     expect(mockPush).toHaveBeenCalledWith("/login");
    // });

    // it("try auto login on mount", () => {
    //     mount(app);
    //     expect(mockDispatch).toHaveBeenCalled();
    // });

    // it("logout when logout button clicked", () => {
    //     useSelectorMock.mockReturnValue({ isLoggedIn: true, autoLoggedIn: true });
    //     const component = shallow(app);
    //     let logoutButton = component.find("#logout-button");
    //     logoutButton.simulate("click");
    //     expect(mockDispatch).toHaveBeenCalled();
    // });
});
