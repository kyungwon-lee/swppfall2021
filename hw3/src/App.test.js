import React, { useEffect } from "react";
import * as reactRedux from "react-redux";
import {
  Switch,
  Route,
  useLocation,
  useHistory,
  Redirect,
} from "react-router-dom";
import "./App.css";
import { userAutoLogin, userLogout } from "./store/actions/user";
import { ReduxState } from "./store/store";
import ArticleCreate from "./containers/Article/ArticleCreate";
import ArticleDetail from "./containers/Article/ArticleDetail";
import ArticleEdit from "./containers/Article/ArticleEdit";
import ArticlesList from "./containers/Article/ArticlesList";
import LoginPage from "./containers/Login/Login";
import { getMockStore } from "./test-utils/mocks";
import { shallow, mount } from "enzyme";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { history } from "./store/store";
import { Provider } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

const stubInitialState = {
  user: {
    currentUser: undefined,
    isLoggedIn: false,
    autoLoggedIn: false,
  },
};

let mockStore = getMockStore(stubInitialState);
const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: jest.fn(),
  }),
  useLocation: () => ({
    push: jest.fn(),
  }),
  useDispatch: () => ({
    push: jest.fn(),
  }),
}));

describe("App test", () => {
  let app;
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
  const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");

  beforeEach(() => {
    useSelectorMock.mockReturnValue({ isLoggedIn: false, autoLoggedIn: false });
    // useSelectorMock.mockImplementation((selector) =>
    //   selector({
    //     isLoggedIn: false,
    //     autoLoggedIn: false,
    //   })
    // );

    app = (
      <Provider store={mockStore}>
        <App history={history} />
      </Provider>
    );
  });

  it("renders without crashing", () => {
    const component = mount(app);
    expect(component.find(".App").length).toBe(1);
  });

  it("useSelector test", () => {
    const component = mount(app);
    const { getByText } = render(<App />);
    expect(getByText("isLoggedIn"));
  });

  it("loggedin user redirect test", () => {
    // useSelectorMock.mockImplementation((selector) =>
    //   selector({
    //     isLoggedIn: false,
    //     autoLoggedIn: true,
    //   })
    // );
    // useSelectorMock.mockImplementation((selector) =>
    //   selector({
    //     isLoggedIn: false,
    //     autoLoggedIn: true,
    //   })
    // );
    useSelectorMock.mockReturnValue({ isLoggedIn: false, autoLoggedIn: true });
    expect(mockHistoryPush).toHaveBeenCalledWith("/login");
  }); // line 30

  it("logout test", () => {}); // line 39
});

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });
