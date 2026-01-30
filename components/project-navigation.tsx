import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface ProjectNode {
  slug: string
  title: string
}

interface ProjectNavigationProps {
  prevProject: ProjectNode | null
  nextProject: ProjectNode | null
}

export function ProjectNavigation({ prevProject, nextProject }: ProjectNavigationProps) {
  // 둘 다 없으면 섹션 자체를 렌더링하지 않음
  if (!prevProject && !nextProject) return null

  return (
    <div className="mt-20 pt-10 border-t border-gray-100">
      <h3 className="text-lg font-bold text-[#333333] mb-6">다른 프로젝트 둘러보기</h3>
      
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        {/* 1. 이전 프로젝트 (더 과거) */}
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.slug}`}
            className="flex-1 group flex items-center p-5 rounded-xl border border-gray-100 bg-white hover:border-[#7c9070] hover:shadow-md transition-all duration-300"
          >
            <div className="mr-4 bg-gray-50 p-2 rounded-lg group-hover:bg-[#7c9070]/10 transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-[#7c9070]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-400 mb-1 group-hover:text-[#7c9070]">이전 프로젝트</span>
              <span className="font-bold text-[#333333] group-hover:text-[#7c9070] line-clamp-1">
                {prevProject.title}
              </span>
            </div>
          </Link>
        ) : (
          <div className="flex-1 hidden md:block" /> // 빈 공간 채우기 (레이아웃 유지용)
        )}

        {/* 2. 다음 프로젝트 (더 최신) */}
        {nextProject ? (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="flex-1 group flex items-center justify-end text-right p-5 rounded-xl border border-gray-100 bg-white hover:border-[#7c9070] hover:shadow-md transition-all duration-300"
          >
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-gray-400 mb-1 group-hover:text-[#7c9070]">다음 프로젝트</span>
              <span className="font-bold text-[#333333] group-hover:text-[#7c9070] line-clamp-1">
                {nextProject.title}
              </span>
            </div>
            <div className="ml-4 bg-gray-50 p-2 rounded-lg group-hover:bg-[#7c9070]/10 transition-colors">
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#7c9070]" />
            </div>
          </Link>
        ) : (
          <div className="flex-1 hidden md:block" />
        )}
      </div>
    </div>
  )
}