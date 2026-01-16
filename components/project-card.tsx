import Link from "next/link"
import Image from "next/image"

interface ProjectCardProps {
  id: string
  title: string
  description: string
  image: string
  date: string
  tags?: string[]
  href: string
}

export function ProjectCard({ id, title, description, image, date, tags, href }: ProjectCardProps) {
  return (
    <Link href={href} className="group block">
      <article className="overflow-hidden rounded-xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
        {/* Thumbnail Image - 16:9 aspect ratio */}
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={image || "/placeholder.svg?height=200&width=360&query=project thumbnail"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        {/* Content Padding Area */}
        <div className="p-5">
          {/* Title */}
          <h3 className="font-bold text-lg text-[#333333] group-hover:text-[#7c9070] transition-colors line-clamp-1">
            {title}
          </h3>
          {/* Description */}
          <p className="mt-2 text-sm text-gray-500 line-clamp-2">{description}</p>
          {/* Footer: Date & Tags */}
          <div className="mt-4 flex items-center justify-between gap-2">
            <time dateTime={date} className="text-xs text-gray-400">
              {new Date(date).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 justify-end">
                {tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-[#7c9070] text-white">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
