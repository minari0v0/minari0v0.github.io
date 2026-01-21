"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import localFont from "next/font/local"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

// [1] 폰트 변경: KCC 무럭무럭체 로드
// (public/fonts 폴더에 파일이 있어야 합니다!)
const murukFont = localFont({
  src: "../app/fonts/KCC-Murukmuruk.ttf",
  display: "swap",
})

const navItems = [
  { href: "/projects", label: "프로젝트" },
  { href: "/blog", label: "스토리" },
  { href: "/about", label: "소개" },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <nav className="max-w-[1100px] mx-auto flex h-16 items-center justify-between px-6">
        
        {/* [왼쪽 그룹] 로고 + 네비게이션 */}
        <div className="flex items-center gap-8">
          
          {/* [2] 로고 디자인: 베이지 배경 + 짙은 초록 글씨 + 라운드 처리 */}
          <Link 
            href="/" 
            className={cn(
              "flex items-center justify-center px-3 py-1.5 rounded-xl transition-transform hover:scale-105 active:scale-95", // 박스 형태 & 인터랙션
              "bg-[#F5F5F0]", // 폰트 배경 색상 (베이지)
              murukFont.className // 무럭무럭체 적용
            )}
          >
            <span className="text-2xl pt-1 text-[#5A7863]"> {/* 짙은 초록 글씨 + 시각적 높이 보정(pt-1) */}
              minari0v0
            </span>
          </Link>

          {/* [3] 네비게이션: 로고 바로 옆으로 이동 */}
          <div className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-[#7c9070]", // 호버 시 말차색
                    isActive 
                      ? "text-[#7c9070] font-bold" // 활성: 말차색 + 굵게
                      : "text-gray-500"            // 비활성: 회색
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>

        {/* [오른쪽 그룹] 검색 버튼 */}
        <div className="flex items-center">
          <Link
            href="/search"
            className={cn(
              "p-2 rounded-md transition-colors",
              "text-gray-400 hover:text-[#7c9070] hover:bg-[#7c9070]/10", // [4] 호버 시 말차색 텍스트 & 연한 배경
              pathname === "/search" && "text-[#7c9070] bg-[#7c9070]/10"
            )}
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </Link>
        </div>

      </nav>
    </header>
  )
}