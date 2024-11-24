import { Skeleton } from '../ui/skeleton';

export default function SkeletonMusicItem({ length = 5 }: { length?: number }) {
  return (
    <section className="flex flex-col gap-8">
      {Array.from({ length }).map(() => {
        return (
          <div key={crypto.randomUUID()} className="flex items-center gap-6">
            <div>
              <Skeleton className="size-10 rounded-full" />
            </div>

            <div className="flex flex-col gap-2">
              <Skeleton className="h-3 w-56" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        );
      })}
    </section>
  );
}
