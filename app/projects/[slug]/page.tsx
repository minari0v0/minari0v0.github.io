import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, Github, Globe, Calendar } from "lucide-react"
import { getProjectBySlug, getProjectPosts } from "@/lib/mdx"
import TableOfContents from "@/components/toc"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypePrettyCode from "rehype-pretty-code"
import { formatMonth } from "@/lib/date-utils" // 날짜 포맷 함수 임포트

const prettyCodeOptions = {
  theme: "one-dark-pro",
  keepBackground: false,
}

export async function generateStaticParams() {
  const posts = getProjectPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { frontmatter } = getProjectBySlug(slug)
  if (!frontmatter) return { title: "Project Not Found" }

  return {
    title: `${frontmatter.title} | minari0v0`,
    description: frontmatter.description,
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { frontmatter, content } = getProjectBySlug(slug)

  if (!frontmatter) notFound()

  // ▼▼▼ [수정] 날짜 포맷팅 로직 변경 (YYYY.MM - YYYY.MM) ▼▼▼
  // startDate, endDate가 없으면 기존 date를 쓰도록 폴백(fallback) 처리도 가능
  const startStr = frontmatter.startDate 
    ? formatMonth(frontmatter.startDate) 
    : (frontmatter.date ? formatMonth(frontmatter.date) : "???")
  const endStr = frontmatter.endDate ? formatMonth(frontmatter.endDate) : "진행 중"
  const dateRangeDisplay = `${startStr} - ${endStr}`

  return (
    <div className="relative max-w-[1100px] mx-auto px-6 pb-20">
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
            <div className="flex flex-wrap gap-2 mb-6">
              {frontmatter.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-sm font-bold text-white bg-[#7c9070] rounded-full shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl font-bold text-[#333333] mb-4 leading-tight">
              {frontmatter.title}
            </h1>
            
            <p className="text-xl text-gray-500 font-medium mb-6 leading-relaxed">
              {frontmatter.description}
            </p>
            
            {/* 날짜 표시 부분 */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-t border-gray-100 pt-6">
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-t border-gray-100 pt-6">
                <div className="flex items-center font-medium bg-gray-50 px-3 py-1.5 rounded-lg">
                  <Calendar className="mr-2 h-4 w-4 text-[#7c9070]" />
                  {/* 여기서 dateRangeDisplay 변수를 사용 */}
                  <span className="text-gray-700">{dateRangeDisplay}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 ml-auto sm:ml-0">
                {frontmatter.github && (
                  <a
                    href={frontmatter.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-5 py-2.5 rounded-lg bg-gray-900 text-white text-base font-bold hover:bg-gray-700 transition-all hover:scale-105 active:scale-95"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                )}
                {frontmatter.demo && (
                  <a
                    href={frontmatter.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-5 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 text-base font-bold hover:border-[#7c9070] hover:text-[#7c9070] transition-all hover:scale-105 active:scale-95"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </header>

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

          <div className="prose prose-lg max-w-none prose-headings:scroll-mt-24 prose-img:rounded-xl">
            <MDXRemote 
               source={content} 
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