import { useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Loader, PlusCircle, Trash } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import globalApi from "@/services/globalApi";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";

const Projects = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [projectsList, setProjectsList] = useState([
    {
      projectName: "",
      description: "",
      techStack: "",
      github_repo: "",
      live_demo: "",
    },
  ]);

  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    resumeInfo?.projects?.length > 0 && setProjectsList(resumeInfo?.projects);
  }, [resumeInfo]);

  const handleChange = (event, index) => {
    enableNext(false);
    const newEntries = projectsList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setProjectsList(newEntries);
    setResumeInfo({ ...resumeInfo, projects: projectsList });
  };

  const addNewProjects = () => {
    setProjectsList([
      ...projectsList,
      {
        projectName: "",
        description: "",
        techStack: "",
        github_repo: "",
        live_demo: "",
      },
    ]);
  };

  const removeProjects = () => {
    setProjectsList((projectsList) => projectsList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        projects: projectsList,
      },
    };

    const resumeId = params.resumeId;

    globalApi.UpdateResumeDetail(data, resumeId).then(
      () => {
        setLoading(false);
        toast.success("Projects Details updated !");
        enableNext(true);
      },
      () => {
        setLoading(false);
      }
    );
  };
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-primary">
      <h2 className="font-bold text-lg">Projects</h2>
      <p>Add your Projects Details</p>
      <div>
        {projectsList.map((item, idx) => {
          return (
            <div className="border p-5 rounded-lg mt-5" key={idx}>
              <div className="grid grid-cols-2 gap-3 mt-5">
                <div className="flex flex-col gap-1.5 col-span-2">
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input
                    type="text"
                    placeholder="e.g. E-Commerce Cart"
                    name="projectName"
                    id="projectName"
                    defaultValue={item?.projectName}
                    onChange={(e) => handleChange(e, idx)}
                  />
                </div>

                <div className="flex flex-col gap-1.5 col-span-2">
                  <Label htmlFor="techStack">Technologies</Label>
                  <Input
                    type="text"
                    placeholder="e.g. React, CSS, Firebase"
                    name="techStack"
                    id="techStack"
                    defaultValue={item?.techStack}
                    onChange={(e) => handleChange(e, idx)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="github_repo">Repository URL</Label>
                  <Input
                    type="text"
                    placeholder="www.domain.com/project-name"
                    name="github_repo"
                    id="github_repo"
                    defaultValue={item?.github_repo}
                    onChange={(e) => handleChange(e, idx)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="live_demo">Demo URL</Label>
                  <Input
                    type="text"
                    placeholder="www.domain.com/project-name"
                    name="live_demo"
                    id="live_demo"
                    defaultValue={item?.live_demo}
                    onChange={(e) => handleChange(e, idx)}
                  />
                </div>

                <div className="flex flex-col gap-1.5 col-span-2">
                  <Label htmlFor="state">Description</Label>
                  <Textarea
                    placeholder="Description"
                    name="description"
                    id="description"
                    defaultValue={item?.description}
                    onChange={(e) => handleChange(e, idx)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between gap-3 mt-5">
        <div className="flex items-center gap-3">
          <Button
            variant="destructive"
            disabled={projectsList.length === 0}
            onClick={removeProjects}
          >
            <Trash />
          </Button>
          <Button variant="outline" onClick={addNewProjects}>
            Add More Projects
            <PlusCircle />
          </Button>
        </div>
        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <Loader className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default Projects;
