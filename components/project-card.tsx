import Link from "next/link"
import Image from "next/image"
import { Clock, Calendar } from "lucide-react"
import { calculateDuration, formatMonth } from "@/lib/date-utils" // [수정] formatMonth 추가 임포트

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
  displayDate,
}: ProjectCardProps) {
  // 기간 계산 (약 O개월)
  const durationString = calculateDuration(startDate, endDate)
  
  // 종료일 포맷팅 (YYYY.MM) - endDate가 없으면 '진행 중'
  const endDateStr = endDate ? formatMonth(endDate) : "진행 중"

  return (
    <Link
      href={href}
      className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* 이미지 영역 */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100 border-b border-gray-50">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col flex-grow p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-[#7c9070] transition-colors">
          {title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4 break-keep">
          {description}
        </p>

        <div className="flex-grow" />

        {/* 태그 영역 */}
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

        {/* 하단 정보 영역 (날짜 & 기간) */}
        {!hideDate && (
          <div className="pt-3 border-t border-gray-100 text-xs text-gray-500 font-medium">
            {displayDate ? (
              // Case 1: 블로그 스토리 (날짜 하나만 표시)
              <div className="flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1.5 text-[#7c9070]" />
                <span>{displayDate}</span>
              </div>
            ) : (
              // Case 2: 프로젝트 (종료일 + 소요 기간 함께 표시)
              <div className="flex items-center gap-3">
                {/* 1. 종료일 (YYYY.MM) */}
                <div className="flex items-center">
                   <Calendar className="w-3.5 h-3.5 mr-1.5 text-[#7c9070]" />
                   <span className="text-gray-700">{endDateStr}</span>
                </div>
                
                {/* 구분선 (선택 사항) */}
                <div className="w-px h-2.5 bg-gray-300"></div>

                {/* 2. 소요 기간 (약 O개월) */}
                <div className="flex items-center">
                   <Clock className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                   <span>{durationString} 소요</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}