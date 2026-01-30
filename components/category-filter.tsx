"use client"

import { cn } from "@/lib/utils"

interface CategoryFilterProps {
  categories: string[]
  activeCategory: string
  onSelect: (category: string) => void
  counts: Record<string, number>
}

export function CategoryFilter({ categories, activeCategory, onSelect, counts }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-10">
      {categories.map((category) => {
        const isActive = activeCategory === category
        
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ease-in-out border",
              isActive
                ? "bg-[#7c9070] text-white border-[#7c9070] shadow-md scale-105" // 활성
                : "bg-white text-gray-500 border-gray-100 hover:border-[#7c9070] hover:text-[#7c9070]" // 비활성
            )}
          >
            {category}
            {/* [수정] 괄호 포맷 및 색상 적용 */}
            <span 
              className={cn(
                "ml-1.5 text-xs font-bold", 
                isActive ? "text-[#D8E983]" : "text-gray-300" // 활성 시 라임색, 비활성 시 연회색
              )}
            >
              ({counts[category]})
            </span>
          </button>
        )
      })}
    </div>
  )
}