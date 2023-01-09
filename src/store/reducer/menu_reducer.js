import { createSlice } from "@reduxjs/toolkit";

export const menu = createSlice({
  name: "menu",
  initialState: {
    bannerText: "",
    isMenuOpen: true,
  },
  reducers: {
    setBannerText: (state, action) => {
      state.bannerText = action.payload;
      localStorage.setItem("bannerText", action.payload);
    },
    toggleMenu: (state, action) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});

export const { setBannerText, toggleMenu } = menu.actions;
export const bannerText = (state) => {
  return state.menu.bannerText || localStorage.getItem("bannerText") || "Home";
};
export const isMenuOpen = (state) => state.menu.isMenuOpen;
export default menu.reducer;
