export default function ProductSkeleton() {
  return (
    <div className="card bg-base-200 shadow animate-pulse p-4 rounded-xl">
      <div className="skeleton h-40 w-full rounded-lg"></div>

      <div className="mt-4 space-y-2">
        <div className="skeleton h-4 w-3/4"></div>
        <div className="skeleton h-4 w-1/2"></div>
        <div className="skeleton h-10 w-24 mt-3"></div>
      </div>
    </div>
  );
}
