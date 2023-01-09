import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  Suspense,
  lazy,
} from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Banner from "./layout/Banner";
import SideBar from "./layout/SideBar";
import { getUserAccountDetail } from "./service";
import accountReducer, { setUserLogin } from "./store/reducer/account_reducer";
import { AccountContext } from "./context/AccountContext";
import useWindowDimensions from "./hook/windowSize";
import { onMenuToggle } from "./utils/helper";
import Loader from "./layout/Loader";
import NoMatch404 from "./layout/404";
import EnsureLogin from "./component/Auth/EnsureLogin";
import AlertBox from "./lib/Alert";

// import UserList from "./component/users/UserList"

const Home = lazy(() => import("./component/Home"));

const UserList = lazy(() => import("./component/users/UserList"));

const Logout = lazy(() => import("./component/Auth/Logout"));

toast.configure({
  hideProgressBar: false,
});

function App() {
  const [account, accountDispatch] = useReducer(accountReducer, {});
  const { width } = useWindowDimensions();

  useEffect(() => {
    const getUser = async () => {
      try {
        let result = await getUserAccountDetail();
        accountDispatch(setUserLogin(result));
      } catch (e) {
        toast.error(e.message);
      }
    };
    getUser();
  }, []);

  const accountInfo = useMemo(() => {
    return {
      account,
      accountDispatch,
    };
  }, [account]);

  const handleMenuToggleEvent = useCallback(() => {
    onMenuToggle(width);
  }, [width]);

  return (
    <AccountContext.Provider value={accountInfo}>
      <Router>
        <EnsureLogin>
          <Banner />
          <div className="app-wrapper">
            <SideBar />
            <div
              className="app-content-wrapper"
              onClick={handleMenuToggleEvent}
            >
              <main
                style={{
                  position: "relative",
                  minHeight: "calc(100vh - 60px)",
                }}
              >
                {account &&
                  account.isLoggedIn &&
                  account.detail &&
                  account.detail.authMessage && (
                    <AlertBox
                      type="warning"
                      message={account.detail.authMessage}
                    />
                  )}
                <Suspense fallback={<Loader text="Loading ... " />}>
                  <Switch>
                    <Route path="/home" exact>
                      <Home />
                    </Route>
                    <Route path="/" exact>
                      <Redirect to="/home" />
                    </Route>

                    <Route path="/users/userlist" exact>
                      <UserList />
                    </Route>
                    <Route path="/logout" exact>
                      <Logout />
                    </Route>
                    <Route path="*">
                      <NoMatch404 />
                    </Route>
                  </Switch>
                </Suspense>
              </main>
            </div>
          </div>
        </EnsureLogin>
        <ToastContainer />
      </Router>
    </AccountContext.Provider>
  );
}

export const ComingSoon = () => (
  <div className="container">
    <h1 className="text-center">Coming Soon</h1>
  </div>
);

export default App;
