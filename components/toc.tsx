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

  // 2. 스크롤 이벤트
  useEffect(() => {
    const handleScroll = () => {
      const contentElement = document.querySelector(".prose")
      if (contentElement) {
        const rect = contentElement.getBoundingClientRect()
        if (rect.top <= window.innerHeight * 0.6) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      } else {
        setIsVisible(true)
      }

      const elements = Array.from(document.querySelectorAll(".prose h1, .prose h2, .prose h3"))
      const targetLine = 100 
      
      let currentActiveId = ""

      for (const elem of elements) {
        const rect = elem.getBoundingClientRect()
        if (rect.top < targetLine) {
          currentActiveId = elem.id
        } else {
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
      <ul className={`space-y-2 ${paperlogyBold.className}`}>
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`
              ${heading.level === 1 ? "mt-4 mb-2" : "mt-1"}
            `}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={`
                block transition-all duration-300 ease-in-out cursor-pointer line-clamp-1
                
                /* 레벨별 들여쓰기 */
                ${heading.level === 1 ? "pl-0" : ""}
                ${heading.level === 2 ? "pl-3" : ""}
                ${heading.level === 3 ? "pl-6 border-l-2 border-gray-100" : ""} 

                /* 레벨별 글자 크기 */
                ${heading.level === 1 ? "text-[16px]" : ""}
                ${heading.level === 2 ? "text-[14.5px] opacity-90" : ""}
                ${heading.level === 3 ? "text-[13.5px] opacity-80" : ""}

                /* [수정됨] 느낌표(!)를 붙여서 호버 색상을 강제 적용 */
                ${activeId === heading.id
                  ? "text-[#748E63] scale-105 origin-left opacity-100 font-medium" 
                  : "text-gray-300 hover:!text-[#97A87A] scale-100" // <--- 여기 ! 추가
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