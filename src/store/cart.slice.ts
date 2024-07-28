import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  count: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      const existed = state.items.find((item) => item.id === action.payload);
      if (!existed) {
        state.items.push({
          id: action.payload,
          count: 1,
        });
        return;
      }
      state.items.map((item) => {
        if (item.id === action.payload) {
          item.count += 1;
        }
        return item;
      });
    },
    remove: (state, action: PayloadAction<number>) => {
      const existed = state.items.find((item) => item.id === action.payload);

      if (!existed) {
        return;
      }
      if (existed) {
        if (existed.count === 1) {
          state.items = state.items.filter((i) => i.id !== action.payload);
        } else {
          state.items.map((item) => {
            if (item.id === action.payload) {
              item.count -= 1;
            }
            return item;
          });
          return;
        }
      }
      state.items = state.items.filter((i) => i.id === action.payload);
    },
    delete: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
