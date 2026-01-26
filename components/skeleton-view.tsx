// components/skeleton-view.tsx
export default function SkeletonView() {
  return (
    <div className="w-full min-h-screen bg-white">
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .skeleton-shimmer {
          position: relative;
          overflow: hidden;
          background-color: #f3f4f6;
        }
        .skeleton-shimmer::after {
          position: absolute;
          top: 0; right: 0; bottom: 0; left: 0;
          transform: translateX(-100%);
          background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0,
            rgba(255, 255, 255, 0.2) 20%,
            rgba(255, 255, 255, 0.5) 60%,
            rgba(255, 255, 255, 0)
          );
          animation: shimmer 1.5s infinite;
          content: '';
        }
      `}</style>

      {/* 레이아웃 구조 */}
      <div className="max-w-[1100px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12">
          
          <div className="min-w-0">
            <div className="mb-10 border-b border-gray-100 pb-10 space-y-6">
              <div className="flex gap-2">
                <div className="h-8 w-16 rounded-full skeleton-shimmer" />
                <div className="h-8 w-20 rounded-full skeleton-shimmer" />
              </div>
              <div className="space-y-3">
                <div className="h-10 w-3/4 rounded-lg skeleton-shimmer" />
                <div className="h-10 w-1/2 rounded-lg skeleton-shimmer" />
              </div>
              <div className="h-6 w-48 rounded skeleton-shimmer" />
            </div>

            <div className="space-y-4">
              <div className="h-4 w-full rounded skeleton-shimmer" />
              <div className="h-4 w-full rounded skeleton-shimmer" />
              <div className="h-4 w-5/6 rounded skeleton-shimmer" />
              <div className="h-64 w-full rounded-2xl skeleton-shimmer my-8" />
              <div className="h-4 w-11/12 rounded skeleton-shimmer" />
              <div className="h-4 w-full rounded skeleton-shimmer" />
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-4">
              <div className="h-6 w-32 rounded skeleton-shimmer mb-6" />
              <div className="space-y-3 border-l-2 border-gray-100 pl-4">
                <div className="h-4 w-3/4 rounded skeleton-shimmer" />
                <div className="h-4 w-full rounded skeleton-shimmer" />
                <div className="h-4 w-2/3 rounded skeleton-shimmer" />
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  )
}