import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useLocation, useHistory, Redirect, BrowserRouter } from "react-router-dom";
import "./App.css";
import { userAutoLogin, userLogout } from "./store/actions/user";
import { ReduxState } from "./store/store";
import ArticleCreate from "./containers/Article/ArticleCreate";
import ArticleDetail from "./containers/Article/ArticleDetail";
import ArticleEdit from "./containers/Article/ArticleEdit";
import ArticlesList from "./containers/Article/ArticlesList";
import LoginPage from "./containers/Login/Login";

const App: React.FunctionComponent = () => {
    const { isLoggedIn, autoLoggedIn } = useSelector((store: ReduxState) => store.user);
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        // if (autoLoggedIn && !isLoggedIn && location.pathname !== "/login") {
        if (autoLoggedIn && !isLoggedIn) {
            history.push("/login");
        }
    }, [location.pathname, isLoggedIn]);

    useEffect(() => {
        dispatch(userAutoLogin());
    }, []);

    const onLogout = () => {
        dispatch(userLogout());
    };

    return (
        <>
            <BrowserRouter>
                <div className="App" style={{ marginBottom: 24 }}>
                    <h1>[SWPP HW3]</h1>
                    {isLoggedIn && (
                        <button id="logout-button" onClick={onLogout} style={{ alignContent: "flex-end" }}>
                            Logout
                        </button>
                    )}
                    <br />

                    <Switch>
                        <Route path="/login" component={LoginPage} />
                        <Route path="/articles/create" component={ArticleCreate} />
                        <Route path="/articles/:id/edit" component={ArticleEdit} />
                        <Route path="/articles/:id" component={ArticleDetail} />
                        <Route path="/articles" component={ArticlesList} />
                        <Redirect to="/login" />
                    </Switch>
                </div>
            </BrowserRouter>
        </>
    );
};

export default App;
