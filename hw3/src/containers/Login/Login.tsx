import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { userLogin } from "../../store/actions/user";
import { ReduxState } from "../../store/store";

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
    } else {
      alert("Email or password is wrong");
    }
  };

  return (
    <div>
      Login
      <br /> <br />
      <div>
        EMAIL ID{" "}
        <input
          id="email-input"
          value={id}
          onChange={(e) => setId(e.target.value)}
        ></input>
        <br />
        PASSWORD{" "}
        <input
          id="pw-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <br />
        <button id="login-button" onClick={onLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
