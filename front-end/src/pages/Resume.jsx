import ResumePreview from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import actGetResume from "@/store/resume/act/actGetResume";
import { ArrowBigDownDash, LoaderPinwheel } from "lucide-react";
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
        <>
          <div className="flex flex-col gap-6 mt-8 print:m-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 print:hidden">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">Your Resume is Ready! 🎉</h1>
                <h3>
                  <span className="text-primary">Congratulations!</span> Your
                  professionally crafted resume is now ready to download and
                  share with potential employers.
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <Button size="lg" onClick={() => window.print()}>
                  Download <ArrowBigDownDash />
                </Button>
              </div>
            </div>
            <ResumePreview />
          </div>
        </>
      )}
    </div>
  );
};

export default Resume;
