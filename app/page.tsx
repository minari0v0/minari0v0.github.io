import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { ProjectCard } from "@/components/project-card"
import { StoryCarousel } from "@/components/story-carousel"
import { getRecentPosts } from "@/lib/data" // 스토리는 아직 가짜 데이터 유지
import { getProjectPosts } from "@/lib/mdx" // [NEW] 진짜 프로젝트 데이터 함수 가져오기

export default function HomePage() {
  // 1. 모든 프로젝트 글을 가져옵니다.
  const allProjects = getProjectPosts()
  
  // 2. 최신순으로 3개만 잘라서 '주요 프로젝트'로 씁니다.
  const featuredProjects = allProjects.slice(0, 3)
  
  const recentPosts = getRecentPosts(5)

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
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-md">
              minari0v0's Archive
            </h1>
            <p className="mt-2 text-lg text-gray-200 font-medium opacity-90">
              기록하고, 성장하고, 공유하는 공간
            </p>
          </div>
        </div>
      </section>

      {/* Section: 프로젝트 (Featured Projects) */}
      <section className="max-w-[1100px] mx-auto w-full px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[#333333]">프로젝트</h2>
          <Link
            href="/projects"
            className="text-sm text-[#7c9070] hover:underline underline-offset-4 flex items-center gap-1 font-medium"
          >
            전체보기 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 3-column Bento Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              id={project.slug} // [중요] id 대신 slug 사용
              title={project.title}
              description={project.description}
              // 썸네일이 없으면 기본 이미지(placeholder) 사용
              image={project.thumbnail || "/placeholder.svg"} 
              // 날짜가 객체면 문자열로 변환, 문자열이면 그대로 사용
              date={project.date instanceof Date ? project.date.toLocaleDateString("ko-KR") : project.date}
              tags={project.tags}
              href={`/projects/${project.slug}`} // 링크 연결
            />
          ))}
        </div>
      </section>

      {/* Section: 최신 스토리 (Recent Stories) - Carousel */}
      <section className="max-w-[1100px] mx-auto w-full px-6 py-16 border-t border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[#333333]">최신 스토리</h2>
        </div>

        <StoryCarousel posts={recentPosts} />
      </section>
    </div>
  )
}