import Enzyme, { mount, shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-17-updated";
import * as redux from "react-redux";

import CommentsListItem from "./CommentsListItem";
import * as api from "../backend/api";
import { tick } from "../test-utils/mocks";

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

const setCommentsUpdatedMock = jest.fn();
const promptMock = jest.spyOn(window, "prompt");
const useSelectorMock = jest.spyOn(redux, "useSelector");
const deleteCommentMock = jest.spyOn(api, "deleteComment").mockImplementation(() => Promise.resolve());
const updateCommentMock = jest.spyOn(api, "updateComment").mockImplementation(() => Promise.resolve());

describe("App test", () => {
    let commentsListItem;

    beforeEach(() => {
        useSelectorMock.mockImplementation((callback) => callback({ user: { currentUser } }));
    });

    it("renders without crashing", () => {
        commentsListItem = <CommentsListItem />;
        const component = mount(commentsListItem);
        expect(component.find("#comments-list-item").length).toBe(1);
    });

    it("should edit or delete comments properly", async () => {
        commentsListItem = (
            <CommentsListItem
                id={1}
                content={"content"}
                authorId={1}
                authorName={"name"}
                articleId={0}
                setCommentsUpdated={setCommentsUpdatedMock}
            />
        );
        const component = shallow(commentsListItem);
        expect(component.find("#comments-list-item").length).toBe(1);

        updateCommentMock.mockResolvedValue(undefined);
        const editButton = component.find("#edit-comment-button");
        promptMock.mockReturnValueOnce("editted comment");
        editButton.simulate("click");
        promptMock.mockReturnValueOnce("");
        editButton.simulate("click");

        deleteCommentMock.mockResolvedValueOnce(undefined);
        const deleteButton = component.find("#delete-comment-button");
        deleteButton.simulate("click");

        await tick();

        expect(setCommentsUpdatedMock).toHaveBeenCalled();
    });
});
