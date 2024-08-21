import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "./storage";
import axios, { AxiosError } from "axios";
import { PREFIX } from "../helpers/API";
import { LoginResponse } from "../interfaces/auth.interface";
import { Profile } from "../interfaces/user.interface";
import { RootState } from "./store";

export const JWT_PERSISTENT_STATE = "userData";
export interface UserState {
  jwt: string | null;
  loginErrorMessage?: null | string;
  registerErrorMessage?: null | string;
  profile?: Profile;
}

export interface UserPersistensState {
  jwt: string | null;
}

const initialState: UserState = {
  jwt: loadState<UserPersistensState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
  profile: undefined,
};

// export const login = createAsyncThunk(
//   "user/login",
//   async (params: { email: string; password: string }) => {
//     const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
//       email: params.email,
//       password: params.password,
//     });
//     return data;
//   }
// );
export const login = createAsyncThunk(
  "user/login",
  async (params: { email: string; password: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
        email: params.email,
        password: params.password,
      });
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (params: { email: string; password: string; name: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(
        `${PREFIX}/auth/register`,
        {
          email: params.email,
          password: params.password,
          name: params.name,
        }
      );
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>(
  "user/getProfile",
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async (_, thunkApi) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const jwt = thunkApi.getState().user.jwt;
    const { data } = await axios.get<LoginResponse>(`${PREFIX}/user/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
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
    clearLoginError: (state) => {
      state.loginErrorMessage = undefined;
    },
    clearEmailError: (state) => {
      state.registerErrorMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<LoginResponse>) => {
        if (!action.payload) {
          return;
        }
        state.jwt = action.payload.access_token;
      }
    );
    builder.addCase(login.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    builder.addCase(
      register.fulfilled,
      (state, action: PayloadAction<LoginResponse>) => {
        if (!action.payload) {
          return;
        }
        state.jwt = action.payload.access_token;
      }
    );
    builder.addCase(register.rejected, (state, action) => {
      state.registerErrorMessage = action.error.message;
    });
  },
});

// export const { addJwt, logout } = userSlice.actions;
export const userActions = userSlice.actions;
export default userSlice.reducer;
