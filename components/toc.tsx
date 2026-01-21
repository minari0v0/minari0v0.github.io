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
  // [NEW] TOC 보임 여부 상태
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

  // 2. 스크롤 추적 (활성 ID 및 등장 여부 체크)
  useEffect(() => {
    const handleScroll = () => {
      // --- A. TOC 등장/퇴장 로직 (핵심) ---
      const contentElement = document.querySelector(".prose")
      if (contentElement) {
        const rect = contentElement.getBoundingClientRect()
        // 본문(.prose)의 상단이 화면의 60% 지점보다 위로 올라오면 TOC 등장
        // 즉, 헤더를 지나 본문을 읽을 준비가 되었을 때 나타남
        const triggerPoint = window.innerHeight * 0.6
        
        if (rect.top <= triggerPoint) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      } else {
        // 본문이 없는 예외적인 경우 그냥 보여줌
        setIsVisible(true)
      }

      // --- B. 활성 헤더(Active ID) 추적 로직 ---
      const TRIGGER_TOP = 150 // 헤더 활성화 기준선
      const elements = Array.from(document.querySelectorAll(".prose h1, .prose h2, .prose h3"))
      let currentId = ""

      for (const elem of elements) {
        const top = elem.getBoundingClientRect().top
        if (top <= TRIGGER_TOP) {
          currentId = elem.id
        } else {
          break
        }
      }

      if (currentId) {
        setActiveId(currentId)
      } else if (elements.length > 0 && window.scrollY < 100) {
         // 최상단이면 첫 번째 목차 활성화 (선택 사항)
         setActiveId(elements[0].id)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // 초기 상태 반영을 위해 실행

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
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
                transition-all duration-300 ease-in-out
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