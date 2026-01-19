import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, Github, Globe, Calendar } from "lucide-react"
import { getProjectBySlug, getProjectPosts } from "@/lib/mdx"
import { CompileMDX } from "@/lib/mdx-compile"
import TableOfContents from "@/components/toc"
import localFont from "next/font/local" // [NEW] 폰트 로더

// [NEW] Paperlogy Medium 폰트 로드 (제목, 본문용)
const paperlogyMedium = localFont({
  src: "../../../public/fonts/Paperlogy-5Medium.ttf",
  display: "swap",
})

// 1. 정적 경로 생성
export async function generateStaticParams() {
  const posts = getProjectPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

// 2. 메타데이터 생성
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const { frontmatter } = getProjectBySlug(slug)
  if (!frontmatter) return { title: "Project Not Found" }

  return {
    title: `${frontmatter.title} | minari0v0`,
    description: frontmatter.description,
  }
}

// 3. 페이지 컴포넌트
export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // getProjectBySlug는 { frontmatter, content }를 반환한다고 가정합니다 (업로드된 파일 기준)
  const { frontmatter, content } = getProjectBySlug(slug)

  if (!frontmatter) notFound()

  const dateDisplay = frontmatter.date instanceof Date 
    ? frontmatter.date.toLocaleDateString("ko-KR") 
    : frontmatter.date;

  return (
    <div className="relative max-w-[1100px] mx-auto px-6">
      {/* 상단 네비게이션 (기존 Regular 폰트) */}
      <div className="pt-8 pb-6">
        <Link
          href="/projects"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#7c9070] transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          목록으로 돌아가기
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12">
        <article className="min-w-0">
          <header className="mb-10 border-b border-gray-100 pb-10">
            {/* 태그 (기존 Regular 폰트) */}
            <div className="flex flex-wrap gap-2 mb-6">
              {frontmatter.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-sm font-semibold text-white bg-[#7c9070] rounded-full shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* [NEW] 제목: Medium 폰트 적용 */}
            <h1 className={`text-4xl font-bold text-[#333333] mb-4 leading-tight ${paperlogyMedium.className}`}>
              {frontmatter.title}
            </h1>
            
            {/* 설명 (기존 Regular 폰트) */}
            <p className="text-xl text-gray-500 font-medium mb-6 leading-relaxed">
              {frontmatter.description}
            </p>

            {/* 날짜 및 버튼들 (기존 Regular 폰트) */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-t border-gray-100 pt-6">
              <div className="flex items-center font-medium">
                <Calendar className="mr-2 h-5 w-5 text-[#7c9070]" />
                {dateDisplay}
              </div>

              <div className="flex items-center gap-3 ml-auto sm:ml-0">
                {frontmatter.github && (
                  <a
                    href={frontmatter.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-700 transition-all hover:scale-105 active:scale-95"
                  >
                    <Github className="mr-2 h-5 w-5" />
                    GitHub
                  </a>
                )}
                {frontmatter.demo && (
                  <a
                    href={frontmatter.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 font-medium hover:border-[#7c9070] hover:text-[#7c9070] transition-all hover:scale-105 active:scale-95"
                  >
                    <Globe className="mr-2 h-5 w-5" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </header>

          {/* 썸네일 */}
          {frontmatter.thumbnail && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 shadow-lg bg-gray-100">
               <Image 
                 src={frontmatter.thumbnail} 
                 alt={frontmatter.title} 
                 fill 
                 className="object-cover"
                 priority
               />
            </div>
          )}

          {/* [NEW] 본문: Medium 폰트 적용 */}
          <div className={`prose prose-lg max-w-none prose-headings:scroll-mt-24 prose-img:rounded-xl ${paperlogyMedium.className}`}>
             {/* 업로드하신 파일이 CompileMDX를 사용하므로 유지합니다 */}
             <CompileMDX source={content} />
          </div>
        </article>

        {/* 우측 TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-32">
            <TableOfContents />
          </div>
        </aside>
      </div>
    </div>
  )
}