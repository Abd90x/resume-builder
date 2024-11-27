import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { PlusCircle, Trash } from "lucide-react";
import { Textarea } from "../ui/textarea";
import useProjects from "@/hooks/useProjects";

const Projects = () => {
  const { handleChange, addNewProjects, removeProjects, projectsList } =
    useProjects();
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
      </div>
    </div>
  );
};

export default Projects;
