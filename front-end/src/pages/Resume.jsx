import ResumePreview from "@/components/ResumePreview";
import actGetResume from "@/store/resume/act/actGetResume";
import { LoaderPinwheel } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Resume = () => {
  const { loading } = useSelector((state) => state.resume);

  const dispatch = useDispatch();
  const resumeId = useParams().resumeId;

  useEffect(() => {
    dispatch(actGetResume(resumeId));
  }, [dispatch, resumeId]);

  return (
    <div className="container print:!p-0 ">
      {loading === "pending" ? (
        <div className="flex flex-col justify-center items-center h-[calc(100vh-90px)]">
          <LoaderPinwheel
            size={144}
            className="animate-spin ease-in-out text-primary"
          />
          <h1 className="text-2xl font-bold">Resume preparing</h1>
          <p>We Are creating your resume please wait</p>
        </div>
      ) : (
        <ResumePreview />
      )}
    </div>
  );
};

export default Resume;
