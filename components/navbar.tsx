"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import localFont from "next/font/local"
import { SearchBar } from "./search-bar"
import { cn } from "@/lib/utils"

// 폰트 설정 (경로 확인 필수)
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
          
          {/* 로고 */}
          <Link 
            href="/" 
            className={cn(
              "flex items-center justify-center px-3 py-1.5 rounded-xl transition-transform hover:scale-105 active:scale-95",
              "bg-[#F5F5F0]", 
              murukFont.className
            )}
          >
            <span className="text-2xl pt-1 text-[#5A7863]">
              minari0v0
            </span>
          </Link>

          {/* 네비게이션 */}
          <div className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    // [수정] 호버 클래스를 비활성 상태일 때만 명시적으로 적용하여 충돌 방지
                    isActive 
                      ? "text-[#7c9070] font-bold" 
                      : "text-gray-500 hover:text-[#7c9070]" 
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
          <SearchBar />
        </div>

      </nav>
    </header>
  )
}