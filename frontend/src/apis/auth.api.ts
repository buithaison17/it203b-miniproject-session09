import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { User } from "../interfaces/User";

export const getAllAccount = createAsyncThunk(
  "auth/getAllAccount",
  async () => {
    try {
      const res = await axios.get("http://localhost:8080/users");
      return res.data;
    } catch (error) {
      console.log("Get account error : ", error);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (newUser: Omit<User, "id">) => {
    try {
      const res = await axios.post("http://localhost:8080/users", newUser);
      return res.data;
    } catch (error) {
      console.log("Get account error : ", error);
    }
  }
);
