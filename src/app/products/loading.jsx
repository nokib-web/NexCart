import ProductSkeleton from "@/components/ProductSkeleton";


export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
