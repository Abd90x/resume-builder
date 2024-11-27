import { Skeleton } from "../ui/skeleton";

const PreviewSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col gap-3">
        <Skeleton className="w-full h-12 mx-auto" />
        <div className="flex justify-between items-center font-normal text-xs">
          <Skeleton className="w-24 h-6 mx-auto" />
          <Skeleton className="w-24 h-6 mx-auto" />

          <Skeleton className="w-24 h-6 mx-auto" />

          <Skeleton className="w-24 h-6 mx-auto" />
        </div>
        <hr />
        <Skeleton className="w-full h-44 mx-auto" />
        <Skeleton className="w-full h-44 mx-auto" />
        <Skeleton className="w-full h-44 mx-auto" />
      </div>
    </div>
  );
};

export default PreviewSkeleton;
