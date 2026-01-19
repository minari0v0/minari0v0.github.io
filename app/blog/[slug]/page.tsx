import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar } from "lucide-react"
import { getBlogPost, getBlogPosts } from "@/lib/mdx"
import { MDXRemote } from "next-mdx-remote/rsc"
import TableOfContents from "@/components/toc"

// 플러그인
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypePrettyCode from "rehype-pretty-code"

// [삭제] localFont 제거 (globals.css에서 통합 관리)

// 코드 하이라이팅 옵션
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

  if (!post) {
    notFound()
  }

  const dateDisplay = post.date instanceof Date 
    ? post.date.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })
    : post.date;

  return (
    <div className="relative max-w-[1100px] mx-auto px-6 py-12">
      
      {/* [삭제됨] 상단의 거슬리는 '목록으로 돌아가기' 제거 */}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12">
        <article className="min-w-0">
          {/* 헤더 섹션 */}
          <header className="mb-10 border-b border-gray-100 pb-10">
            {/* 태그 */}
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

            {/* 제목 (CSS에서 Medium 폰트가 자동 적용됨) */}
            <h1 className="text-4xl font-bold text-[#333333] mb-4 leading-tight break-keep">
              {post.title}
            </h1>
            
            {/* 날짜 */}
            <div className="flex items-center text-gray-500 font-medium mt-4">
              <Calendar className="mr-2 h-5 w-5 text-[#7c9070]" />
              {dateDisplay}
            </div>
          </header>

          {/* 본문 컨텐츠 (CSS에서 Medium 폰트 자동 적용) */}
          <div className="prose prose-lg max-w-none prose-headings:scroll-mt-24 prose-img:rounded-xl">
             <MDXRemote 
               source={post.content} 
               options={{
                 mdxOptions: {
                   remarkPlugins: [remarkGfm],
                   rehypePlugins: [
                     rehypeSlug,
                     [rehypePrettyCode, prettyCodeOptions]
                   ],
                 },
               }}
             />
          </div>

          {/* [NEW] 하단으로 이동한 네비게이션 */}
          <div className="mt-16 pt-10 border-t border-gray-100 flex justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 rounded-full bg-gray-50 text-gray-600 font-medium hover:bg-[#7c9070] hover:text-white transition-all duration-300"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              목록으로 돌아가기
            </Link>
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