import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-17-updated";
import * as redux from "react-redux";
import router, { BrowserRouter } from "react-router";

import ArticleEdit from "./ArticleEdit";
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
        useSelectorMock.mockReturnValue({ currentUser: user1 });
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

        const component = mount(articleEdit);
    });

    // // it("should call fetchComments and setCommentsUpdated", () => {
    // //     const stubInitialState = true;
    // //     jest.spyOn(React, "useState").mockImplementationOnce(() => React.useState(stubInitialState));
    // //     mount(articleEdit);
    // //     expect(queryComments).toHaveBeenCalled();
    // //     expect(readUser).toHaveBeenCalled();
    // // });

    // it("should onCommentConfirm works well", () => {
    //     useStateMock
    //         .mockReturnValueOnce([article1, setArticleItemMock])
    //         .mockReturnValueOnce([comments, setCommentItemsMock])
    //         .mockReturnValueOnce(["new comment", setNewCommentMock])
    //         .mockReturnValueOnce([false, setCommentsUpdatedMock]);

    //     const component = shallow(articleEdit);
    //     const confirmButton = component.find("#confirm-create-comment-button");
    //     confirmButton.simulate("click");
    // });

    // it("should go back on click back button", () => {
    //     useStateMock
    //         .mockReturnValueOnce([undefined, setArticleItemMock])
    //         .mockReturnValueOnce([[], setCommentItemsMock])
    //         .mockReturnValueOnce(["new comment", setNewCommentMock])
    //         .mockReturnValueOnce([false, setCommentsUpdatedMock]);

    //     const component = shallow(articleEdit);
    //     const backButton = component.find("#back-detail-article-button");
    //     backButton.simulate("click");
    // });

    // it("should change state properly on new comment change", () => {
    //     useStateMock
    //         .mockReturnValueOnce([undefined, setArticleItemMock])
    //         .mockReturnValueOnce([[], setCommentItemsMock])
    //         .mockReturnValueOnce(["new comment", setNewCommentMock])
    //         .mockReturnValueOnce([false, setCommentsUpdatedMock]);

    //     const component = shallow(articleEdit);
    //     const commentInput = component.find("#new-comment-content-input");
    //     commentInput.simulate("change", { target: { value: "new comment" } });
    // });

    // it("should push url on click edit button", () => {
    //     useStateMock
    //         .mockReturnValueOnce([article1, setArticleItemMock])
    //         .mockReturnValueOnce([[], setCommentItemsMock])
    //         .mockReturnValueOnce(["new comment", setNewCommentMock])
    //         .mockReturnValueOnce([false, setCommentsUpdatedMock]);

    //     const component = mount(articleEdit);
    //     const editButton = component.find("#edit-article-button");
    //     editButton.simulate("click");
    // });

    // it("should delete article on click delete button", async () => {
    //     useStateMock
    //         .mockReturnValueOnce([article1, setArticleItemMock])
    //         .mockReturnValueOnce([[], setCommentItemsMock])
    //         .mockReturnValueOnce(["", setNewCommentMock])
    //         .mockReturnValueOnce([false, setCommentsUpdatedMock]);

    //     const component = mount(articleEdit);
    //     await tick();
    //     const deleteButton = component.find("#delete-article-button");
    //     deleteButton.simulate("click");
    // });

    // it("should delete article on click delete button", async () => {
    //     useStateMock
    //         .mockReturnValueOnce([article1, setArticleItemMock])
    //         .mockReturnValueOnce([comments, setCommentItemsMock])
    //         .mockReturnValueOnce(["", setNewCommentMock])
    //         .mockReturnValueOnce([true, setCommentsUpdatedMock]);

    //     const component = shallow(articleEdit);
    //     const confirmButton = component.find("#confirm-create-comment-button");
    //     confirmButton.simulate("click");
    // });

    // it("should delete article on click delete button", async () => {
    //     useStateMock
    //         .mockReturnValueOnce([article1, setArticleItemMock])
    //         .mockReturnValueOnce([comments, setCommentItemsMock])
    //         .mockReturnValueOnce(["", setNewCommentMock])
    //         .mockReturnValueOnce([true, setCommentsUpdatedMock]);

    //     const component = mount(articleEdit);
    // });
});
