const SummeryPreview = ({ resumeInfo }) => {
  return (
    <div>
      <p className="text-xs">{resumeInfo?.summary}</p>
    </div>
  );
};

export default SummeryPreview;