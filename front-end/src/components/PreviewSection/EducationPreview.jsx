const EducationPreview = ({ resumeInfo }) => {
  return (
    <div className="flex flex-col gap-2 py-3">
      <h2
        className="text-center font-bold text-sm "
        style={{ color: resumeInfo?.themeColor }}
      >
        Education
      </h2>
      <hr className="" style={{ borderColor: resumeInfo?.themeColor }} />
      <div className="flex flex-col gap-4">
        {resumeInfo?.education &&
          resumeInfo?.education.map((edu, index) => (
            <div key={index} className="flex flex-col gap-1 text-sm">
              <div className="flex items-center gap-2 font-bold text-sm">
                <h3>{edu.major} |</h3>
                <h3>{edu.degree}</h3>
              </div>
              <div className="flex items-center justify-between gap-2 text-xs font-medium">
                <span>{edu?.universityName}</span>
                <span>
                  {edu?.startDate} - {edu?.endDate ? edu?.endDate : "Present"}
                </span>
              </div>
              <p className="text-xs">{edu?.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EducationPreview;
