import { ProjectCard } from "@/components/project-card"
import { getProjectPosts } from "@/lib/mdx"

export const metadata = {
  title: "프로젝트 | minari0v0",
  description: "풍부한 상상과 호기심으로 만들어 온 다양한 프로젝트를 소개합니다.",
}

// 타입 정의 (에러 방지용 안전장치)
interface Project {
  slug: string
  title: string
  description: string
  thumbnail?: string
  startDate: string | Date
  endDate?: string | Date
  tags: string[]
}

export default function ProjectsPage() {
  // any 타입 대신 Project[]로 단언하여 안전하게 사용
  const posts = getProjectPosts() as unknown as Project[]

  // [수정] 내림차순 정렬 (종료일 기준)
  const sortedPosts = posts.sort((a, b) => {
    const dateA = a.endDate ? new Date(a.endDate).getTime() : new Date().getTime()
    const dateB = b.endDate ? new Date(b.endDate).getTime() : new Date().getTime()
    return dateB - dateA // 내림차순
  })

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-12">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-[#333333]">프로젝트</h1>
        <p className="mt-3 text-gray-500">풍부한 상상과 호기심으로 만들어 온 다양한 프로젝트를 소개합니다.</p>
      </header>

      {/* 3-column Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* [수정] posts 대신 sortedPosts를 map으로 돌림 */}
        {sortedPosts.map((project) => (
          <ProjectCard
            key={project.slug}
            id={project.slug}
            title={project.title}
            description={project.description}
            image={project.thumbnail || "/placeholder.svg"}
            startDate={project.startDate}
            endDate={project.endDate}
            tags={project.tags}
            href={`/projects/${project.slug}`}
          />
        ))}
      </div>
    </div>
  )
}