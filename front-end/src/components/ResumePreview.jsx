import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext } from "react";
import PersonalPreview from "./PreviewSection/PersonalPreview";
import SummaryPreview from "./PreviewSection/SummeryPreview";
import ExperiencePreview from "./PreviewSection/ExperiencePreview";
import EducationPreview from "./PreviewSection/EducationPreview";
import SkillsPreview from "./PreviewSection/SkillsPreview";
import ProjectsPreview from "./PreviewSection/ProjectsPreview";

const ResumePreview = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  return (
    <div
      className="h-full p-14 border-t-[20px] shadow-md print:shadow-none"
      style={{ borderColor: resumeInfo?.themeColor }}
    >
      {/* Personal Details */}
      <PersonalPreview resumeInfo={resumeInfo} />
      {/* Summery */}
      <SummaryPreview resumeInfo={resumeInfo} />
      {/* Professional Experience */}
      <ExperiencePreview resumeInfo={resumeInfo} />
      {/* Projects */}
      <ProjectsPreview resumeInfo={resumeInfo} />
      {/* Educational */}
      <EducationPreview resumeInfo={resumeInfo} />
      {/* Skills */}
      <SkillsPreview resumeInfo={resumeInfo} />
    </div>
  );
};

export default ResumePreview;
