import { ProjectCard } from "@/components/project-card"
import { projects } from "@/lib/data"

export const metadata = {
  title: "프로젝트 | minari0v0",
  description: "풍부한 상상과 호기심으로 만들어 온 다양한 프로젝트를 소개합니다.",
}

export default function ProjectsPage() {
  return (
    <div className="max-w-[1100px] mx-auto px-6 py-12">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-[#333333]">프로젝트</h1>
        <p className="mt-3 text-gray-500">풍부한 상상과 호기심으로 만들어 온 다양한 프로젝트를 소개합니다.</p>
      </header>

      {/* 3-column Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
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
    </div>
  )
}
