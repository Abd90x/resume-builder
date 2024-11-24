import FormSection from "@/components/FormSection";
import ResumePreview from "@/components/ResumePreview";
import actGetResume from "@/store/resume/act/actGetResume";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const ResumeEdit = () => {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actGetResume(params.resumeId));
  }, [dispatch, params]);

  return (
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
  );
};

export default ResumeEdit;
