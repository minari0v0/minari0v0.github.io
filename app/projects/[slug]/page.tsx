import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, Globe } from "lucide-react"
import { getProjectBySlug, getProjectPosts } from "@/lib/mdx"
import TableOfContents from "@/components/toc"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypePrettyCode from "rehype-pretty-code"
import { ProjectInfo } from "@/components/project-info"
import { GithubButton } from "@/components/ui/github-button"

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

  return (
    <div className="relative max-w-[1100px] mx-auto px-6 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12 mt-8">
        {/* 본문 영역 (여기에 네비게이션을 넣음) */}
        <article className="min-w-0">
          
          {/* 1. 상단 네비게이션 & GitHub 버튼 (Article 내부 배치) */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/projects"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#7c9070] transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              모든 프로젝트
            </Link>
            
            {/* 이제 이 버튼은 Article 너비(약 800px)의 오른쪽 끝에 붙습니다 */}
            {frontmatter.github && (
               <GithubButton href={frontmatter.github} />
            )}
          </div>

          <header className="mb-12">
            {/* 2. 제목 */}
            <h1 className="text-4xl md:text-5xl font-bold text-[#333333] mb-5 leading-tight tracking-tight">
              {frontmatter.title}
            </h1>
            
            {/* 3. 설명 */}
            <p className="text-xl text-gray-500 font-medium mb-8 leading-relaxed">
              {frontmatter.description}
            </p>

            {/* 4. 핵심 태그 뱃지 */}
            <div className="flex flex-wrap gap-2 mb-10">
              {frontmatter.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-sm font-bold text-white bg-[#7c9070] rounded-full shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* 5. 썸네일 */}
            {frontmatter.thumbnail && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10 shadow-lg bg-gray-50 border border-gray-100">
                 <Image 
                   src={frontmatter.thumbnail} 
                   alt={frontmatter.title} 
                   fill 
                   className="object-cover"
                   priority
                 />
              </div>
            )}

            {/* Live Demo 버튼 */}
            {frontmatter.demo && (
              <div className="flex justify-end mb-4">
                 <a
                  href={frontmatter.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 text-base font-bold hover:border-[#7c9070] hover:text-[#7c9070] transition-all hover:scale-105 active:scale-95 shadow-sm"
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Live Demo 보러가기
                </a>
              </div>
            )}

            {/* 6. 상세 정보 카드 (토스 스타일 + 기술스택 카드화) */}
            <ProjectInfo 
              startDate={frontmatter.startDate || frontmatter.date}
              endDate={frontmatter.endDate}
              tags={frontmatter.tags || []}
              type={frontmatter.type} 
            />
          </header>

          {/* 7. 본문 */}
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

        {/* 우측 TOC (이제 버튼과 겹치지 않음!) */}
        <aside className="hidden lg:block">
          <div className="sticky top-32">
            <TableOfContents />
          </div>
        </aside>
      </div>
    </div>
  )
}