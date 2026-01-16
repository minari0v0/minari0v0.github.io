import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Github } from "lucide-react"
import { getProjectById, projects } from "@/lib/data"

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = getProjectById(id)
  if (!project) return { title: "Project Not Found" }

  return {
    title: `${project.title} | minari0v0`,
    description: project.description,
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = getProjectById(id)

  if (!project) {
    notFound()
  }

  return (
    <article className="py-8">
      {/* Single column, centered container - Toran's Blog style */}
      <div className="max-w-3xl mx-auto px-4">
        {/* Large header image - 100% width of container */}
        <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
          <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" priority />
        </div>

        {/* Centered GitHub button - Pill shaped, Matcha color */}
        <div className="flex justify-center mb-8">
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            <Github className="h-5 w-5" />
            GitHub Repository
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-foreground mb-4">{project.title}</h1>

        {/* Metadata - Tech stack badges and date */}
        <div className="flex flex-wrap items-center gap-3 mb-8 pb-8 border-b border-border">
          {project.techStack.map((tech) => (
            <span key={tech} className="text-sm px-3 py-1 bg-secondary text-secondary-foreground rounded-full">
              {tech}
            </span>
          ))}
          <span className="text-muted-foreground">•</span>
          <time dateTime={project.date} className="text-sm text-muted-foreground">
            {new Date(project.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>

        {/* Markdown content area */}
        <div className="prose max-w-none">
          {project.content.split("\n").map((line, index) => {
            if (line.startsWith("## ")) {
              return <h2 key={index}>{line.replace("## ", "")}</h2>
            }
            if (line.startsWith("### ")) {
              return <h3 key={index}>{line.replace("### ", "")}</h3>
            }
            if (line.startsWith("```")) {
              return null // Handle code blocks separately
            }
            if (line.startsWith("- **")) {
              const match = line.match(/- \*\*(.+?)\*\*: (.+)/)
              if (match) {
                return (
                  <li key={index}>
                    <strong>{match[1]}</strong>: {match[2]}
                  </li>
                )
              }
            }
            if (line.startsWith("- ")) {
              return <li key={index}>{line.replace("- ", "")}</li>
            }
            if (line.trim() && !line.startsWith("```")) {
              return <p key={index}>{line}</p>
            }
            return null
          })}

          {/* Render code blocks */}
          {project.content.split("```").map((block, index) => {
            if (index % 2 === 1) {
              const lines = block.split("\n")
              const language = lines[0]
              const code = lines.slice(1).join("\n")
              return (
                <pre key={`code-${index}`}>
                  <code className={`language-${language}`}>{code}</code>
                </pre>
              )
            }
            return null
          })}
        </div>
      </div>
    </article>
  )
}
