import { notFound } from "next/navigation"
import { getBlogPostById, blogPosts } from "@/lib/data"
import { TableOfContents } from "@/components/table-of-contents"

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = getBlogPostById(id)
  if (!post) return { title: "Post Not Found" }

  return {
    title: `${post.title} | minari0v0`,
    description: post.excerpt,
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = getBlogPostById(id)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Two column layout - Main Content + Sidebar */}
      <div className="flex gap-12 relative">
        {/* Left - Main Content */}
        <article className="flex-1 max-w-3xl">
          {/* Header */}
          <header className="mb-8 pb-8 border-b border-border">
            <h1 className="text-3xl font-bold text-foreground mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </header>

          {/* Markdown content area */}
          <div className="prose max-w-none">
            {post.content.split("\n").map((line, index) => {
              if (line.startsWith("## ")) {
                const text = line.replace("## ", "")
                const headingId = text
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^\w-]/g, "")
                return (
                  <h2 key={index} id={headingId}>
                    {text}
                  </h2>
                )
              }
              if (line.startsWith("### ")) {
                const text = line.replace("### ", "")
                const headingId = text
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^\w-]/g, "")
                return (
                  <h3 key={index} id={headingId}>
                    {text}
                  </h3>
                )
              }
              if (line.startsWith("```")) {
                return null
              }
              if (line.match(/^\d+\./)) {
                return <li key={index}>{line.replace(/^\d+\.\s*/, "")}</li>
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

            {post.content.split("```").map((block, index) => {
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
        </article>

        {/* Right - Sticky Table of Contents Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <TableOfContents headings={post.headings} />
        </aside>
      </div>
    </div>
  )
}
