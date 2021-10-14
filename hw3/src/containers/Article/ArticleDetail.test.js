import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-17-updated";
import * as redux from "react-redux";
import router from "react-router";

import ArticleDetail from "./ArticleDetail";
import * as api from "../../backend/api";
import { tick } from "../../test-utils/mocks";

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

const article1 = {
    id: 0,
    author_id: 1,
    title: "10 React JS Articles Every Web Developer Should Read",
    content:
        "Hello Guys, React or React JS is a JavaScript front-end library from Facebook which lets you create HTML based GUI. It makes the task easier by providing a component-based architecture which was only available to languages like Java and C# before.",
};

const user1 = {
    id: 1,
    email: "swpp@snu.ac.kr",
    password: "iluvswpp",
    name: "Software Lover",
    logged_in: false,
};

const useLocationMock = jest.spyOn(router, "useLocation");
const useParamsMock = jest.spyOn(router, "useParams");
const useSelectorMock = jest.spyOn(redux, "useSelector");
const useStateMock = jest.spyOn(React, "useState");
const setArticleItemMock = jest.fn();
const setCommentItemsMock = jest.fn();
const setNewCommentMock = jest.fn();
const setCommentsUpdatedMock = jest.fn();
const readArticleMock = jest.spyOn(api, "readArticle");
const readUserMock = jest.spyOn(api, "readUser");
const queryCommentsMock = jest.spyOn(api, "queryComments");
const createCommentMock = jest.spyOn(api, "createComment");
const deleteArticleMock = jest.spyOn(api, "deleteArticle");

describe("Article Detail test", () => {
    let articleDetail;

    afterEach(() => {
        jest.resetAllMocks();
    });

    beforeEach(() => {
        useSelectorMock.mockImplementation((callback) => callback({ user: { currentUser: user1 } }));
        useLocationMock.mockReturnValue({ pathname: "/" });
        useParamsMock.mockReturnValue({ id: "0" });
        articleDetail = <ArticleDetail />;

        queryCommentsMock.mockResolvedValue({ items: comments });
        readArticleMock.mockResolvedValue({ entity: article1 });
        readUserMock.mockResolvedValue({ entity: user1 });
        deleteArticleMock.mockResolvedValue(undefined);
        createCommentMock.mockResolvedValue(undefined);
    });

    it("renders without crashing", () => {
        useStateMock
            .mockReturnValueOnce([undefined, setArticleItemMock])
            .mockReturnValueOnce([[], setCommentItemsMock])
            .mockReturnValueOnce(["", setNewCommentMock])
            .mockReturnValueOnce([false, setCommentsUpdatedMock]);

        mount(articleDetail);
    });

    // it("should call fetchComments and setCommentsUpdated", () => {
    //     const stubInitialState = true;
    //     jest.spyOn(React, "useState").mockImplementationOnce(() => React.useState(stubInitialState));
    //     mount(articleDetail);
    //     expect(queryComments).toHaveBeenCalled();
    //     expect(readUser).toHaveBeenCalled();
    // });

    it("should onCommentConfirm works well", () => {
        useStateMock
            .mockReturnValueOnce([article1, setArticleItemMock])
            .mockReturnValueOnce([comments, setCommentItemsMock])
            .mockReturnValueOnce(["new comment", setNewCommentMock])
            .mockReturnValueOnce([false, setCommentsUpdatedMock]);

        const component = shallow(articleDetail);
        const confirmButton = component.find("#confirm-create-comment-button");
        confirmButton.simulate("click");
    });

    it("should go back on click back button", () => {
        useStateMock
            .mockReturnValueOnce([undefined, setArticleItemMock])
            .mockReturnValueOnce([[], setCommentItemsMock])
            .mockReturnValueOnce(["new comment", setNewCommentMock])
            .mockReturnValueOnce([false, setCommentsUpdatedMock]);

        const component = shallow(articleDetail);
        const backButton = component.find("#back-detail-article-button");
        backButton.simulate("click");
    });

    it("should change state properly on new comment change", () => {
        useStateMock
            .mockReturnValueOnce([undefined, setArticleItemMock])
            .mockReturnValueOnce([[], setCommentItemsMock])
            .mockReturnValueOnce(["new comment", setNewCommentMock])
            .mockReturnValueOnce([false, setCommentsUpdatedMock]);

        const component = shallow(articleDetail);
        const commentInput = component.find("#new-comment-content-input");
        commentInput.simulate("change", { target: { value: "new comment" } });
    });

    it("should push url on click edit button", () => {
        useStateMock
            .mockReturnValueOnce([article1, setArticleItemMock])
            .mockReturnValueOnce([[], setCommentItemsMock])
            .mockReturnValueOnce(["new comment", setNewCommentMock])
            .mockReturnValueOnce([false, setCommentsUpdatedMock]);

        const component = mount(articleDetail);
        const editButton = component.find("#edit-article-button");
        editButton.simulate("click");
    });

    it("should delete article on click delete button", async () => {
        useStateMock
            .mockReturnValueOnce([article1, setArticleItemMock])
            .mockReturnValueOnce([[], setCommentItemsMock])
            .mockReturnValueOnce(["", setNewCommentMock])
            .mockReturnValueOnce([false, setCommentsUpdatedMock]);

        const component = mount(articleDetail);
        await tick();
        const deleteButton = component.find("#delete-article-button");
        deleteButton.simulate("click");
    });

    it("should delete article on click delete button", async () => {
        useStateMock
            .mockReturnValueOnce([article1, setArticleItemMock])
            .mockReturnValueOnce([comments, setCommentItemsMock])
            .mockReturnValueOnce(["", setNewCommentMock])
            .mockReturnValueOnce([true, setCommentsUpdatedMock]);

        const component = shallow(articleDetail);
        const confirmButton = component.find("#confirm-create-comment-button");
        confirmButton.simulate("click");
    });

    it("should delete article on click delete button", async () => {
        useStateMock
            .mockReturnValueOnce([article1, setArticleItemMock])
            .mockReturnValueOnce([comments, setCommentItemsMock])
            .mockReturnValueOnce(["", setNewCommentMock])
            .mockReturnValueOnce([true, setCommentsUpdatedMock]);

        mount(articleDetail);
    });
});
