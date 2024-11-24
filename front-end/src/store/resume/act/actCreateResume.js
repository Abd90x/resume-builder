import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actCreateResume = createAsyncThunk(
  "resume/create",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.post("/user-resumes", data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default actCreateResume;
