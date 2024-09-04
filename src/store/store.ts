import { configureStore } from "@reduxjs/toolkit";
import userSlice, { JWT_PERSISTENT_STATE } from "./user.slice";
import { saveState, saveTheme } from "./storage";
import cartSlice, { CART_PERSISTENT_STATE } from "./cart.slice";
import themeSlice, { THEME_PERSISTENT_STATE } from "./theme.slice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
    theme: themeSlice,
  },
});

// Отработка при изменении состояния store
store.subscribe(() => {
  saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE);
});

store.subscribe(() => {
  saveState({ items: store.getState().cart.items }, CART_PERSISTENT_STATE);
});

store.subscribe(() => {
  saveTheme(store.getState().theme.theme, THEME_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
