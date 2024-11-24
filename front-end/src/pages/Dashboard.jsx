import AddResume from "@/components/AddResume";
import ResumeItem from "@/components/ResumeItem";
import actGetUserResumes from "@/store/resume/act/actGetUserResumes";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useUser();

  const dispatch = useDispatch();

  const { resumes, loading, error } = useSelector((state) => state.userResumes);

  useEffect(() => {
    user &&
      dispatch(actGetUserResumes(user?.primaryEmailAddress?.emailAddress));
  }, [user, dispatch]);

  return (
    <div className="container flex flex-col gap-8 py-14">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold ">My Resume</h1>
        <p>Start Creating AI Resume</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <AddResume />
        {resumes?.data &&
          resumes.data.map((resume) => (
            <ResumeItem resume={resume} key={resume.id} />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
