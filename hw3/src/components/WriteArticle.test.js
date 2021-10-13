import React from "react";

import Enzyme, { mount, shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-17-updated";
import * as redux from "react-redux";
import router from "react-router";

import WriteArticle from "./WriteArticle";

Enzyme.configure({
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true,
});

const currentUser = {
    id: 1,
    email: "swpp@snu.ac.kr",
    password: "iluvswpp",
    name: "Software Lover",
    logged_in: true,
};

const mockPush = jest.fn();
const onTitleChangeMock = jest.fn();
const onContentChangeMock = jest.fn();
const onConfirmMock = jest.fn();
const useSelectorMock = jest.spyOn(redux, "useSelector");
const useStateMock = jest.spyOn(React, "useState");
const setCurrentTabMock = jest.fn();

describe("App test", () => {
    let writeArticle;

    // afterEach(() => {
    //     jest.resetAllMocks();
    // });

    beforeEach(() => {
        useSelectorMock.mockReturnValue({ currentUser });
        jest.spyOn(router, "useHistory").mockImplementation(() => ({ push: mockPush }));
    });

    it("renders without crashing", () => {
        writeArticle = (
            <WriteArticle
                onTitleChange={onTitleChangeMock}
                onContentChange={onContentChangeMock}
                backUrl={"url"}
                from={"from"}
                onConfirm={onConfirmMock}
            />
        );
        const component = mount(writeArticle);
        expect(component.find("#write-article").length).toBe(1);
    });

    it("switches tab properly on click tab", () => {
        writeArticle = (
            <WriteArticle
                onTitleChange={onTitleChangeMock}
                onContentChange={onContentChangeMock}
                backUrl={"url"}
                from={"from"}
                onConfirm={onConfirmMock}
            />
        );
        const component = shallow(writeArticle);
        const writeTabButton = component.find("#write-tab-button");
        writeTabButton.simulate("click");

        const previewTabButton = component.find("#preview-tab-button");
        previewTabButton.simulate("click");
    });

    it("changes states properly on title and content change", () => {
        writeArticle = (
            <WriteArticle
                onTitleChange={onTitleChangeMock}
                onContentChange={onContentChangeMock}
                backUrl={"url"}
                from={"from"}
                onConfirm={onConfirmMock}
            />
        );

        useStateMock.mockReturnValueOnce(["write", setCurrentTabMock]);

        const component = shallow(writeArticle);
        const articleTitleInput = component.find("#article-title-input");
        articleTitleInput.simulate("change", { target: { value: "new title" } });
        expect(onTitleChangeMock).toHaveBeenCalled();

        const articleContentInput = component.find("#article-content-input");
        articleContentInput.simulate("change", { target: { value: "new content" } });
        expect(onContentChangeMock).toHaveBeenCalled();
    });

    it("navigates to back page on click back button", () => {
        writeArticle = (
            <WriteArticle
                title={"title"}
                content={undefined}
                onTitleChange={onTitleChangeMock}
                onContentChange={onContentChangeMock}
                backUrl={"url"}
                from={"create"}
                onConfirm={onConfirmMock}
            />
        );

        const component = shallow(writeArticle);
        const backButton = component.find("#back-create-article-button");
        backButton.simulate("click");
        expect(mockPush).toHaveBeenCalled();
    });

    it("renders properly when from edit", () => {
        writeArticle = (
            <WriteArticle
                title={"title"}
                content={undefined}
                onTitleChange={onTitleChangeMock}
                onContentChange={onContentChangeMock}
                backUrl={"url"}
                from={"edit"}
                onConfirm={onConfirmMock}
            />
        );

        shallow(writeArticle);
    });
});
