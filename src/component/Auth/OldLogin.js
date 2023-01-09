import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { get_auth_key, storeData, getStoredData } from "../../utils";
import { useDispatch } from "react-redux";
import { setUserLogin } from "../../store/reducer/account_reducer";
import "../../styles/Login.scss";
import logo from "../../assets/img/logo70.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [encrPassword, setEncrPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);

  const userNameRef = useRef();
  const pwdRef = useRef();
  const history = useHistory();

  let dispatch = useDispatch();

  useEffect(() => {
    const displayName = getStoredData(get_auth_key());
    if (displayName) {
      setLoggedIn(true);
    }
    dispatch(setUserLogin());
  }, []);

  const handleUsername = (e) => {
    if (e.target.value.trim()) {
      setUsername(e.target.value.trim());
    } else {
      setUsername("");
      setUserError("This field is required");
    }
  };

  const handlePassword = (e) => {
    if (e.target.value.trim()) {
      setPassword(e.target.value.trim());
      setEncrPassword(window.btoa(e.target.value.trim()));
    } else {
      setPassword("");
      setEncrPassword("");
      setPwdError("This field is required");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage("");
    let errorFlag = false;
    if (!username.trim()) {
      setUserError("This field is required");
      errorFlag = true;
    }
    if (!password.trim()) {
      setPwdError("This field is required");
      errorFlag = true;
    }
    if (!errorFlag) {
      let request = {
        username: username,
        password: window.btoa(encrPassword),
      };
      axios
        .post("/api/user/login", request)
        .then((response) => {
          if (response.status === 200) {
            let data = (response.data && response.data.data) || null;
            if (data && data.auth) {
              storeData(
                get_auth_key(),
                JSON.stringify({
                  isClient: true,
                  displayName: data.displayName,
                  userId: data.userId,
                  authMessage: data.authMessage || null,
                })
              );
              setLoggedIn(true);
            }
          } else {
            //handleErrorResponse(response);

            // Remove later
            storeData(
              get_auth_key(),
              JSON.stringify({
                isClient: true,
                displayName: "Admin",
                userId: "asasdfsdfsddss",
                authMessage: null,
              })
            );
            setLoggedIn(true);
          }
        })
        .catch((error) => {
          //handleErrorResponse(error.response);

          // Remove later
          storeData(
            get_auth_key(),
            JSON.stringify({
              isClient: true,
              displayName: "Admin",
              userId: "asasdfsdfsddss",
              authMessage: null,
            })
          );
          setLoggedIn(true);
        });
    }
  };

  const handleErrorResponse = (resp) => {
    if (resp) {
      if (resp.status && resp.status === 404) {
        setErrorMessage(
          (resp.data && resp.data.data && resp.data.data.message) ||
            resp.statusText
        );
      } else {
        setErrorMessage(
          (resp.data && resp.data.data && resp.data.data.message) ||
            resp.statusText
        );
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      history.go(0);
    }
  }, [isLoggedIn]);

  return (
    <div className="login-parent-wrapper">
      <div className="login-wrapper">
        <div className="login-logo">
          {/* <img src={`${process.env.PUBLIC_URL}/logo70.png`} alt="logo" /> */}
          <img src={logo} alt="" className="" width={150} />
        </div>
        {(errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )) ||
          null}
        <form onSubmit={handleLogin}>
          <div className="logo-field-wrapper">
            <div className="row">
              <div className="form-group col-12">
                <label className="form-label" htmlFor="username">
                  Username
                </label>
                <input
                  ref={userNameRef}
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  placeholder="Username"
                  onChange={handleUsername}
                  className="form-control"
                  required
                  autoFocus
                />
                {userNameRef &&
                userNameRef.current &&
                userNameRef.current.touched &&
                userNameRef.current.invalid &&
                userError ? (
                  <span className="err-message" title={userError}>
                    {userError}
                  </span>
                ) : null}
              </div>
              <div className="form-group col-12">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  ref={pwdRef}
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  placeholder="Password"
                  onChange={handlePassword}
                  className="form-control"
                  required
                />
                {pwdRef &&
                pwdRef.current &&
                pwdRef.current.touched &&
                pwdRef.current.invalid &&
                pwdError ? (
                  <span className="err-message" title={pwdError}>
                    {pwdError}
                  </span>
                ) : null}
              </div>
              <div className="col-12 mt-2">
                <button className="btn app-btn-primary app-full" type="submit">
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
