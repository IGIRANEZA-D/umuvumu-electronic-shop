export default function ProductSkeleton() {
  return (
    <div className="flex flex-col rounded-xl border border-slate-100 bg-white p-4">
      {/* Image Skeleton */}
      <div className="relative aspect-square w-full animate-pulse rounded-lg bg-slate-100" />
      
      <div className="mt-4 space-y-3">
        {/* Brand/Rating row */}
        <div className="flex items-center justify-between">
          <div className="h-3 w-16 animate-pulse rounded bg-slate-100" />
          <div className="h-3 w-8 animate-pulse rounded bg-slate-100" />
        </div>
        
        {/* Title */}
        <div className="h-5 w-full animate-pulse rounded bg-slate-100" />
        
        {/* Price row */}
        <div className="pt-2">
          <div className="h-6 w-24 animate-pulse rounded bg-slate-100" />
        </div>
        
        {/* Button */}
        <div className="h-10 w-full animate-pulse rounded-lg bg-slate-50" />
      </div>
    </div>
  );
}