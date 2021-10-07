import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { userLogin } from "../../store/actions/user";
import { ReduxState } from "../../store/store";

const LoginPage: React.FunctionComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { isLoggedIn } = useSelector((store: ReduxState) => store.user);
    const history = useHistory();

    useEffect(() => {
        if (isLoggedIn) history.push("/articles");
    }, [history, isLoggedIn]);

    const dispatch = useDispatch();

    const onLogin = () => {
        dispatch(userLogin({ email, password }));
    };

    return (
        <div>
            Login
            <br /> <br />
            <div>
                EMAIL ID <input id="email-input" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <br />
                PASSWORD <input id="pw-input" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <br />
                <button id="login-button" onClick={onLogin}>
                    Login
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
