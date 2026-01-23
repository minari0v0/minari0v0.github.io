import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar } from "lucide-react"
import { getBlogPost, getBlogPosts, getRelatedPosts } from "@/lib/mdx"
import { MDXRemote } from "next-mdx-remote/rsc"
import TableOfContents from "@/components/toc"
import { RelatedPosts } from "@/components/related-posts"
import { Comments } from "@/components/comments" // [NEW] 댓글 컴포넌트 추가

import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypePrettyCode from "rehype-pretty-code"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"

const prettyCodeOptions = {
  theme: "one-dark-pro",
  keepBackground: false,
  defaultLang: "plaintext",
}

export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) return { title: "Post Not Found" }

  return {
    title: `${post.title} | minari0v0`,
    description: post.excerpt,
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) notFound()

  // 연관 포스트 가져오기
  const relatedPosts = getRelatedPosts(slug, post.category)

  const dateDisplay = post.date instanceof Date 
    ? post.date.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })
    : post.date;

  return (
    <div className="relative max-w-[1100px] mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12">
        <article className="min-w-0">
          
          <header className="mb-10 border-b border-gray-100 pb-10">
            {/* 태그 (기존 유지) */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-sm font-bold text-white bg-[#7c9070] rounded-full shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* 제목 (기존 유지) */}
            <h1 className="text-4xl font-bold text-[#333333] mb-4 leading-tight break-keep">
              {post.title}
            </h1>
            
            {/* [수정] 날짜 옆에 카테고리 추가 */}
            <div className="flex items-center text-gray-500 font-medium mt-4">
              <Calendar className="mr-2 h-5 w-5 text-[#7c9070]" />
              <span>{dateDisplay}</span>
              
              {/* 구분점 */}
              <span className="mx-3 text-gray-300">·</span>
              
              {/* 카테고리 */}
              <span className="text-[#7c9070] font-bold">
                {post.category || "General"}
              </span>
            </div>
          </header>
          
          {/* 본문 영역 */}
          <div className="prose prose-lg max-w-none prose-headings:scroll-mt-24 prose-img:rounded-xl">
             <MDXRemote 
               source={post.content} 
               options={{
                 mdxOptions: {
                   remarkPlugins: [remarkGfm, remarkMath], 
                   rehypePlugins: [
                     rehypeSlug,
                     rehypeKatex, 
                     [rehypePrettyCode, prettyCodeOptions]
                   ],
                 },
               }}
             />
          </div>

          {/* 연관 글 섹션 */}
          <RelatedPosts category={post.category} posts={relatedPosts} />

          {/* [NEW] 댓글 기능 추가 */}
          <Comments />

          <div className="mt-10 flex justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 rounded-full bg-gray-50 text-gray-600 font-medium hover:bg-[#7c9070] hover:text-white transition-all duration-300"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              목록으로 돌아가기
            </Link>
          </div>

        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-32">
            <TableOfContents />
          </div>
        </aside>
      </div>
    </div>
  )
}