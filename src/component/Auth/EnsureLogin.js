import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isLoggedIn, setUserLogin } from "../../store/reducer/account_reducer";
import Login from "./OldLogin";

const EnsureLogin = (props) => {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector(isLoggedIn);

  useEffect(() => {
    dispatch(setUserLogin());
  }, []);

  return isUserLoggedIn ? (
    <React.Fragment>{props.children}</React.Fragment>
  ) : (
    <Login />
  );
};

export default EnsureLogin;
