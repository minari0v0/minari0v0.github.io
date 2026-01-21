import { categorizeTags } from "@/lib/tag-mapper"
import { Calendar, Layers, LayoutTemplate, User, Users, Shapes } from "lucide-react"

interface ProjectInfoProps {
  startDate: string | Date
  endDate?: string | Date
  tags: string[]
  type?: string 
}

export function ProjectInfo({ startDate, endDate, tags, type = "개인 프로젝트" }: ProjectInfoProps) {
  const techStack = categorizeTags(tags)

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
        </div>
      </div>
    </div>
  )
}