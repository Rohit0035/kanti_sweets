import React, { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAccountContext } from "../context/AccountContext";
import useWindowDimensions from "../hook/windowSize";
import { setBannerText } from "../store/reducer/menu_reducer";
import { onMenuToggle } from "../utils/helper";
import { MENU } from "../utils/menu";

const SideNav = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const { account = {} } = useAccountContext();

  const user = useMemo(() => {
    return account && account.detail;
  }, [account]);

  const onMenuSelection = useCallback(
    (item) => {
      if (item.children && item.children.length) {
        return;
      }
      onMenuToggle(width);
      dispatch(setBannerText(item.label));
    },
    [width, dispatch]
  );

  const menu = useMemo(() => {
    return MENU;
  }, [MENU]);

  return (
    <div className="app-sidenav-wrapper">
      <nav className="app-sidenav-content">
        <div className="app-sidenav-menu">
          {menu.map((group, index) => {
            return (
              <React.Fragment key={`manu-group-${index}`}>
                {group.title && (
                  <p className="nav-header-title">{group.title}</p>
                )}
                <ul className="nav">
                  {group.items.map((item, index) => {
                    return (
                      <li
                        className="nav-item"
                        key={`menu_${item.id}_${index}`}
                        onClick={() => {
                          onMenuSelection(item);
                        }}
                      >
                        <MenuItem
                          item={item}
                          onMenuSelection={onMenuSelection}
                        />
                      </li>
                    );
                  })}
                </ul>
              </React.Fragment>
            );
          })}
        </div>
        <div className="app-sidenav-footer">
          {useMemo(() => {
            return user ? (
              <React.Fragment>
                <div className="small">Logged in as:</div>
                {user.displayName}
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="small">Have an account?</div>
                <Link to="/">Sign In</Link>
              </React.Fragment>
            );
          }, [user])}
        </div>
      </nav>
    </div>
  );
};

const MenuItem = ({ item, onMenuSelection }) => {
  const hasChildren = useMemo(() => {
    return item && item.children && item.children.length ? true : false;
  }, [item]);
  if (hasChildren) {
    return <MenuItemWithChild item={item} onMenuSelection={onMenuSelection} />;
  } else {
    return (
      <Link to={item.link} className="nav-link">
        {item.label}
      </Link>
    );
  }
};
const MenuItemWithChild = ({ item, onMenuSelection }) => {
  const [isExpand, setExpand] = useState(false);
  return (
    <React.Fragment>
      <p
        className={`nav-link has-children ${
          (isExpand && "is-open") || ""
        }`.trim()}
        onClick={() => setExpand(!isExpand)}
      >
        <span className="nav-link-title">{item.label}</span>
      </p>
      <ul className={`nav ${isExpand ? "opened" : "closed"}`.trim()}>
        {((item && item.children) || []).map((subItem, index) => {
          return (
            <li
              className="nav-item"
              key={`menu_${subItem.id}_${index}`}
              onClick={() => onMenuSelection(subItem)}
            >
              <MenuItem item={subItem} />
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export default SideNav;
