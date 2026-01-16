"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"
import { projects, blogPosts } from "@/lib/data"

export default function SearchPage() {
  const [query, setQuery] = useState("")

  const results = useMemo(() => {
    if (!query.trim()) return { projects: [], posts: [] }

    const lowerQuery = query.toLowerCase()

    const matchingProjects = projects.filter(
      (p) =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.techStack.some((t) => t.toLowerCase().includes(lowerQuery)),
    )

    const matchingPosts = blogPosts.filter(
      (p) => p.title.toLowerCase().includes(lowerQuery) || p.excerpt.toLowerCase().includes(lowerQuery),
    )

    return { projects: matchingProjects, posts: matchingPosts }
  }, [query])

  const hasResults = results.projects.length > 0 || results.posts.length > 0
  const hasSearched = query.trim().length > 0

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">검색</h1>

        {/* Search Input */}
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="프로젝트와 스토리를 검색하세요..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            autoFocus
          />
        </div>
      </header>

      {/* Results or No Results State */}
      {hasSearched && !hasResults ? (
        <NoResultsState />
      ) : hasSearched ? (
        <div className="space-y-12">
          {/* Project Results */}
          {results.projects.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">프로젝트 ({results.projects.length})</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {results.projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="group block p-4 rounded-lg border border-border hover:border-primary/30 hover:shadow-md transition-all"
                  >
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Blog Post Results */}
          {results.posts.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">스토리 ({results.posts.length})</h2>
              <div className="space-y-3">
                {results.posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className="group block p-4 rounded-lg border border-border hover:border-primary/30 hover:shadow-md transition-all"
                  >
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        <p className="text-muted-foreground">검색어를 입력하여 프로젝트와 스토리를 찾아보세요.</p>
      )}
    </div>
  )
}

function NoResultsState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {/* Pixel art mascot placeholder */}
      <div className="mb-6">
        <Image
          src="/cute-pixel-art-mascot-character-sad-face-searching.jpg"
          alt="No results mascot"
          width={160}
          height={160}
          className="opacity-80"
        />
      </div>
      <h3 className="text-lg font-medium text-foreground mb-2">검색 결과가 없습니다...</h3>
      <p className="text-muted-foreground max-w-md">
        검색어와 일치하는 결과를 찾지 못했습니다. 다른 키워드로 검색하거나 프로젝트와 스토리를 직접 둘러보세요.
      </p>
    </div>
  )
}
