import { Skeleton } from '@/components/ui/Skeleton'

export function TrackRowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-4 py-3">
      <Skeleton className="h-4 w-5 shrink-0" />
      <Skeleton className="h-10 w-10 shrink-0 rounded" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3.5 w-2/5" />
        <Skeleton className="h-3 w-1/4" />
      </div>
      <Skeleton className="h-3 w-12" />
    </div>
  )
}
