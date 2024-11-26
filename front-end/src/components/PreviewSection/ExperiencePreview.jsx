const ExperiencePreview = ({ resumeInfo }) => {
  return (
    <div className="flex flex-col gap-2 py-3">
      <h2
        className="text-center font-bold text-sm "
        style={{ color: resumeInfo?.themeColor }}
      >
        Professional Experience
      </h2>
      <hr className="" style={{ borderColor: resumeInfo?.themeColor }} />
      <div className="flex flex-col gap-4">
        {resumeInfo?.experience &&
          resumeInfo?.experience.map((exp, index) => (
            <div key={index} className="flex flex-col gap-1 text-sm">
              <div className="flex items-center gap-2 font-bold text-sm">
                <h3>{exp.title} |</h3>
                <h3>{exp.companyName}</h3>
              </div>
              <div className="flex items-center justify-between gap-2 text-xs font-medium">
                <span>
                  {exp?.state} - {exp?.city}
                </span>
                <span>
                  {exp?.startDate} - {exp?.endDate ? exp?.endDate : "Present"}
                </span>
              </div>
              <div dangerouslySetInnerHTML={{ __html: exp.workSummery }} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ExperiencePreview;
