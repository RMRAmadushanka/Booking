/**
 * Shown while server fetches vehicles + review counts (streaming).
 * Keeps layout stable and gives immediate feedback.
 */
export default function VehiclesLoading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <div className="bg-white border-b border-[#E5E7EB] sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-8 w-48 bg-[#E5E7EB] rounded" />
              <div className="h-4 w-28 bg-[#E5E7EB] rounded mt-2" />
            </div>
            <div className="h-10 w-24 bg-[#E5E7EB] rounded lg:hidden" />
          </div>
        </div>
      </div>
      <div className="flex">
        <aside className="hidden lg:block w-80 flex-shrink-0 p-4 space-y-4">
          <div className="h-6 w-24 bg-[#E5E7EB] rounded" />
          <div className="h-10 w-full bg-[#E5E7EB] rounded" />
          <div className="h-10 w-full bg-[#E5E7EB] rounded" />
          <div className="h-10 w-full bg-[#E5E7EB] rounded" />
        </aside>
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-[var(--radius-md)] overflow-hidden shadow-sm border border-slate-200"
              >
                <div className="h-64 bg-slate-200" />
                <div className="p-5">
                  <div className="h-6 bg-slate-200 rounded w-3/4 mb-3" />
                  <div className="h-4 bg-slate-200 rounded w-full mb-2" />
                  <div className="h-4 bg-slate-200 rounded w-2/3 mb-4" />
                  <div className="flex gap-4 mb-4">
                    <div className="h-5 bg-slate-200 rounded w-20" />
                    <div className="h-5 bg-slate-200 rounded w-16" />
                  </div>
                  <div className="h-4 bg-slate-200 rounded w-32 mb-4" />
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <div className="h-8 bg-slate-200 rounded w-24" />
                    <div className="h-10 bg-slate-200 rounded w-28" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
