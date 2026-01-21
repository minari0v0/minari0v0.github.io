import Link from "next/link"
import Image from "next/image"
import { Clock, Calendar } from "lucide-react" // [수정] Calendar 다시 추가
import { calculateDuration } from "@/lib/date-utils"

interface ProjectCardProps {
  id: string
  title: string
  description: string
  image: string
  startDate: string | Date
  endDate?: string | Date
  tags?: string[]
  href: string
  hideDate?: boolean
  displayDate?: string
}

export function ProjectCard({
  id,
  title,
  description,
  image,
  startDate,
  endDate,
  tags = [],
  href,
  hideDate = false,
  displayDate, // [수정] 여기서 이걸 꺼내야 아래에서 쓸 수 있습니다!
}: ProjectCardProps) {
  // 기간 계산
  const durationString = calculateDuration(startDate, endDate)
  
  // 표시할 텍스트 결정
  const dateText = displayDate ? displayDate : `${durationString} 소요`
  const Icon = displayDate ? Calendar : Clock

  return (
    <Link
      href={href}
      className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-48 w-full overflow-hidden bg-gray-100 border-b border-gray-50">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col flex-grow p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-[#7c9070] transition-colors">
          {title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4 break-keep">
          {description}
        </p>

        <div className="flex-grow" />

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

        {!hideDate && (
          <div className="pt-3 border-t border-gray-100 flex items-center text-xs text-gray-500 font-medium">
            <Icon className="w-3.5 h-3.5 mr-1.5 opacity-70 text-[#7c9070]" />
            <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">
              {dateText}
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}