import { ArrowBigDownDash, ArrowLeft, ArrowRight, House } from "lucide-react";
import PersonalDetails from "./FormSection/PersonalDetails";
import { Button } from "./ui/button";
import { useState } from "react";
import Summary from "./FormSection/Summary";
import Experience from "./FormSection/Experience";
import Educational from "./FormSection/Educational";
import Skills from "./FormSection/Skills";
import Projects from "./FormSection/Projects";
import { Link, Navigate, useParams } from "react-router-dom";
import ThemeColor from "./FormSection/ThemeColor";
import { useDispatch, useSelector } from "react-redux";
import actUpdateResume from "@/store/resume/act/actUpdateResume";
import actGetResume from "@/store/resume/act/actGetResume";

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);

  const { resume } = useSelector((state) => state.resume);
  const dispatch = useDispatch();

  const resumeId = useParams().resumeId;

  const handleSave = () => {
    const resumeData = {
      data: {
        firstName: resume.firstName ?? "",
        lastName: resume.lastName ?? "",
        jobTitle: resume.jobTitle ?? "",
        address: resume.address ?? "",
        email: resume.email ?? "",
        phone: resume.phone ?? "",
        linkedin: resume.linkedin ?? "",
        github: resume.github ?? "",
        summary: resume.summary ?? "",
        experience: resume.experience.map(({ id, ...exp }) => exp) ?? [],
        projects: resume.projects.map(({ id, ...project }) => project) ?? [],
        education: resume.education.map(({ id, ...edu }) => edu) ?? [],
        skills: resume.skills ?? [],
        themeColor: resume.themeColor ?? "#000000",
      },
    };

    setActiveFormIndex(7);

    dispatch(
      actUpdateResume({
        id: resumeId,
        data: resumeData,
      })
    )
      .unwrap()
      .then(() => {
        dispatch(actGetResume(resumeId));
      });
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/dashboard">
            <Button size="icon">
              <House />
            </Button>
          </Link>

          <ThemeColor />
        </div>

        <div className="flex items-center gap-2">
          {activeFormIndex > 1 && (
            <Button onClick={() => setActiveFormIndex((prv) => prv - 1)}>
              <ArrowLeft />
            </Button>
          )}

          {activeFormIndex === 6 ? (
            <Button onClick={handleSave}>
              Save & Download <ArrowBigDownDash />
            </Button>
          ) : (
            <Button onClick={() => setActiveFormIndex((prv) => prv + 1)}>
              Next <ArrowRight />
            </Button>
          )}
        </div>
      </div>

      {/* Personal Details */}
      {activeFormIndex === 1 ? (
        <PersonalDetails />
      ) : activeFormIndex === 2 ? (
        <Summary />
      ) : activeFormIndex === 3 ? (
        <Experience />
      ) : activeFormIndex === 4 ? (
        <Educational />
      ) : activeFormIndex === 5 ? (
        <Skills />
      ) : activeFormIndex === 6 ? (
        <Projects />
      ) : activeFormIndex === 7 ? (
        <Navigate to={`/dashboard/resume/${resumeId}`} replace={true} />
      ) : null}
    </div>
  );
};

export default FormSection;
