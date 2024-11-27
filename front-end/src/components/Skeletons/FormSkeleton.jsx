import { Skeleton } from "../ui/skeleton";

const FormSkeleton = () => {
  return (
    <div className="grid grid-cols-2 mt-5 gap-3">
      <Skeleton className="w-full h-12" />

      <Skeleton className="w-full h-12" />

      <Skeleton className="w-full h-12 col-span-2" />

      <Skeleton className="w-full h-12 col-span-2" />

      <Skeleton className="w-full h-12" />

      <Skeleton className="w-full h-12" />

      <Skeleton className="w-full h-12" />

      <Skeleton className="w-full h-12" />

      <div className="col-span-2 ms-auto">
        <Skeleton className="w-24 h-12" />
      </div>
    </div>
  );
};

export default FormSkeleton;
