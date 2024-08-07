import { CustomSkeleton } from "@kochanet_pas/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex h-full w-full flex-1 flex-col gap-2 overflow-y-auto py-2">
      <CustomSkeleton variant={2} />
    </div>
  );
};

export default Loading;
