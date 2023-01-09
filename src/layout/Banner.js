import React, { useMemo } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAccountContext } from "../context/AccountContext";
import { bannerText } from "../store/reducer/menu_reducer";
import { MenuList } from "../lib/Icons";
import logo from "../assets/img/logo70.png";
const Banner = () => {
  const { account = {} } = useAccountContext();
  const textBanner = useSelector(bannerText);

  const user = useMemo(() => {
    return account && account.detail;
  }, [account]);

  const isUserLoggedIn = useMemo(() => {
    return account && account.isLoggedIn;
  }, [account]);

  const handleOnClick = () => {
    document.body.classList.toggle("app-sidenav-toggled");
  };

  return (
    <React.Fragment>
      <nav className="app-topnav-bar">
        <div className="app-navbar-toggler" onClick={() => handleOnClick()}>
          <MenuList />
        </div>
        <div className="my-navbar-brand">
          <Link to={`/home`}>
            {/* <p className="mb-0 logo-title">Brand</p> */}
            <img src={logo} alt="" className="" width={120} />
            {/* <img
              src={`${process.env.PUBLIC_URL}/logo70.png`}
              alt="Brand logo"
              className="my-brand-logo"
            /> */}
            {/* <p className="mb-0 logo-title">Coil Portal</p> */}
          </Link>
        </div>
        <div className="my-navbar-items me-auto not-in-mobile">
          <div className="my-nav-item banner-name">{textBanner}</div>
        </div>
        {isUserLoggedIn && (
          <div className="my-navbar-options ms-auto">
            <UncontrolledDropdown>
              <DropdownToggle nav>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-person-lines-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                </svg>
              </DropdownToggle>
              <DropdownMenu right>
                <div className="account-micro-view">
                  <p>{user && user.displayName}</p>
                </div>
                <Link
                  to={`/master/user/change-password`}
                  className="dropdown-item"
                >
                  <p className="mb-0 text-danger">Change Password</p>
                </Link>
                <a className="logout-btn dropdown-item" href="/logout">
                  Logout
                </a>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        )}
      </nav>
      {/* <div className="">

      </div> */}
    </React.Fragment>
  );
};

export default Banner;
