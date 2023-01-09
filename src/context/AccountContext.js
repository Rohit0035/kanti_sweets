import React from "react";

/**
 * Context for Account Info
 */
export const AccountContext = React.createContext();

export const useAccountContext = () => {
  return React.useContext(AccountContext);
};

/**
 * Context for Menu and Banner
 */
export const MenuContext = React.createContext();

export const useMenuContext = () => {
  return React.useContext(MenuContext);
};
