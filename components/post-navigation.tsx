import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface PostNode {
  slug: string
  title: string
  category?: string // 블로그일 경우 카테고리 표시
}

interface PostNavigationProps {
  prevPost: PostNode | null
  nextPost: PostNode | null
  basePath: "projects" | "blog" // 링크 경로 생성용 (/projects/... or /blog/...)
}

export function PostNavigation({ prevPost, nextPost, basePath }: PostNavigationProps) {
  // 둘 다 없으면 렌더링 안 함
  if (!prevPost && !nextPost) return null

  return (
    <div className="mt-20 pt-10 border-t border-gray-100">
      {/* 카테고리 표시가 필요한 경우:
         블로그라면 "일상의 다른 글" 처럼 보여줄 수도 있지만,
         여기서는 심플하게 [이전 글] [다음 글] 카드로 보여줍니다.
      */}
      <h3 className="text-lg font-bold text-[#333333] mb-6">
        다른 글 더 보기
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. 이전 글 (과거) */}
        {prevPost ? (
          <Link
            href={`/${basePath}/${prevPost.slug}`}
            className="group flex flex-col p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-[#7c9070] hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center text-xs font-bold text-gray-400 mb-2 group-hover:text-[#7c9070]">
              <ArrowLeft className="w-3 h-3 mr-1" />
              이전 글
            </div>
            <span className="text-lg font-bold text-gray-700 group-hover:text-[#333333] line-clamp-1">
              {prevPost.title}
            </span>
          </Link>
        ) : (
          <div className="hidden md:block" /> // 빈 공간 채우기
        )}

        {/* 2. 다음 글 (최신) */}
        {nextPost ? (
          <Link
            href={`/${basePath}/${nextPost.slug}`}
            className="group flex flex-col items-end text-right p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-[#7c9070] hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center text-xs font-bold text-gray-400 mb-2 group-hover:text-[#7c9070]">
              다음 글
              <ArrowRight className="w-3 h-3 ml-1" />
            </div>
            <span className="text-lg font-bold text-gray-700 group-hover:text-[#333333] line-clamp-1">
              {nextPost.title}
            </span>
          </Link>
        ) : (
          <div className="hidden md:block" />
        )}
      </div>
    </div>
  )
}