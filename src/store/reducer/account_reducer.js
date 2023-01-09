import { createSlice } from "@reduxjs/toolkit";
import { getStoredData, get_auth_key, storeData } from "../../utils";

export const account = createSlice({
  name: "account",
  initialState: {
    isLoggedIn: false,
    detail: null,
  },
  reducers: {
    setUserLogin: (state, action) => {
      let storredData = getStoredData(get_auth_key());
      //let storredData = action.payload;
      if (storredData) {
        storredData = JSON.parse(storredData);
        if (storredData && storredData.displayName) {
          state.isLoggedIn = true;
          state.detail = {
            ...storredData,
          };
        } else {
          state.isLoggedIn = false;
          state.detail = null;
        }
      } else {
        state.isLoggedIn = false;
        state.detail = null;
      }
    },
  },
});

export const { setUserLogin } = account.actions;
export const isLoggedIn = (state) => state.account.isLoggedIn;
export const loggedInUser = (state) => state.account.detail;
export default account.reducer;
