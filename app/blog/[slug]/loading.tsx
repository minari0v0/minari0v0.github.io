export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* [스타일 정의] 
        빛이 지나가는 애니메이션 (shimmer) 
        사용자님이 주신 CSS Gradient 아이디어를 Tailwind 커스텀 유틸리티로 구현
      */}
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        .skeleton-shimmer {
          position: relative;
          overflow: hidden;
          background-color: #f3f4f6; /* bg-gray-100 */
        }
        .skeleton-shimmer::after {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          transform: translateX(-100%);
          background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0,
            rgba(255, 255, 255, 0.2) 20%,
            rgba(255, 255, 255, 0.5) 60%,
            rgba(255, 255, 255, 0)
          );
          animation: shimmer 2s infinite;
          content: '';
        }
      `}</style>

      {/* [레이아웃 구조] 
        blog_slug_page.tsx, project_slugpage.tsx와 동일한 레이아웃 적용 
        (max-w-[1100px], grid layout)
      */}
      <div className="max-w-[1100px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12">
          
          {/* [왼쪽] 메인 컨텐츠 영역 */}
          <div className="min-w-0">
            
            {/* 1. 헤더 스켈레톤 (태그, 제목, 날짜) */}
            <div className="mb-10 border-b border-gray-100 pb-10 space-y-6">
              {/* 태그 뱃지 */}
              <div className="flex gap-2">
                <div className="h-8 w-16 rounded-full skeleton-shimmer" />
                <div className="h-8 w-20 rounded-full skeleton-shimmer" />
              </div>
              
              {/* 제목 (긴 막대) */}
              <div className="space-y-3">
                <div className="h-10 w-3/4 rounded-lg skeleton-shimmer" />
                <div className="h-10 w-1/2 rounded-lg skeleton-shimmer" />
              </div>

              {/* 날짜 및 정보 */}
              <div className="h-6 w-48 rounded skeleton-shimmer" />
            </div>

            {/* 2. 본문 스켈레톤 (줄글 막대) */}
            <div className="space-y-4">
              <div className="h-4 w-full rounded skeleton-shimmer" />
              <div className="h-4 w-full rounded skeleton-shimmer" />
              <div className="h-4 w-5/6 rounded skeleton-shimmer" />
              <div className="h-4 w-full rounded skeleton-shimmer" />
              
              {/* 중간 이미지 박스 느낌 */}
              <div className="h-64 w-full rounded-2xl skeleton-shimmer my-8" />
              
              <div className="h-4 w-11/12 rounded skeleton-shimmer" />
              <div className="h-4 w-full rounded skeleton-shimmer" />
              <div className="h-4 w-4/5 rounded skeleton-shimmer" />
            </div>
          </div>

          {/* [오른쪽] 사이드바 (TOC) 영역 */}
          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-4">
              <div className="h-6 w-32 rounded skeleton-shimmer mb-6" /> {/* 목차 제목 */}
              <div className="space-y-3 border-l-2 border-gray-100 pl-4">
                <div className="h-4 w-3/4 rounded skeleton-shimmer" />
                <div className="h-4 w-full rounded skeleton-shimmer" />
                <div className="h-4 w-2/3 rounded skeleton-shimmer" />
                <div className="h-4 w-5/6 rounded skeleton-shimmer" />
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  )
}