import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editResume } from "@/store/resume/resumeSlice";

const useProjects = () => {
  const dispatch = useDispatch();
  const { resume, loading, error } = useSelector((state) => state.resume);

  const [projectsList, setProjectsList] = useState([
    {
      projectName: "",
      description: "",
      techStack: "",
      github_repo: "",
      live_demo: "",
    },
  ]);

  useEffect(() => {
    resume?.projects?.length > 0 && setProjectsList(resume?.projects);
  }, [resume]);

  const handleChange = (event, index) => {
    const newEntries = JSON.parse(JSON.stringify(projectsList));
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setProjectsList(newEntries);
    dispatch(editResume({ ...resume, projects: newEntries }));
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
    const newEntries = JSON.parse(JSON.stringify(projectsList));
    setProjectsList(newEntries);
    dispatch(editResume({ ...resume, projects: newEntries }));
  };

  return {
    handleChange,
    addNewProjects,
    removeProjects,
    projectsList,
    loading,
    error,
  };
};

export default useProjects;
