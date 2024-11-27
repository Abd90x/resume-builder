/* eslint-disable react/prop-types */

import FormSkeleton from "../Skeletons/FormSkeleton";
import PreviewSkeleton from "../Skeletons/PreviewSkeleton";
import ResumeSkeleton from "../Skeletons/ResumeSkeleton";

const skeletonsTypes = {
  form: FormSkeleton,
  resume: ResumeSkeleton,
  preview: PreviewSkeleton,
};

const Loading = ({ children, loading, error, type }) => {
  const Component = skeletonsTypes[type];

  if (loading === "pending") {
    return <Component />;
  }

  if (loading === "failed") {
    return <div>Error: {error}</div>;
  }

  return <>{children}</>;
};

export default Loading;
