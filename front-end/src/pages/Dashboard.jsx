import AddResume from "@/components/AddResume";
import Loading from "@/components/Feedback/Loading";
import ResumeItem from "@/components/ResumeItem";
import actGetUserResumes from "@/store/resume/act/actGetUserResumes";
import { resetResume } from "@/store/resume/resumeSlice";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useUser();

  const dispatch = useDispatch();

  const { resumes, loading, error } = useSelector((state) => state.userResumes);

  useEffect(() => {
    user &&
      dispatch(actGetUserResumes(user?.primaryEmailAddress?.emailAddress));
    dispatch(resetResume());
  }, [user, dispatch]);

  if (!user) return <Navigate to="/signin" />;

  return (
    <div className="container flex flex-col gap-8 py-14 mb-32">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold ">My Resume</h1>
        <p>Start Creating AI Resume</p>
      </div>
      <Loading loading={loading} error={error} type="resume">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <AddResume />

          {resumes?.data &&
            resumes.data.map((resume) => (
              <ResumeItem resume={resume} key={resume.id} />
            ))}
        </div>
      </Loading>
    </div>
  );
};

export default Dashboard;
