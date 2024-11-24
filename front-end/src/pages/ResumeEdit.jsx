import FormSection from "@/components/FormSection";
import ResumePreview from "@/components/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import globalApi from "@/services/globalApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ResumeEdit = () => {
  const params = useParams();

  const [resumeInfo, setResumeInfo] = useState();

  useEffect(() => {
    getResumeInfo();
  }, []);

  const getResumeInfo = () => {
    const resumeId = params.resumeId;
    globalApi
      .GetResumeById(resumeId)
      .then((res) => setResumeInfo(res.data.data));
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="flex flex-col container mx-auto py-14 gap-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Edit Resume</h1>
          <p>Update your resume details</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <FormSection />
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default ResumeEdit;
