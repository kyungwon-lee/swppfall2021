import Enzyme, { mount, shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-17-updated";
import * as redux from "react-redux";
import router from "react-router";

import App from "./App";

Enzyme.configure({
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true,
});

const mockPush = jest.fn();
const mockDispatch = jest.fn();

jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useHistory: () => ({ push: mockPush }),
}));

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => mockDispatch,
}));

const useLocationMock = jest.spyOn(router, "useLocation");
const useSelectorMock = jest.spyOn(redux, "useSelector");

describe("App test", () => {
    let app;

    beforeEach(() => {
        useSelectorMock.mockImplementation((callback) => callback({ user: { isLoggedIn: true, autoLoggedIn: false } }));
        useLocationMock.mockReturnValue({ pathname: "/" });
        app = <App />;
    });

    it("renders without crashing", () => {
        const component = mount(app);
        expect(component.find(".App").length).toBe(1);
    });

    it("logout button rendered when logged in", () => {
        useSelectorMock.mockImplementationOnce((callback) => callback({ user: { isLoggedIn: true, autoLoggedIn: false } }));

        const component = shallow(app);
        let logoutButton = component.find("#logout-button");
        expect(logoutButton.length).toBe(1);
    });

    it("logout button not rendered when not logged in", () => {
        useSelectorMock.mockImplementationOnce((callback) => callback({ user: { isLoggedIn: false, autoLoggedIn: false } }));
        const component = shallow(app);
        let logoutButton = component.find("#logout-button");
        expect(logoutButton.length).toBe(0);
    });

    it("redirects to login page when tried auto login and failed", () => {
        useSelectorMock.mockImplementationOnce((callback) => callback({ user: { isLoggedIn: false, autoLoggedIn: true } }));
        mount(app);
        expect(mockPush).toHaveBeenCalledWith("/login");
    });

    it("try auto login on mount", () => {
        mount(app);
        expect(mockDispatch).toHaveBeenCalled();
    });

    it("logout when logout button clicked", () => {
        useSelectorMock.mockImplementationOnce((callback) => callback({ user: { isLoggedIn: true, autoLoggedIn: true } }));
        const component = shallow(app);
        let logoutButton = component.find("#logout-button");
        logoutButton.simulate("click");
        expect(mockDispatch).toHaveBeenCalled();
    });
});
