import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../interfaces/User";
import { getAllAccount, register } from "../apis/auth.api";
import { storage } from "../utils/storage";

type InitType = {
  status: "idle" | "pending" | "success" | "error";
  data: User[];
  error: string | undefined;
  currentUser: User | null;
};

const savedUser = storage.get<User>("currentUser");

const initialState: InitType = {
  status: "idle",
  data: [],
  error: undefined,
  currentUser: savedUser || null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      storage.set("currentUser", JSON.stringify(Date.now()));
    },
    logOut: (state) => {
      state.currentUser = null;
      storage.remove("currentUser");
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllAccount.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getAllAccount.rejected, (state) => {
        state.status = "error";
      })
      .addCase(getAllAccount.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.status = "pending";
      })
      .addCase(register.rejected, (state) => {
        state.status = "error";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "success";
        state.data.push(action.payload);
      });
  },
});

export const { loginSuccess, logOut } = authSlice.actions;
export default authSlice.reducer;
