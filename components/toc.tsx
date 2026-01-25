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

  // 1. 목차 리스트 생성 (h4는 제외하고 h1~h3만 수집)
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
        // 본문을 읽기 시작하면 등장
        if (rect.top <= window.innerHeight * 0.6) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      } else {
        setIsVisible(true)
      }

      // --- B. 활성 헤더(Active ID) 추적 로직 (스택 쌓기 방식) ---
      // h4를 포함하지 않으므로, h4 내용을 읽고 있어도 여전히 상위 h2/h3가 활성화됨
      const elements = Array.from(document.querySelectorAll(".prose h1, .prose h2, .prose h3"))
      
      // [수정] 헤더 인식 기준선 (화면 상단에서 100px 아래)
      // 이 선을 지나간 헤더들 중 "가장 마지막" 녀석을 현재 챕터로 간주함
      const targetLine = 100 
      
      let currentActiveId = ""

      for (const elem of elements) {
        const rect = elem.getBoundingClientRect()
        
        // 헤더가 기준선보다 위에 있다? (= 이미 읽고 지나갔거나 읽는 중이다)
        if (rect.top < targetLine) {
          currentActiveId = elem.id
        } else {
          // 헤더가 기준선보다 아래에 있다? (= 아직 안 읽은 미래의 챕터)
          // 순서대로 탐색하므로, 미래의 챕터를 만나는 순간 반복 종료
          break 
        }
      }

      if (currentActiveId) {
        setActiveId(currentActiveId)
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
      // 클릭 시 이동 위치 보정
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