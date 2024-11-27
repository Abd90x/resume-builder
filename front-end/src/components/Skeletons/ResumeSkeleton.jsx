import { Skeleton } from "../ui/skeleton";

const ResumeSkeleton = () => {
  const arr = Array.from({ length: 5 }, (_, index) => index + 1);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {arr.map((item) => (
        <Skeleton
          className="w-full p-14 py-24 bg-secondary rounded-lg h-72"
          key={item}
        />
      ))}
    </div>
  );
};

export default ResumeSkeleton;
