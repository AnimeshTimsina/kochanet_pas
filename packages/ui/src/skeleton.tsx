import { cn } from ".";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

interface IProps {
  variant: 1 | 2;
}

const CustomSkeleton: React.FC<IProps> = (props) => {
  const bgClass = props.variant === 1 ? "bg-white dark:bg-muted" : "";
  return (
    <>
      <div className="flex items-center space-x-4">
        <Skeleton className={`h-16 w-16 rounded-full ${bgClass}`} />
        <div className="w-full space-y-2">
          <Skeleton className={`h-4 w-[250px] ${bgClass}`} />
          <Skeleton className={`h-4 w-[200px] ${bgClass}`} />
          <Skeleton className={`h-4 w-full ${bgClass}`} />
          <Skeleton className={`h-4 w-full ${bgClass}`} />
        </div>
      </div>
      <div className="mt-2 flex flex-col space-y-2">
        <Skeleton className={`h-4 w-full ${bgClass}`} />
        <Skeleton className={`h-4 w-full ${bgClass}`} />
      </div>
    </>
  );
};

export { CustomSkeleton };
