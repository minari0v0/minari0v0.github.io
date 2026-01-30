"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

export function SearchBar() {
  const router = useRouter()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [query, setQuery] = useState("")
  
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null) // [NEW] 전체 컨테이너 감지용

  // [NEW] 검색창 열렸을 때 포커스 & 외부 클릭 감지
  useEffect(() => {
    // 1. 열리면 포커스
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus()
    }

    // 2. 외부 클릭 시 닫기 (Click Outside)
    function handleClickOutside(event: MouseEvent) {
      // 내부에 있는 요소를 클릭한 게 아니라면 닫기
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }

    // 이벤트 리스너 등록
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isSearchOpen])

  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => !prev)
  }

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
      setIsSearchOpen(false)
      setQuery("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsSearchOpen(false)
      setQuery("")
    }
  }

  return (
    // ref={containerRef}를 여기에 달아서 이 영역 밖을 클릭했는지 감지함
    <div ref={containerRef} className="relative flex items-center justify-end">
      
      {/* 검색 입력창 영역 */}
      <div
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out",
          // 닫혀있을 때 버튼 클릭을 방해하지 않도록 pointer-events-none 적용
          isSearchOpen ? "w-48 opacity-100 z-10" : "w-0 opacity-0 pointer-events-none -z-10"
        )}
      >
        <form onSubmit={handleSearchSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            // onBlur는 제거 (외부 클릭 감지 로직으로 대체)
            placeholder="검색..."
            className="w-full h-9 pl-4 pr-10 rounded-md border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#7c9070] shadow-sm"
          />
        </form>
      </div>
      
      {/* 돋보기 버튼 */}
      <button
        onClick={handleSearchToggle}
        className={cn(
          "p-2 rounded-md transition-colors relative z-20", 
          "text-gray-400 hover:text-[#7c9070] hover:bg-[#7c9070]/25 active:bg-[#7c9070]/30"
        )}
        aria-label="Search"
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  )
}