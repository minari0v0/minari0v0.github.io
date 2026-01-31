"use client"

import { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { ProjectCard } from "@/components/project-card"

// 날짜 포맷팅 유틸리티
const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).replace(/\.$/, "")
}

interface SearchClientProps {
  initialProjects: any[]
  initialPosts: any[]
}

function SearchContent({ initialProjects, initialPosts }: SearchClientProps) {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || "" // URL에서 검색어 가져옴
  
  // [NEW] 로딩 상태 및 결과 상태 관리
  const [isSearching, setIsSearching] = useState(true)
  const [results, setResults] = useState<{ projects: any[], posts: any[] }>({ projects: [], posts: [] })

  // [NEW] 검색어가 바뀔 때마다 '가짜 딜레이' 후 결과 업데이트
  useEffect(() => {
    setIsSearching(true) // 로딩 시작

    const timer = setTimeout(() => {
      // 1. 검색 로직 실행
      const trimmedQuery = query.trim().toLowerCase()
      
      if (!trimmedQuery) {
        setResults({ projects: [], posts: [] })
      } else {
        const matchingProjects = initialProjects.filter((p) =>
          p.title.toLowerCase().includes(trimmedQuery) ||
          p.description.toLowerCase().includes(trimmedQuery) ||
          p.tags?.some((t: string) => t.toLowerCase().includes(trimmedQuery))
        )

        const matchingPosts = initialPosts.filter((p) =>
          p.title.toLowerCase().includes(trimmedQuery) ||
          p.excerpt.toLowerCase().includes(trimmedQuery) ||
          p.tags?.some((t: string) => t.toLowerCase().includes(trimmedQuery))
        )
        
        setResults({ projects: matchingProjects, posts: matchingPosts })
      }

      setIsSearching(false) // 로딩 끝
    }, 600) // 0.6초 딜레이 (원하는 만큼 조절 가능)

    return () => clearTimeout(timer)
  }, [query, initialProjects, initialPosts])

  const hasResults = results.projects.length > 0 || results.posts.length > 0
  const isQueryEmpty = query.trim().length === 0

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-12 min-h-[80vh]">
      
      {/* 1. 검색 결과 헤더 (검색창 제거됨) */}
      {!isQueryEmpty && (
        <h1 className="text-3xl font-bold mb-10 text-center md:text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
          <span className="text-[#333333]">&apos;{query}&apos;</span>{" "}
          <span className="text-gray-300">검색 결과</span>
        </h1>
      )}

      {/* 2. 로딩 중일 때 (스켈레톤 UI 보여줌) */}
      {isSearching ? (
        <div className="space-y-16">
          <SkeletonSection />
        </div>
      ) : (
        /* 3. 로딩 끝난 후 결과 렌더링 */
        !isQueryEmpty ? (
          hasResults ? (
            <div className="space-y-16 animate-in fade-in duration-500">
              
              {/* 프로젝트 섹션 */}
              {results.projects.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-gray-800 mb-6 border-l-4 border-[#7c9070] pl-3">
                    프로젝트 <span className="text-[#7c9070] ml-1">{results.projects.length}</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.projects.map((project) => (
                      <ProjectCard
                        key={project.slug}
                        id={project.slug}
                        title={project.title}
                        description={project.description}
                        image={project.thumbnail}
                        startDate={project.startDate}
                        endDate={project.endDate}
                        tags={project.tags}
                        contribution={project.contribution}
                        href={`/projects/${project.slug}`}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* 스토리 섹션 */}
              {results.posts.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-gray-800 mb-6 border-l-4 border-[#7c9070] pl-3">
                    스토리 <span className="text-[#7c9070] ml-1">{results.posts.length}</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.posts.map((post) => (
                      <ProjectCard
                        key={post.slug}
                        id={post.slug}
                        title={post.title}
                        description={post.excerpt}
                        image={post.image}
                        startDate=""
                        tags={post.tags}
                        href={`/blog/${post.slug}`}
                        displayDate={formatDate(post.date)}
                      />
                    ))}
                  </div>
                </section>
              )}
            </div>
          ) : (
            /* 결과 없음 */
            <NoResultsState />
          )
        ) : (
          /* 초기 상태 (검색어 없을 때) */
          <div className="text-center py-32 opacity-50">
            <p className="text-xl text-gray-400">상단 검색창을 이용해 포트폴리오를 탐색해보세요.</p>
          </div>
        )
      )}
    </div>
  )
}

// [NEW] 로딩 중일 때 보여줄 스켈레톤 UI (깜빡거리는 박스들)
function SkeletonSection() {
  return (
    <section>
      {/* 제목 스켈레톤 */}
      <div className="h-8 w-32 bg-gray-200 rounded-md mb-6 animate-pulse" />
      
      {/* 카드 그리드 스켈레톤 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[380px] bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="h-48 bg-gray-200 animate-pulse" /> {/* 이미지 영역 */}
            <div className="p-5 space-y-3">
              <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" /> {/* 제목 */}
              <div className="h-4 w-full bg-gray-100 rounded animate-pulse" /> {/* 설명 1 */}
              <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" /> {/* 설명 2 */}
              <div className="pt-4 flex gap-2">
                <div className="h-6 w-12 bg-gray-100 rounded animate-pulse" /> {/* 태그 */}
                <div className="h-6 w-12 bg-gray-100 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function NoResultsState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-in zoom-in-95 duration-300">
      <div className="relative w-40 h-40 mb-6">
        <Image
          src="/not_searched.webp" 
          alt="검색 결과 없음"
          fill
          className="object-contain grayscale opacity-60" 
        />
      </div>
      <div className="space-y-1">
        <p className="text-gray-400 text-lg">
          검색어와 연관된 내용을 열심히 찾아봤지만,
        </p>
        <p className="text-gray-400 text-lg">
          일치하는 결과를 찾지 못했어요 ㅠㅠ
        </p>
      </div>
    </div>
  )
}

export default function SearchClient(props: SearchClientProps) {
  return (
    <Suspense fallback={<div className="py-20 text-center">로딩 중...</div>}>
      <SearchContent {...props} />
    </Suspense>
  )
}