const SkillsPreview = ({ resumeInfo }) => {
  return (
    <div className="flex flex-col gap-2 py-5">
      <h2
        className="text-center font-bold text-sm "
        style={{ color: resumeInfo?.themeColor ?? "#000" }}
      >
        Skills
      </h2>
      <hr
        className=""
        style={{ borderColor: resumeInfo?.themeColor ?? "#000" }}
      />

      {resumeInfo?.skills?.softSkills && (
        <p className="text-sm font-bold">Soft Skills</p>
      )}
      <div className="flex items-center flex-wrap gap-2">
        {resumeInfo?.skills?.softSkills &&
          resumeInfo?.skills?.softSkills.map((skill, index) => (
            <div
              key={index}
              className="flex gap-1 text-sm p-1 rounded-md text-white"
              style={{ backgroundColor: resumeInfo?.themeColor ?? "#000" }}
            >
              <h3 className="font-medium">{skill}</h3>
            </div>
          ))}
      </div>

      {resumeInfo?.skills?.technicalSkills && (
        <p className="text-sm font-bold">Technical Skills</p>
      )}
      <div className="flex items-center flex-wrap gap-2">
        {resumeInfo?.skills?.technicalSkills &&
          resumeInfo?.skills?.technicalSkills.map((skill, index) => (
            <div
              key={index}
              className="flex gap-1 text-sm p-1 rounded-md text-white"
              style={{ backgroundColor: resumeInfo?.themeColor ?? "#000" }}
            >
              <h3 className="font-medium">{skill}</h3>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SkillsPreview;
