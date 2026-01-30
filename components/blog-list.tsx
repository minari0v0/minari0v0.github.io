"use client"

import { useState } from "react"
import LoadingLink from "@/components/loading-link"
import Image from "next/image"
import { CategoryFilter } from "@/components/category-filter"

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: Date
  image?: string
  category?: string
}

interface BlogListProps {
  posts: BlogPost[]
  categories: string[]
  counts: Record<string, number>
}

export function BlogList({ posts, categories, counts }: BlogListProps) {
  const [activeCategory, setActiveCategory] = useState("전체")

  const filteredPosts = activeCategory === "전체"
    ? posts
    : posts.filter((post) => (post.category || "General") === activeCategory)

  return (
    <>
      <CategoryFilter 
        categories={categories} 
        activeCategory={activeCategory} 
        onSelect={setActiveCategory}
        counts={counts}
      />

      {/* [복구] 기존 그리드 간격 유지 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <LoadingLink key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
            {/* [복구] '카드 UI' 스타일 (하얀 박스 + 테두리 + 그림자) 완벽 복원 */}
            <article className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 h-full flex flex-col">
              
              {/* 이미지 영역 (뱃지는 제거됨) */}
              <div className="relative aspect-video overflow-hidden bg-gray-50 border-b border-gray-50">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized 
                />
              </div>

              {/* 컨텐츠 영역 */}
              <div className="p-5 flex flex-col flex-1">
                {/* 제목 */}
                <h2 className="text-lg font-bold text-[#333333] group-hover:text-[#7c9070] transition-colors line-clamp-2 leading-tight mb-2">
                  {post.title}
                </h2>

                {/* 요약 */}
                <p className="text-sm text-gray-500 line-clamp-2 break-keep mb-4 flex-1">
                  {post.excerpt}
                </p>

                {/* [수정] 하단 정보: 날짜 · 카테고리 (루시드 드림 스타일) */}
                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-xs font-medium text-gray-400">
                  <time>
                    {new Date(post.date).toLocaleDateString("ko-KR", { 
                      year: "numeric", 
                      month: "long", 
                      day: "numeric" 
                    })}
                  </time>
                  
                  {/* 구분점 */}
                  <span className="mx-2 text-[10px] text-gray-300">●</span>
                  
                  {/* 카테고리 (강조색) */}
                  <span className="text-[#7c9070] font-bold">
                    {post.category || "General"}
                  </span>
                </div>
              </div>
            </article>
          </LoadingLink>
        ))}
      </div>
    </>
  )
}