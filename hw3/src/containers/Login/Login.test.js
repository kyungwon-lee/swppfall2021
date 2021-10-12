import Enzyme, { mount, shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-17-updated";
import * as redux from "react-redux";

import LoginPage from "./Login";

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

const useSelectorMock = jest.spyOn(redux, "useSelector");

describe("Login test", () => {
    let loginPage;

    beforeEach(() => {
        useSelectorMock.mockReturnValue({ isLoggedIn: false });
        loginPage = <LoginPage />;
    });

    it("renders without crashing", () => {
        const component = mount(loginPage);
        expect(component.find("#login-page").length).toBe(1);
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

    it("should change email input and pw input", () => {
        const component = shallow(loginPage);
        let emailInput = component.find("#email-input");
        emailInput.simulate("change", { target: { value: "test@snu.ac.kr" } });
        let passwordInput = component.find("#pw-input");
        passwordInput.simulate("change", { target: { value: "1234" } });
        let loginButton = component.find("#login-button");
        loginButton.simulate("click");

        // expect(mockDispatch).toHaveBeenCalled();
    });

    it("if loggined is true, should be render to articles page", () => {
        useSelectorMock.mockReturnValue({ isLoggedIn: true });
        mount(loginPage);
        expect(mockPush).toHaveBeenCalledWith("/articles");

        // expect(mockDispatch).toHaveBeenCalled();
    });
});
