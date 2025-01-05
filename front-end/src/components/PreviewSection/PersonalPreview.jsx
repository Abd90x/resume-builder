/* eslint-disable react/prop-types */
import { Github, Linkedin } from "lucide-react";

const PersonalPreview = ({ resumeInfo }) => {
  return (
    <div className="flex flex-col gap-1">
      <h2
        className="font-bold text-xl text-center"
        style={{ color: resumeInfo?.themeColor }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      <h3 className="text-center text-sm font-medium">
        {resumeInfo?.jobTitle}
      </h3>
      <h4 className="text-center font-normal text-xs">{resumeInfo?.address}</h4>

      <div className="flex justify-between items-center font-normal text-xs">
        <span>{resumeInfo?.phone}</span>

        {resumeInfo?.linkedin && (
          <a
            href={"https://www.linkedin.com/in/" + resumeInfo?.linkedin}
            className="flex items-center gap-2"
            target="_blank"
          >
            <Linkedin size={18} />
            {resumeInfo?.linkedin}
          </a>
        )}

        {resumeInfo?.github && (
          <a
            href={"https://github.com/" + resumeInfo?.github}
            className="flex items-center gap-2"
            target="_blank"
          >
            <Github size={18} />
            {resumeInfo?.github}
          </a>
        )}

        <span>{resumeInfo?.email}</span>
      </div>

      <hr className="my-1" style={{ borderColor: resumeInfo?.themeColor }} />
    </div>
  );
};

export default PersonalPreview;
