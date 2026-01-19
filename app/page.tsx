import Link from "next/link"
import Image from "next/image"
import { getRecentPosts } from "@/lib/data"
import { getProjectPosts } from "@/lib/mdx"
import { ContentCarousel } from "@/components/content-carousel"
import { ProjectCard } from "@/components/project-card"

// 타입 정의
interface Project {
  slug: string
  title: string
  description: string
  thumbnail?: string
  date: string | Date
  tags: string[]
}

interface Post {
  id: string
  title: string
  excerpt: string
  image: string
  date: string
}

export default function HomePage() {
  const allProjects = getProjectPosts() as unknown as Project[]
  const featuredProjects = allProjects.slice(0, 6)
  
  const recentPosts = getRecentPosts(6) as unknown as Post[]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[450px] w-full overflow-hidden">
        <Image
          src="/cozy-desk-setup-with-matcha-green-aesthetic-warm-l.jpg"
          alt="Hero banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end pb-8 md:pb-12">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="relative max-w-[1100px] mx-auto w-full px-6">
            <div className="inline-block rounded-2xl bg-matcha-500 border-2 border-matcha-600 px-6 py-4 shadow-md">
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                minari0v0's Archive
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* 1. 프로젝트 섹션 */}
      <section className="max-w-[1100px] mx-auto w-full px-6 py-16">
        <ContentCarousel title="프로젝트" viewAllHref="/projects">
          {/* [변경] renderItem 대신 여기서 직접 map을 돌려서 Children으로 넘깁니다 */}
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              id={project.slug}
              title={project.title}
              description={project.description}
              image={project.thumbnail || "/placeholder.svg"}
              date={project.date instanceof Date ? project.date.toLocaleDateString("ko-KR") : project.date}
              tags={project.tags}
              href={`/projects/${project.slug}`}
            />
          ))}
        </ContentCarousel>
      </section>

      {/* 2. 스토리 섹션 */}
      <section className="max-w-[1100px] mx-auto w-full px-6 py-16 border-t border-gray-100">
        <ContentCarousel title="최신 스토리" viewAllHref="/blog">
          {/* [변경] 여기도 직접 map으로 Children 전달 */}
          {recentPosts.map((post) => (
            <ProjectCard
              key={post.id}
              id={post.id}
              title={post.title}
              description={post.excerpt}
              image={post.image || "/placeholder.svg"}
              date={post.date}
              href={`/blog/${post.id}`}
            />
          ))}
        </ContentCarousel>
      </section>
    </div>
  )
}