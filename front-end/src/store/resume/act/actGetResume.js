import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actGetResume = createAsyncThunk(
  "resume/getResume",
  async (resumeId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.get(`/user-resumes/${resumeId}?populate=*`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default actGetResume;
