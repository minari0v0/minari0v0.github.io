import { categorizeTags } from "@/lib/tag-mapper"
import { Calendar, Layers, LayoutTemplate, User, Users, Shapes } from "lucide-react"

interface ProjectInfoProps {
  startDate: string | Date
  endDate?: string | Date
  tags: string[]
  type?: string 
}

// [설정] 기술 스택 카드에서 숨길 '개념적' 태그 목록
// 이 태그들은 상단 헤더 뱃지에는 나오지만, 하단 상세 카드에서는 숨겨집니다.
const EXCLUDED_TAGS = [
  "Multi-threading", 
  "Socket", 
  "OOP", 
  "TCP/IP",
  // 추후 숨기고 싶은 태그가 있다면 여기에 추가하세요 (예: "Algorithm", "REST API")
]

export function ProjectInfo({ startDate, endDate, tags, type = "개인 프로젝트" }: ProjectInfoProps) {
  // 1. 일단 전체 태그를 카테고리별로 분류
  const fullTechStack = categorizeTags(tags)

  // 2. 필터링 로직: 제외할 태그를 뺀 새로운 객체 생성
  const techStack = Object.entries(fullTechStack).reduce((acc, [category, items]) => {
    // 제외 목록에 없는 태그만 남기기
    const filteredItems = items.filter((tag) => !EXCLUDED_TAGS.includes(tag))
    
    // 필터링 후에도 아이템이 남아있다면 결과에 추가 (비어버린 카테고리는 자동 삭제됨)
    if (filteredItems.length > 0) {
      acc[category] = filteredItems
    }
    return acc
  }, {} as Record<string, string[]>)


  const formatDate = (d: string | Date) => {
    return new Date(d).toLocaleDateString("ko-KR", { 
      year: "numeric", month: "long" 
    })
  }

  const getTypeIcon = (t: string) => {
    if (t.includes("팀") || t.includes("Team")) return Users;
    if (t.includes("개인") || t.includes("Personal")) return User;
    return Shapes;
  }

  const TypeIcon = getTypeIcon(type);

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 my-10 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-6 md:gap-8">
        
        {/* 왼쪽: 기본 정보 (작은 카드 2개) */}
        <div className="flex flex-col gap-4">
          
          {/* 1. 개발 기간 카드 */}
          <div className="flex flex-col p-5 bg-gray-50 rounded-2xl border border-gray-100 h-full justify-center">
            <div className="flex items-center text-gray-500 font-bold text-xs mb-3">
              <Calendar className="w-3.5 h-3.5 mr-1.5 text-[#7c9070]" />
              개발 기간
            </div>
            <div className="flex flex-col gap-1">
               <span className="text-gray-900 font-bold text-lg">
                 {formatDate(startDate)}
               </span>
               <span className="text-gray-400 text-sm font-medium pl-0.5">~</span>
               <span className="text-gray-900 font-bold text-lg">
                 {endDate ? formatDate(endDate) : "진행 중"}
               </span>
            </div>
          </div>

          {/* 2. 프로젝트 유형 카드 */}
          <div className="flex flex-col p-5 bg-gray-50 rounded-2xl border border-gray-100 h-full justify-center">
            <div className="flex items-center text-gray-500 font-bold text-xs mb-3">
              <LayoutTemplate className="w-3.5 h-3.5 mr-1.5 text-[#7c9070]" />
              프로젝트 유형
            </div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-white rounded-lg shadow-sm text-[#7c9070] border border-gray-100">
                <TypeIcon className="w-5 h-5" />
              </div>
              <span className="text-gray-900 font-bold text-lg">{type}</span>
            </div>
          </div>
        </div>

        {/* 오른쪽: 기술 스택 (큰 카드 하나로 통일!) */}
        <div className="flex flex-col p-6 bg-gray-50 rounded-2xl border border-gray-100 h-full">
           <div className="flex items-center text-[#7c9070] font-bold text-xs mb-5 uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 mr-2" />
              기술 스택 (Tech Stack)
            </div>

            {/* 내용물이 있을 때만 렌더링 */}
            {Object.keys(techStack).length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                {Object.entries(techStack).map(([category, items]) => (
                  <div key={category} className="flex flex-col gap-3">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider border-l-[3px] border-gray-200 pl-2">
                      {category}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <span 
                          key={item} 
                          className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-white text-gray-700 border border-gray-200 shadow-sm hover:border-[#7c9070] hover:text-[#7c9070] transition-colors cursor-default"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // 혹시 모든 태그가 필터링되어 기술 스택이 비어버린 경우 안내 메시지
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                표시할 기술 스택 정보가 없습니다.
              </div>
            )}
        </div>
      </div>
    </div>
  )
}