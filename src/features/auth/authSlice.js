import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Url } from "./../../common/Apis/MovieApiKey";

const initialState = {
  email: "",
  password: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${Url}/auth/signup`, user);

      // localStorage.setItem("token", JSON.stringify(token.data.token.token));
      return token.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${Url}/auth/signin`, user);

      localStorage.setItem("token", JSON.stringify(token.data.accessToken));
      return token.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser: (state, { payload }) => {
      state.auth = payload;
      state.userLoaded = true;
    },
    loginUsers: (state, { payload }) => {
      state.auth = payload;
      state.userLoaded = true;
    },
    logOutUser: (state) => {
      localStorage.removeItem("token");
      return {
        ...state,
        token: "",
        loginStatus: "",
        userLoaded: false,
      };
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      console.log("pending");
      return { ...state, registerStatus: "pending" };
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      console.log("user", payload);
      if (payload) {
        return { ...state, token: payload, registerStatus: "success" };
      } else return state;
    },
    [registerUser.rejected]: (state, { payload }) => {
      console.log("rejected", payload);
      return {
        ...state,
        registerStatus: "rejected",
        registerError: payload,
      };
    },

    [loginUser.pending]: (state) => {
      console.log("pending");
      return { ...state, loginStatus: "pending" };
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      if (payload) {
        return { ...state, token: payload, loginStatus: "success" };
      } else return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      console.log("rejected", payload);
      return {
        ...state,
        loginStatus: "rejected",
        loginError: payload,
      };
    },
  },
});

export const { loadUser, loginUsers, logOutUser } = authSlice.actions;

export default authSlice.reducer;
