export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="skeleton h-96 w-full rounded-xl"></div>

      <div className="space-y-4">
        <div className="skeleton h-10 w-2/3"></div>
        <div className="skeleton h-6 w-full"></div>
        <div className="skeleton h-6 w-5/6"></div>
        <div className="skeleton h-14 w-40"></div>
      </div>
    </div>
  );
}
