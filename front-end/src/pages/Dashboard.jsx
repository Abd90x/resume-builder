import AddResume from "@/components/AddResume";
import ResumeItem from "@/components/ResumeItem";
import globalApi from "@/services/globalApi";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  const getResumesList = () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    globalApi.GetUserResumes(email).then((res) => {
      setResumeList(res.data.data);
    });
  };

  useEffect(() => {
    user && getResumesList();
  }, [user]);

  return (
    <div className="container flex flex-col gap-8 py-14">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold ">My Resume</h1>
        <p>Start Creating AI Resume</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <AddResume />
        {resumeList.length > 0 &&
          resumeList.map((resume) => (
            <ResumeItem
              resume={resume}
              key={resume.id}
              refreshData={getResumesList}
            />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
