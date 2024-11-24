import { createSlice } from "@reduxjs/toolkit";
import actGetUserResumes from "./act/actGetUserResumes";

const initialState = {
  resumes: [],
  loading: "idle",
  error: null,
};

const userResumesSlice = createSlice({
  name: "userResumes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actGetUserResumes.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetUserResumes.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.resumes = action.payload;
    });
    builder.addCase(actGetUserResumes.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload;
    });
  },
});

export default userResumesSlice.reducer;
