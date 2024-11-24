import ResumePreview from "@/components/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import globalApi from "@/services/globalApi";
import { LoaderPinwheel } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Resume = () => {
  const [resumeInfo, setResumeInfo] = useState();
  const [loading, setLoading] = useState(false);
  const resumeId = useParams().resumeId;

  useEffect(() => {
    setLoading(true);
    globalApi.GetResumeById(resumeId).then((res) => {
      setResumeInfo(res.data.data);
      setLoading(false);
    });
  }, [resumeId]);

  return (
    <div className="container print:!p-0 ">
      {loading ? (
        <div className="flex flex-col justify-center items-center h-[calc(100vh-90px)]">
          <LoaderPinwheel
            size={144}
            className="animate-spin ease-in-out text-primary"
          />
          <h1 className="text-2xl font-bold">Resume preparing</h1>
          <p>We Are creating your resume please wait</p>
        </div>
      ) : (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
          <ResumePreview />
        </ResumeInfoContext.Provider>
      )}
    </div>
  );
};

export default Resume;
