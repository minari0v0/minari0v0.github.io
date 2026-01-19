import Link from "next/link"
import Image from "next/image"
import { getProjectPosts, getBlogPosts } from "@/lib/mdx"
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
  slug: string // id -> slug로 변경
  title: string
  excerpt: string
  image: string
  date: string | Date // 날짜 객체 호환
}

export default function HomePage() {
  const allProjects = getProjectPosts() as unknown as Project[]
  const featuredProjects = allProjects.slice(0, 6) // 캐러셀용 6개
  
  const allPosts = getBlogPosts()
  const recentPosts = allPosts.slice(0, 6) as unknown as Post[]

  return (
    <div className="flex flex-col">
      {/* Hero Section: 원래 디자인으로 복구 (녹색 박스 제거) */}
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
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-md">
              minari0v0's Archive
            </h1>
            <p className="mt-2 text-lg text-gray-200 font-medium opacity-90">
              기록하고, 성장하고, 공유하는 공간
            </p>
          </div>
        </div>
      </section>

      {/* 1. 프로젝트 섹션 */}
      <section className="max-w-[1100px] mx-auto w-full px-6 py-16">
        <ContentCarousel title="프로젝트" viewAllHref="/projects">
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
          {recentPosts.map((post) => (
            <ProjectCard
              key={post.slug}
              id={post.slug} // id 대신 slug 사용
              title={post.title}
              description={post.excerpt}
              image={post.image || "/placeholder.svg"}
              // 날짜 변환 로직 추가
              date={post.date instanceof Date ? post.date.toLocaleDateString("ko-KR") : post.date}
              href={`/blog/${post.slug}`} // 링크도 slug 기반으로 변경
            />
          ))}
        </ContentCarousel>
      </section>
    </div>
  )
}