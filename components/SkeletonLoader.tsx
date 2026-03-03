import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function SC({
  children,
  checker,
  className,
  // key,
  skeley,
}: Readonly<{
  children: React.ReactNode;
  checker: any;
  skeley?: string;
  key?: any;
  className?: string;
}>) {
  return (
    <div className={className}>
      {checker ? (
        children
      ) : (
        <Skeleton  highlightColor="#19ac6350" className={skeley} />
      )}
    </div>
  );
}
