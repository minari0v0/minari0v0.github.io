// app/projects/[slug]/page.tsx

import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, Github, Globe, Calendar } from "lucide-react"
import { getProjectBySlug, getProjectPosts } from "@/lib/mdx" // Step 3에서 만든 함수
import { CompileMDX } from "@/lib/mdx-compile" // Step 6에서 만든 컴포넌트
import TableOfContents from "@/components/toc" // Step 4에서 만든 목차 컴포넌트

// 1. 정적 경로 생성 (빌드 시 모든 MDX 파일을 스캔해서 페이지를 미리 만듦)
export async function generateStaticParams() {
  const posts = getProjectPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

// 2. 메타데이터 생성 (탭 제목 등)
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { frontmatter } = getProjectBySlug(params.slug)
  if (!frontmatter) return { title: "Project Not Found" }

  return {
    title: `${frontmatter.title} | minari0v0`,
    description: frontmatter.description,
  }
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  // MDX 파일 데이터 가져오기
  const { slug } = params
  const { frontmatter, content } = getProjectBySlug(slug)

  if (!frontmatter) return notFound()

  return (
    <div className="min-h-screen bg-white pb-20">
      
      {/* ================= HEADER AREA ================= */}
      {/* Toran 스타일: 제목, 설명, 뱃지, 링크가 있는 깔끔한 상단부 */}
      <header className="bg-gray-50/50 border-b border-gray-100 pt-32 pb-16">
        <div className="max-w-[1100px] mx-auto px-6">
          {/* 뒤로가기 링크 */}
          <Link
            href="/projects"
            className="inline-flex items-center text-sm text-gray-500 hover:text-matcha-500 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
          
          {/* 프로젝트 제목 */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            {frontmatter.title}
          </h1>
          
          {/* 한 줄 요약 (Description) */}
          <p className="text-xl text-gray-600 mb-8 max-w-3xl leading-relaxed font-medium">
            {frontmatter.description}
          </p>

          {/* 메타 정보 (기술 스택, 링크) */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
             
             {/* 기술 스택 뱃지 */}
             <div className="flex flex-wrap gap-2">
                {frontmatter.tags && frontmatter.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600 font-medium shadow-sm">
                    {tag}
                  </span>
                ))}
             </div>

             {/* 구분선 (모바일엔 숨김) */}
             <div className="hidden md:block w-px h-6 bg-gray-300"></div>

             {/* 날짜 및 링크 버튼 */}
             <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="flex items-center text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  {frontmatter.date}
                </span>

                {frontmatter.github && (
                  <a href={frontmatter.github} target="_blank" className="flex items-center gap-2 text-gray-700 hover:text-matcha-600 font-bold transition-colors ml-4">
                    <Github className="w-5 h-5" /> GitHub
                  </a>
                )}
                {frontmatter.demo && (
                   <a href={frontmatter.demo} target="_blank" className="flex items-center gap-2 text-gray-700 hover:text-matcha-600 font-bold transition-colors ml-2">
                    <Globe className="w-5 h-5" /> Live Demo
                  </a>
                )}
             </div>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      {/* Toran 스타일: 좌측 본문(75%) + 우측 플로팅 목차(25%) */}
      <main className="max-w-[1100px] mx-auto px-6 py-12 flex gap-12 relative">
        
        {/* [Left] 본문 영역 (Prose) */}
        <article className="w-full lg:w-3/4 min-w-0">
           
           {/* 썸네일 이미지 (있으면 표시) */}
           {frontmatter.thumbnail && (
             <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 border border-gray-100 shadow-sm">
                <Image 
                  src={frontmatter.thumbnail} 
                  alt={frontmatter.title} 
                  fill 
                  className="object-cover" 
                  priority
                />
             </div>
           )}
           
           {/* MDX 내용 렌더링 (Typography 플러그인 적용) */}
           <div className="prose prose-lg prose-gray max-w-none 
             prose-headings:scroll-mt-28 
             prose-headings:font-bold prose-headings:text-gray-900
             prose-a:text-matcha-600 prose-a:no-underline hover:prose-a:underline
             prose-img:rounded-xl prose-img:shadow-md
             prose-pre:bg-[#282c34] prose-pre:text-gray-100"
           >
             <CompileMDX source={content} />
           </div>

           {/* 하단 네비게이션 (목록으로) */}
           <div className="mt-20 pt-10 border-t border-gray-100">
             <Link href="/projects" className="text-matcha-600 font-bold hover:underline">
               ← 다른 프로젝트 보러가기
             </Link>
           </div>
        </article>

        {/* [Right] 플로팅 목차 (TOC) - 데스크탑 전용 */}
        <aside className="hidden lg:block lg:w-1/4 relative">
           <div className="sticky top-32">
             <TableOfContents />
           </div>
        </aside>

      </main>
    </div>
  )
}