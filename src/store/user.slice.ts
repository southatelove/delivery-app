import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "./storage";
import axios from "axios";
import { PREFIX } from "../helpers/API";
import { LoginResponse } from "../interfaces/auth.interface";

export const JWT_PERSISTENT_STATE = "userData";
export interface UserState {
  jwt: string | null;
  loginState: null | "rejected";
}
export interface UserPersistensState {
  jwt: string | null;
}

const initialState: UserState = {
  jwt: loadState<UserPersistensState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
  loginState: null,
};

export const login = createAsyncThunk(
  "user/login",
  async (params: { email: string; password: string }) => {
    const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
      email: params.email,
      password: params.password,
    });
    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // addJwt: (state, action: PayloadAction<string>) => {
    //   state.jwt = action.payload;
    // }, Заменен ExtraReducerom
    logout: (state) => {
      state.jwt = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<LoginResponse>) => {
        state.jwt = action.payload.access_token;
      }
    );
    builder.addCase(login.rejected, (state, error) => {
      console.log(error);
    });
  },
});

// export const { addJwt, logout } = userSlice.actions;
export const userActions = userSlice.actions;
export default userSlice.reducer;
