import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus, Trash } from "lucide-react";
import useSkills from "@/hooks/useSkills";

const Skills = () => {
  const { addSkill, removeSkill, skillInput, setSkillInput, skills } =
    useSkills();
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
            <form
              key={type}
              className="flex flex-col gap-1.5"
              onSubmit={(e) => e.preventDefault()}
            >
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
      </div>
    </div>
  );
};

export default Skills;
