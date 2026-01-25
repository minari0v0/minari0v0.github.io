"use client"

import { useEffect, useState } from "react"
import localFont from "next/font/local"

const paperlogyBold = localFont({
  src: "../app/fonts/Paperlogy-7Bold.ttf",
  display: "swap",
})

interface Heading {
  id: string
  text: string
  level: number
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  // 1. 목차 리스트 생성
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(".prose h1, .prose h2, .prose h3"))
    const headingData = elements.map((elem) => ({
      id: elem.id,
      text: elem.textContent || "",
      level: Number(elem.tagName.substring(1)),
    }))
    setHeadings(headingData)
  }, [])

  // 2. 스크롤 이벤트 (등장 로직 + 활성 헤더 추적)
  useEffect(() => {
    const handleScroll = () => {
      // --- A. TOC 등장/퇴장 로직 ---
      const contentElement = document.querySelector(".prose")
      if (contentElement) {
        const rect = contentElement.getBoundingClientRect()
        // 본문 읽기 시작하면 등장 (화면 60% 지점 통과 시)
        const triggerPoint = window.innerHeight * 0.6
        
        if (rect.top <= triggerPoint) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      } else {
        setIsVisible(true)
      }

      // --- B. 활성 헤더(Active ID) 추적 로직 (화면 35% 지점 기준) ---
      const elements = Array.from(document.querySelectorAll(".prose h1, .prose h2, .prose h3"))
      
      // [수정] 화면 중앙(0.5)보다 약간 위쪽인 35%(0.35) 지점을 기준선으로 설정
      // 사람이 보통 글을 읽을 때 시선을 두는 높이입니다.
      const targetLine = window.innerHeight * 0.35
      
      let closestId = ""
      let minDistance = Infinity

      elements.forEach((elem) => {
        const rect = elem.getBoundingClientRect()
        const elemTop = rect.top
        
        // 기준선(35%)과 헤더 위치 사이의 거리 계산
        const distance = Math.abs(elemTop - targetLine)

        if (distance < minDistance) {
          minDistance = distance
          closestId = elem.id
        }
      })

      if (closestId) {
        setActiveId(closestId)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() 

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      // 클릭해서 이동할 때도 시선 높이(100px 위) 고려
      const y = element.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top: y, behavior: "smooth" })
      setActiveId(id)
    }
  }

  if (headings.length === 0) return null

  return (
    <nav 
      className={`
        toc-container transition-all duration-500 ease-in-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      <ul className={`space-y-3 text-[16.5px] ${paperlogyBold.className}`}>
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ 
              paddingLeft: heading.level === 3 ? "1rem" : "0",
            }}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={`
                block
                transition-all duration-300 ease-in-out cursor-pointer
                ${activeId === heading.id
                  ? "text-[#748E63] scale-105 origin-left font-medium" 
                  : "text-gray-300 hover:text-gray-500 scale-100" 
                }
              `}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}