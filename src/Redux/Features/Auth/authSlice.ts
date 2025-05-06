import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TUser = {
  id:string,
  userId: string;
  role?: string ;
  email: string;
  phone?:string,
  address?:string,
  iat: number;
  exp: number;
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    updateUser(state, action) {
      if (state.user) {
        Object.assign(state.user, action.payload);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout ,updateUser} = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
