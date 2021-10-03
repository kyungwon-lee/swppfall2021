import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation, useHistory } from "react-router-dom";
import "./App.css";
import { userAutoLogin } from "./controllers/store/actions/user";
import ArticlesListPage from "./pages/ArticlesList";
import LoginPage from "./pages/Login";

const App = () => {
    const { isLoggedIn } = useSelector((store) => store.user);
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        const forbiddenPath = ["/articles"];
        if (!isLoggedIn && forbiddenPath.includes(location.pathname)) {
            history.push("/login");
        }
    }, [location.pathname, isLoggedIn]);

    useEffect(() => {
        dispatch(userAutoLogin());
    }, []);

    return (
        <>
            <div className="App" style={{ marginBottom: 24 }}>
                <h1>SWPP HW3!</h1>
            </div>
            {isLoggedIn ? "로그인 됨" : "로그인 안 됨"}
            <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/articles" component={ArticlesListPage} />
            </Switch>
        </>
    );
};

export default App;
