import React from "react";
import Enzyme, { mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-17-updated";
import ArticlesList from "./ArticlesList";

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

const articles = [
    {
        id: 0,
        author_id: 1,
        title: "10 React JS Articles Every Web Developer Should Read",
        content:
            "Hello Guys, React or React JS is a JavaScript front-end library from Facebook which lets you create HTML based GUI. It makes the task easier by providing a component-based architecture which was only available to languages like Java and C# before.",
    },
    {
        id: 11,
        author_id: 2,
        title: "React: A JavaScript library for building user interfaces",
        content:
            "React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.",
    },
    {
        id: 12,
        author_id: 1,
        title: "Building the New facebook.com with React, GraphQL and Relay",
        content:
            "Open source projects like React, GraphQL and Relay are powering more and more Facebook services. In this session, we'll discuss how we use the latest features of these technologies, like React Suspense, to help deliver a high quality, modern web experience at Facebook.",
    },
];

const user1 = {
    id: 1,
    email: "swpp@snu.ac.kr",
    password: "iluvswpp",
    name: "Software Lover",
    logged_in: false,
};

const useStateMock = jest.spyOn(React, "useState");
const setArticlesMock = jest.fn();
const readUserMock = jest.spyOn(api, "readUser");
const queryArticlesMock = jest.spyOn(api, "queryArticles");

describe("Article Detail test", () => {
    let articlesList;

    afterEach(() => {
        jest.resetAllMocks();
    });

    beforeEach(() => {
        articlesList = <ArticlesList />;

        readUserMock.mockResolvedValue({ entity: user1 });
        queryArticlesMock.mockResolvedValue({ items: articles });
    });

    it("renders without crashing", () => {
        useStateMock.mockReturnValueOnce([[], setArticlesMock]);

        mount(articlesList);
    });

    it("renders without crashing", () => {
        useStateMock.mockReturnValueOnce([[], setArticlesMock]);

        const component = mount(articlesList);
        const saveButton = component.find("#create-article-button");
        saveButton.simulate("click");
    });

    it("renders without crashing", () => {
        useStateMock.mockReturnValueOnce([articles, setArticlesMock]);

        mount(articlesList);
    });
});
