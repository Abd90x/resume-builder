/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import FormSkeleton from "../Skeletons/FormSkeleton";
import PreviewSkeleton from "../Skeletons/PreviewSkeleton";
import ResumeSkeleton from "../Skeletons/ResumeSkeleton";
import { Button } from "../ui/button";

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
    return (
      <div className="flex flex-col gap-4 items-center justify-center">
        <h3>We&apos;re sorry, something went wrong</h3>
        <p className="bg-slate-200 min-w-60 text-center p-6 rounded-md">
          {error}
        </p>
        <Button>
          <Link to="/">Go back to home</Link>
        </Button>
      </div>
    );
  }

  return <>{children}</>;
};

export default Loading;
