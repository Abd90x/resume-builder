import { configureStore } from "@reduxjs/toolkit";
import userResumes from "./resume/userResumesSlice";
import resume from "./resume/resumeSlice";

const store = configureStore({
  reducer: {
    userResumes,
    resume,
  },
});

export { store };
