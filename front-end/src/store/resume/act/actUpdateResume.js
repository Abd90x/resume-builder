import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actUpdateResume = createAsyncThunk(
  "resume/update",
  async ({ id, data }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.put(`/user-resumes/${id}`, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default actUpdateResume;
