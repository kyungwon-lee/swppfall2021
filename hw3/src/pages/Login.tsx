import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { userLogin } from "../controllers/store/actions/user";
import { ReduxState } from "../controllers/store/store";

const LoginPage: React.FunctionComponent = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const { isLoggedIn } = useSelector((store: ReduxState) => store.user);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (isLoggedIn) history.push("/articles");
    }, [history, isLoggedIn]);

    const onLogin = () => {
        if (id === "swpp@snu.ac.kr" && password === "iluvswpp") {
            dispatch(userLogin({ id: 1 }));
        }
    };

    return (
        <div>
            Login
            <div>
                ID <input value={id} onChange={(e) => setId(e.target.value)}></input>
                PASSWORD <input value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button onClick={onLogin}>로그인</button>
            </div>
        </div>
    );
};

export default LoginPage;
