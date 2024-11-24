import { cn } from '@/app/lib/utils';
import { Skeleton } from '../ui/skeleton';
export default function SkeletonCard({
  length,
  className,
}: {
  length: number;
  className?: string;
}) {
  return (
    <section className={cn('px-5 py-9 -z-50', className)}>
      <div className="grid grid-cols-5 gap-x-4 gap-y-12 md:grid-cols-2 xs:grid-cols-1 justify-items-center">
        {Array.from({ length }).map(() => {
          return (
            <div key={crypto.randomUUID()} className="flex flex-col space-y-3">
              <Skeleton className="size-40 rounded-xl sm:size-60 lg:size-32 " />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
