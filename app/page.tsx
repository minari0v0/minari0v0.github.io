import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { ProjectCard } from "@/components/project-card"
import { StoryCarousel } from "@/components/story-carousel"
import { getFeaturedProjects, getRecentPosts } from "@/lib/data"

export default function HomePage() {
  const featuredProjects = getFeaturedProjects()
  const recentPosts = getRecentPosts(5)

  return (
    <div className="flex flex-col">
      {/* Hero Section - Fixed height 450px */}
      <section className="relative h-[450px] w-full overflow-hidden">
        <Image
          src="/cozy-desk-setup-with-matcha-green-aesthetic-warm-l.jpg"
          alt="Hero banner"
          fill
          className="object-cover"
          priority
        />
        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        {/* 텍스트 컨테이너 */}
        <div className="absolute inset-0 flex flex-col justify-end pb-8 md:pb-12">
          {/* 그라데이션을 텍스트 뒤에만 더 강하게 줍니다 */}
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
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              date={project.date}
              tags={project.techStack}
              href={`/projects/${project.id}`}
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