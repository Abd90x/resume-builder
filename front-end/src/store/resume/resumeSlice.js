import { createSlice } from "@reduxjs/toolkit";
import actGetResume from "./act/actGetResume";
import actCreateResume from "./act/actCreateResume";
import actDeleteResume from "./act/actDeleteResume";
import actUpdateResume from "./act/actUpdateResume";

const initialState = {
  resume: null,
  loading: "idle",
  error: null,
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    clearSelectedResume: (state) => {
      state.resume = null;
    },
  },
  extraReducers: (builder) => {
    // Get Resume
    builder.addCase(actGetResume.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetResume.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.resume = action.payload;
    });
    builder.addCase(actGetResume.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload;
    });
    //  Create Resume
    builder.addCase(actCreateResume.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actCreateResume.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.resume = action.payload;
    });
    builder.addCase(actCreateResume.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload;
    });
    // Update Resume
    builder.addCase(actUpdateResume.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actUpdateResume.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.resume = action.payload;
    });
    builder.addCase(actUpdateResume.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload;
    });
    // Delete Resume
    builder.addCase(actDeleteResume.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actDeleteResume.fulfilled, (state) => {
      state.loading = "succeeded";
      state.resume = null;
    });
    builder.addCase(actDeleteResume.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload;
    });
  },
});

export const { clearSelectedResume } = resumeSlice.actions;
export default resumeSlice.reducer;
