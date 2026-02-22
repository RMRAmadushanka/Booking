/**
 * Shown while server fetches packages + review counts (streaming).
 * Keeps layout stable and gives immediate feedback.
 */
export default function PackagesLoading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <div className="bg-white border-b border-[#E5E7EB] sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-8 w-64 bg-[#E5E7EB] rounded" />
              <div className="h-4 w-32 bg-[#E5E7EB] rounded mt-2" />
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
                className="bg-white rounded-[var(--radius)] overflow-hidden shadow-sm border border-[#E5E7EB]"
              >
                <div className="h-64 bg-[#E5E7EB]" />
                <div className="p-5">
                  <div className="h-6 bg-[#E5E7EB] rounded mb-2 w-3/4" />
                  <div className="h-4 bg-[#E5E7EB] rounded mb-1 w-full" />
                  <div className="h-4 bg-[#E5E7EB] rounded mb-4 w-5/6" />
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 bg-[#E5E7EB] rounded w-20" />
                    <div className="h-6 bg-[#E5E7EB] rounded w-24" />
                  </div>
                  <div className="h-4 bg-[#E5E7EB] rounded mb-4 w-32" />
                  <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
                    <div className="h-8 bg-[#E5E7EB] rounded w-24" />
                    <div className="h-9 bg-[#E5E7EB] rounded w-24" />
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
