import Enzyme, { mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-17-updated";

import ArticlesListItem from "./ArticlesListItem";

Enzyme.configure({
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true,
});

describe("App test", () => {
    let articlesListItem;

    beforeEach(() => {
        articlesListItem = <ArticlesListItem />;
    });

    it("renders without crashing", () => {
        const component = mount(articlesListItem);
        expect(component.find("#article-list-item").length).toBe(1);
    });
});
