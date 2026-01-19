import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar } from "lucide-react"
import { getBlogPost, getBlogPosts } from "@/lib/mdx"
import { MDXRemote } from "next-mdx-remote/rsc"
import TableOfContents from "@/components/toc"

// 정적 경로 생성
export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

// 메타데이터 생성 (Next.js 15: params는 Promise입니다)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params // [수정] await로 기다림
  const post = await getBlogPost(slug)
  
  if (!post) return { title: "Post Not Found" }

  return {
    title: `${post.title} | minari0v0`,
    description: post.excerpt,
  }
}

// 상세 페이지 컴포넌트 (Next.js 15: params는 Promise입니다)
export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params // [수정] await로 기다림
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const dateDisplay = post.date instanceof Date 
    ? post.date.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })
    : post.date;

  return (
    <div className="relative max-w-[1100px] mx-auto px-6">
      {/* 1. 상단 네비게이션 */}
      <div className="pt-8 pb-6">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#7c9070] transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          목록으로 돌아가기
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12">
        <article className="min-w-0">
          {/* 헤더 섹션 */}
          <header className="mb-10 border-b border-gray-100 pb-10">
            {/* 태그 표시 */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-sm font-semibold text-white bg-[#7c9070] rounded-full shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl font-bold text-[#333333] mb-4 leading-tight break-keep">
              {post.title}
            </h1>
            
            <div className="flex items-center text-gray-500 font-medium mt-4">
              <Calendar className="mr-2 h-5 w-5 text-[#7c9070]" />
              {dateDisplay}
            </div>
          </header>

          {/* 본문 컨텐츠 (MDX) */}
          <div className="prose prose-lg max-w-none prose-headings:scroll-mt-24 prose-img:rounded-xl">
             <MDXRemote source={post.content} />
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