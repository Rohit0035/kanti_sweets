import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "./reducer/menu_reducer";
import LoginReducer from "./reducer/account_reducer";

export default configureStore({
  reducer: {
    menu: MenuReducer,
    account: LoginReducer,
  },
});
