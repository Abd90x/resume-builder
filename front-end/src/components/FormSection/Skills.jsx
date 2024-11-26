import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader, Plus, Trash } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import actUpdateResume from "@/store/resume/act/actUpdateResume";
import { editResume } from "@/store/resume/resumeSlice";

const Skills = ({ enableNext }) => {
  const dispatch = useDispatch();
  const params = useParams();

  const [skillInput, setSkillInput] = useState({ soft: "", technical: "" });
  const [skills, setSkills] = useState({ softSkills: [], technicalSkills: [] });

  const { resume, loading } = useSelector((state) => state.resume);

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
    enableNext(false);
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
    enableNext(false);
  };

  // Save changes
  const handleSave = () => {
    const resumeId = params.resumeId;
    dispatch(actUpdateResume({ id: resumeId, data: { data: { skills } } }))
      .unwrap()
      .then(() => {
        toast.success("Skills Updated!");
        enableNext(true);
      });
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-primary">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add your Skills</p>
      <div className="flex flex-col gap-8 mt-5">
        {/* Reusable Skill Input */}
        {["soft", "technical"].map((type) => {
          const skillKey = type === "soft" ? "softSkills" : "technicalSkills";
          const label = type === "soft" ? "Soft Skills" : "Technical Skills";

          return (
            <form key={type} className="flex flex-col gap-1.5">
              <Label htmlFor={type}>{label}</Label>
              <Input
                id={type}
                type="text"
                placeholder="Add a skill"
                value={skillInput[type]}
                onChange={(e) =>
                  setSkillInput({ ...skillInput, [type]: e.target.value })
                }
              />
              <div className="flex justify-between mt-2">
                <div className="flex gap-1.5 flex-wrap grow">
                  {skills[skillKey].map((skill, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 border border-primary rounded-md text-primary text-xs px-2 py-1.5"
                    >
                      <span>{skill}</span>
                      <Trash
                        size={16}
                        className="hover:text-red-600 cursor-pointer"
                        onClick={() => removeSkill(type, idx)}
                      />
                    </div>
                  ))}
                </div>
                <Button
                  size="sm"
                  disabled={!skillInput[type]}
                  onClick={() => addSkill(type)}
                >
                  Add
                  <Plus />
                </Button>
              </div>
            </form>
          );
        })}

        {/* Save Button */}
        <div className="ms-auto">
          <Button onClick={handleSave} disabled={loading === "pending"}>
            {loading === "pending" ? (
              <span className="flex items-center gap-2">
                Saving
                <Loader className="animate-spin" />
              </span>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Skills;
