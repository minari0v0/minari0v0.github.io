import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { blogPosts } from "@/lib/data"

export const metadata = {
  title: "스토리 | minari0v0",
  description: "개발, 디자인, 기술에 대한 이야기를 기록합니다.",
}

export default function BlogPage() {
  return (
    <div className="max-w-[1100px] mx-auto px-6 py-12">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-[#333333]">스토리</h1>
        <p className="mt-3 text-gray-500">개발, 디자인, 기술에 대한 이야기를 기록합니다.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`} className="group block">
            <article className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
              {/* Image - 16:9 aspect ratio */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Date */}
                <time className="text-xs text-gray-400" dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>

                {/* Title */}
                <h2 className="mt-2 text-lg font-semibold text-[#333333] group-hover:text-[#7c9070] transition-colors line-clamp-1">
                  {post.title}
                </h2>

                {/* Summary */}
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>

                {/* Read more link */}
                <div className="mt-4 flex items-center gap-1 text-sm text-[#7c9070] font-medium">
                  더 읽기 <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}
