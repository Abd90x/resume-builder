import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader, Plus, Trash } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import actUpdateResume from "@/store/resume/act/actUpdateResume";

const Skills = ({ enableNext }) => {
  const dispatch = useDispatch();

  const [softSkill, setSoftSkill] = useState("");
  const [technicalSkill, settechnicalSkill] = useState("");

  const params = useParams();

  const [skills, setSkills] = useState({
    softSkills: [],
    technicalSkills: [],
  });

  const { resume, loading, error } = useSelector((state) => state.resume);

  const addSoftSkill = () => {
    if (softSkill === "") return;
    enableNext(false);

    if (skills && skills?.softSkills.length > 0) {
      setSkills((skills) => {
        return {
          ...skills,
          softSkills: [...skills?.softSkills, softSkill],
        };
      });
    } else {
      setSkills((skills) => {
        return {
          ...skills,
          softSkills: [softSkill],
        };
      });
    }

    setSoftSkill("");
  };

  const removeSoftSkill = (idx) => {
    enableNext(false);
    const newSkills = skills?.softSkills.filter((_, i) => i !== idx);
    setSkills({
      ...skills,
      softSkills: newSkills,
    });
  };

  const addTechnicalSkill = () => {
    console.log(skills);
    if (technicalSkill === "") return;
    enableNext(false);

    if (skills && skills?.technicalSkills.length > 0) {
      setSkills((skills) => {
        return {
          ...skills,
          technicalSkills: [...skills?.technicalSkills, technicalSkill],
        };
      });
    } else {
      setSkills((skills) => {
        return {
          ...skills,
          technicalSkills: [technicalSkill],
        };
      });
    }
    settechnicalSkill("");
  };

  useEffect(() => {
    resume?.skills && setSkills(resume?.skills);
  }, [dispatch]);

  const removeTechnicalSkill = (idx) => {
    enableNext(false);
    const newSkills = skills?.technicalSkills.filter((_, i) => i !== idx);
    setSkills({
      ...skills,
      technicalSkills: newSkills,
    });
  };

  const onSave = () => {
    const data = { data: { skills } };
    const resumeId = params.resumeId;
    dispatch(actUpdateResume({ id: resumeId, data: data }))
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
        <form className="flex flex-col gap-1.5">
          <Label htmlFor="title">Soft Skills</Label>
          <Input
            type="text"
            placeholder="Skill"
            value={softSkill}
            onChange={(e) => {
              setSoftSkill(e.target.value);
            }}
          />
          <div className="flex justify-between mt-2">
            <div className="flex gap-1.5 flex-wrap grow">
              {skills?.softSkills &&
                skills?.softSkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 border border-primary rounded-md text-primary text-xs px-2 py-1.5"
                  >
                    <span>{skill}</span>
                    <Trash
                      size={16}
                      className="hover:text-red-600"
                      onClick={() => removeSoftSkill(idx)}
                    />
                  </div>
                ))}
            </div>
            <Button
              size="sm"
              disabled={softSkill === ""}
              onClick={addSoftSkill}
            >
              Add
              <Plus />
            </Button>
          </div>
        </form>
        <form className="flex flex-col gap-1.5">
          <Label htmlFor="title">Technical Skills</Label>
          <Input
            type="text"
            placeholder="Skill"
            value={technicalSkill}
            onChange={(e) => {
              settechnicalSkill(e.target.value);
            }}
          />
          <div className="flex justify-between mt-2">
            <div className="flex gap-1.5 flex-wrap grow">
              {skills?.technicalSkills &&
                skills?.technicalSkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 border border-primary rounded-md text-primary text-xs px-2 py-1.5"
                  >
                    <span>{skill}</span>
                    <Trash
                      size={16}
                      className="hover:text-red-600"
                      onClick={() => removeTechnicalSkill(idx)}
                    />
                  </div>
                ))}
            </div>
            <Button
              size="sm"
              disabled={technicalSkill === ""}
              onClick={addTechnicalSkill}
            >
              Add
              <Plus />
            </Button>
          </div>
        </form>
        <div className="ms-auto">
          <Button onClick={onSave} disabled={loading === "pending"}>
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
