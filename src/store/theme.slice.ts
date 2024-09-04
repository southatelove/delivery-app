import { createSlice } from "@reduxjs/toolkit";
import { loadTheme } from "./storage";

export const THEME_PERSISTENT_STATE = "theme";

export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}
export interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialState = {
  theme: loadTheme(THEME_PERSISTENT_STATE) ?? "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      return {
        ...state,
        theme: action.payload,
      };
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
