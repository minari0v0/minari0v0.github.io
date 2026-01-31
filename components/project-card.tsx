import LoadingLink from "@/components/loading-link"
import Image from "next/image"
import { Clock, Calendar, User, Users } from "lucide-react" // [NEW] 아이콘 추가
import { calculateDuration, formatMonth } from "@/lib/date-utils"

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
  contribution?: string // [NEW] 기여도 Prop 추가
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
  contribution, // [NEW]
}: ProjectCardProps) {
  // 기간 계산
  const durationString = calculateDuration(startDate, endDate)
  // 종료일 포맷팅
  const endDateStr = endDate ? formatMonth(endDate) : "진행 중"

  return (
    <LoadingLink
      href={href}
      className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative"
    >
      {/* 이미지 영역 */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100 border-b border-gray-50">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* [NEW] 기여도 뱃지 (이미지 위에 오버레이) */}
        {contribution && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/70 backdrop-blur-[2px] rounded-full shadow-sm z-10">
            {/* 100% 또는 1인 개발이면 사람 1명(User), 아니면 사람 여러명(Users) 아이콘 */}
            {contribution.includes("100%") || contribution.includes("1인") ? (
              <User className="w-3 h-3 text-[#D8E983]" /> // 라임색 포인트
            ) : (
              <Users className="w-3 h-3 text-[#D8E983]" />
            )}
            <span className="text-[11px] font-bold text-white tracking-wide">
              {contribution}
            </span>
          </div>
        )}
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

        {/* 하단 정보 영역 */}
        {!hideDate && (
          <div className="pt-3 border-t border-gray-100 text-xs text-gray-500 font-medium">
            {displayDate ? (
              // Case 1: 블로그 스토리
              <div className="flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1.5 text-[#7c9070]" />
                <span>{displayDate}</span>
              </div>
            ) : (
              // Case 2: 프로젝트
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                   <Calendar className="w-3.5 h-3.5 mr-1.5 text-[#7c9070]" />
                   <span className="text-gray-700">{endDateStr}</span>
                </div>
                <div className="w-px h-2.5 bg-gray-300"></div>
                <div className="flex items-center">
                   <Clock className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                   <span>{durationString} 소요</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </LoadingLink>
  )
}