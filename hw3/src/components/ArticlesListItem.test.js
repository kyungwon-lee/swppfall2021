import Enzyme, { mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-17-updated";

import ArticlesListItem from "./ArticlesListItem";

Enzyme.configure({
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true,
});

const mockPush = jest.fn();

jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useHistory: () => ({ push: mockPush }),
}));

describe("App test", () => {
    let articlesListItem;

    beforeEach(() => {
        articlesListItem = <ArticlesListItem />;
    });

    it("renders without crashing", () => {
        const component = mount(articlesListItem);
        expect(component.find("#article-list-item").length).toBe(1);
    });

    it("renders without crashing", () => {
        const component = mount(articlesListItem);
        const clickTitleButton = component.find("#click-title");
        clickTitleButton.simulate("click");
    });
});
