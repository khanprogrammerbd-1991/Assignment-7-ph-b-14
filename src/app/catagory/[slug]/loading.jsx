// src/app/category/[slug]/loading.jsx
export default function CategoryLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 animate-pulse space-y-8">
      {/* Header skeleton */}
      <div className="bg-white rounded-2xl border border-[#E5E2DC] p-6 h-28" />

      {/* Product grid skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-[#E5E2DC] p-5 h-44 flex flex-col justify-between"
          >
            <div className="flex justify-between">
              <div className="w-12 h-12 bg-[#E5E2DC] rounded-xl" />
              <div className="w-16 h-6 bg-[#E5E2DC] rounded-full" />
            </div>
            <div className="space-y-2">
              <div className="h-5 w-32 bg-[#E5E2DC] rounded" />
              <div className="h-4 w-20 bg-[#E5E2DC] rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}