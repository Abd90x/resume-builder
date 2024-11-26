import PersonalPreview from "./PreviewSection/PersonalPreview";
import SummaryPreview from "./PreviewSection/SummeryPreview";
import ExperiencePreview from "./PreviewSection/ExperiencePreview";
import EducationPreview from "./PreviewSection/EducationPreview";
import SkillsPreview from "./PreviewSection/SkillsPreview";
import ProjectsPreview from "./PreviewSection/ProjectsPreview";

import { useSelector } from "react-redux";

const ResumePreview = () => {
  const { resume, loading, error } = useSelector((state) => state.resume);

  return (
    <div className="h-full p-14 shadow-md print:shadow-none border rounded-md print:border-none">
      {/* Personal Details */}
      <PersonalPreview resumeInfo={resume} />
      {/* Summery */}
      <SummaryPreview resumeInfo={resume} />
      {/* Professional Experience */}
      <ExperiencePreview resumeInfo={resume} />
      {/* Projects */}
      <ProjectsPreview resumeInfo={resume} />
      {/* Educational */}
      <EducationPreview resumeInfo={resume} />
      {/* Skills */}
      <SkillsPreview resumeInfo={resume} />
    </div>
  );
};

export default ResumePreview;
