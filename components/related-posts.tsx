import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BlogPost } from "@/lib/mdx"

interface RelatedPostsProps {
  category: string
  posts: BlogPost[]
}

export function RelatedPosts({ category, posts }: RelatedPostsProps) {
  return (
    <div className="mt-20 pt-10 border-t border-gray-100">
      <h3 className="text-lg font-bold text-[#333333] mb-6 flex items-center">
        <span className="text-[#7c9070] mr-1">스토리 - {category}</span> 의 다른 글
      </h3>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block p-5 rounded-xl border border-gray-100 bg-white hover:border-[#7c9070] hover:shadow-md transition-all duration-300"
            >
              <h4 className="font-bold text-[#333333] group-hover:text-[#7c9070] transition-colors mb-2 line-clamp-1">
                {post.title}
              </h4>
              <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center text-xs font-medium text-[#7c9070]">
                읽어보기 <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-400 text-sm">
          아직 이 카테고리에 다른 글이 없습니다. 🍃
        </div>
      )}
    </div>
  )
}