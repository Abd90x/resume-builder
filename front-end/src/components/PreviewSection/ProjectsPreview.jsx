import { Github, SquareArrowOutUpRight } from "lucide-react";

const ProjectsPreview = ({ resumeInfo }) => {
  return (
    <div className="flex flex-col gap-2 py-3">
      <h2
        className="text-center font-bold text-sm "
        style={{ color: resumeInfo?.themeColor }}
      >
        Projects
      </h2>
      <hr className="" style={{ borderColor: resumeInfo?.themeColor }} />
      <div className="flex flex-col gap-4">
        {resumeInfo?.projects &&
          resumeInfo?.projects.map((prj, index) => (
            <div key={index} className="flex flex-col gap-1 text-sm">
              <div className="flex items-center justify-between gap-2">
                <h3 className="capitalize font-semibold">{prj.projectName} </h3>
                <div className="flex items-center gap-2 text-xs font-medium">
                  {prj.live_demo && (
                    <a
                      href={prj.live_demo}
                      target="_blank"
                      className="flex items-center gap-1.5 text-xs hover:text-primary"
                    >
                      Demo
                      <SquareArrowOutUpRight size={16} />
                    </a>
                  )}
                  {prj.github_repo && (
                    <a
                      href={prj.github_repo}
                      target="_blank"
                      className="flex items-center gap-1.5 text-xs hover:text-primary"
                    >
                      Repo
                      <Github size={16} />
                    </a>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 text-xs font-medium">
                <p>{prj.description}</p>
              </div>
              <div>{prj.techStack && <p>Technologies: {prj.techStack}</p>}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProjectsPreview;
