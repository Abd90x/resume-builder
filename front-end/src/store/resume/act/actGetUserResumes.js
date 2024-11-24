import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actGetUserResumes = createAsyncThunk(
  "resume/getResumes",
  async (userEmail, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.get(
        `/user-resumes?filters[userEmail][$eq]=${userEmail}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default actGetUserResumes;
