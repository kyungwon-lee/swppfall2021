import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { userLogin } from "../controllers/store/actions/user";
import { ReduxState } from "../controllers/store/store";

const LoginPage: React.FunctionComponent = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const { isLoggedIn } = useSelector((store: ReduxState) => store.user);
    const history = useHistory();

    useEffect(() => {
        if (isLoggedIn) history.push("/articles");
    }, [history, isLoggedIn]);

    const dispatch = useDispatch();

    const onLogin = () => {
        if (id === "swpp@snu.ac.kr" && password === "iluvswpp") {
            dispatch(userLogin({ id: 1 }));
        }
    };

    return (
        <div>
            <form onSubmit={onLogin}>
                <div style={{ width: 300, display: "flex", marginTop: 12, flexDirection: "column", alignItems: "center" }}>
                    <div style={{ display: "flex", width: "100%" }}>
                        <label style={{ minWidth: 90 }}>ID:</label>
                        <input type="email" value={id} onChange={(e) => setId(e.target.value)} required style={{ flexGrow: 1 }} />
                    </div>
                    <div style={{ display: "flex", marginTop: 8, width: "100%" }}>
                        <label style={{ minWidth: 90 }}>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ flexGrow: 1 }}
                        />
                    </div>
                    <div style={{ display: "flex", marginTop: 16 }}>
                        <input type="submit" value="로그인" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
