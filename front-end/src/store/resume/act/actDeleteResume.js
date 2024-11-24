import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actDeleteResume = createAsyncThunk(
  "resume/delete",
  async (resumeId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.delete(`/user-resumes/${resumeId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default actDeleteResume;
