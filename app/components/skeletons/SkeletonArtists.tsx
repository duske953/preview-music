import { cn } from '@/app/lib/utils';
import { Skeleton } from '../ui/skeleton';

export default function SkeletonArtist({
  length = 1,
  size,
}: {
  length: number;
  size?: string;
}) {
  {
    return Array.from({ length }).map(() => (
      <div
        key={crypto.randomUUID()}
        className="flex flex-col items-center gap-3"
      >
        <Skeleton className={cn('size-16 rounded-full', size)} />
        <Skeleton className="w-32 h-4" />
      </div>
    ));
  }
}
