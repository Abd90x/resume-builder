import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { editResume } from "@/store/resume/resumeSlice";
import { useEffect, useState } from "react";

const useSkills = () => {
  const dispatch = useDispatch();

  const [skillInput, setSkillInput] = useState({ soft: "", technical: "" });
  const [skills, setSkills] = useState({ softSkills: [], technicalSkills: [] });

  const { resume } = useSelector((state) => state.resume);

  // Fetch skills from resume on mount
  useEffect(() => {
    if (resume?.skills) setSkills(resume.skills);
  }, [resume]);

  // Generic function to add a skill
  const addSkill = (type) => {
    const skillKey = type === "soft" ? "softSkills" : "technicalSkills";
    const newSkill = skillInput[type].trim();

    if (!newSkill) return toast.error("Skill cannot be empty!");
    if (skills[skillKey].includes(newSkill)) {
      return toast.error("Skill already exists!");
    }

    const updatedSkills = {
      ...skills,
      [skillKey]: [...skills[skillKey], newSkill],
    };

    setSkills(updatedSkills);
    dispatch(editResume({ ...resume, skills: updatedSkills }));
    setSkillInput({ ...skillInput, [type]: "" });
  };

  // Generic function to remove a skill
  const removeSkill = (type, idx) => {
    const skillKey = type === "soft" ? "softSkills" : "technicalSkills";
    const updatedSkills = {
      ...skills,
      [skillKey]: skills[skillKey].filter((_, i) => i !== idx),
    };

    setSkills(updatedSkills);
    dispatch(editResume({ ...resume, skills: updatedSkills }));
  };

  return {
    addSkill,
    removeSkill,
    skillInput,
    setSkillInput,
    skills,
    setSkills,
    resume,
  };
};

export default useSkills;
