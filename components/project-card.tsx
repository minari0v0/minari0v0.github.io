import Link from "next/link"
import Image from "next/image"
import { Calendar } from "lucide-react"

interface ProjectCardProps {
  id: string
  title: string
  description: string
  image: string
  date: string
  tags?: string[]
  href: string
  hideDate?: boolean // [NEW] 날짜 숨김 옵션 추가
}

export function ProjectCard({
  id,
  title,
  description,
  image,
  date,
  tags = [],
  href,
  hideDate = false, // 기본값은 false (날짜 보임)
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* 1. 이미지 영역 */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100 border-b border-gray-50">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* 2. 텍스트 컨텐츠 영역 */}
      <div className="flex flex-col flex-grow p-5">
        
        {/* 제목 */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-[#7c9070] transition-colors">
          {title}
        </h3>

        {/* 설명 */}
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4 break-keep">
          {description}
        </p>

        {/* 여백 확보 */}
        <div className="flex-grow" />

        {/* 3. 태그 영역 */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-[11px] font-medium text-[#5a6b50] bg-[#7c9070]/10 rounded-md whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
            {tags.length > 4 && (
               <span className="px-2 py-1 text-[11px] font-medium text-gray-400 bg-gray-50 rounded-md">
                 +{tags.length - 4}
               </span>
            )}
          </div>
        )}

        {/* 4. 날짜 영역 (hideDate 옵션 적용) */}
        {!hideDate && (
          <div className="pt-3 border-t border-gray-100 flex items-center text-xs text-gray-400 font-medium">
            <Calendar className="w-3.5 h-3.5 mr-1.5 opacity-70" />
            {date}
          </div>
        )}
      </div>
    </Link>
  )
}