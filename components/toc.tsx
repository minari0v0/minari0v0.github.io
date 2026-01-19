"use client"

import { useEffect, useState } from "react"
import localFont from "next/font/local"

const paperlogyBold = localFont({
  src: "../public/fonts/Paperlogy-7Bold.ttf",
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

  // 1. 목차 리스트 생성 (초기 1회)
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(".prose h1, .prose h2, .prose h3"))
    const headingData = elements.map((elem) => ({
      id: elem.id,
      text: elem.textContent || "",
      level: Number(elem.tagName.substring(1)),
    }))
    setHeadings(headingData)
  }, [])

  // 2. 스크롤 추적 (화면 기준 절대 위치 사용)
  useEffect(() => {
    const handleScroll = () => {
      // 헤더 높이(64px) + 여유 공간(40px) = 약 100px 정도를 기준으로 잡습니다.
      // 즉, 제목이 화면 상단 100px 선을 통과하면 "읽고 있다"고 판단합니다.
      const TRIGGER_TOP = 100 

      const elements = Array.from(document.querySelectorAll(".prose h1, .prose h2, .prose h3"))
      
      let currentId = ""

      for (const elem of elements) {
        // getBoundingClientRect().top : 현재 화면 맨 위에서부터 요소까지의 거리
        const top = elem.getBoundingClientRect().top
        
        // 요소가 기준선(100px)보다 위에 있거나 걸쳐있으면 후보로 등록
        // 반복문을 돌면서 "기준선을 통과한 마지막 녀석"이 결국 currentId가 됨
        if (top <= TRIGGER_TOP) {
          currentId = elem.id
        } else {
          // 기준선보다 아래에 있는 제목이 나오면 더 볼 필요 없음 (이미 찾음)
          break
        }
      }

      // 만약 맨 처음 제목보다 더 위로 올라가서 currentId가 비게 되면
      // 첫 번째 제목을 활성화하거나(선택), 비워둡니다.
      // 여기서는 자연스럽게 유지하도록 합니다.
      if (currentId) {
        setActiveId(currentId)
      } else if (elements.length > 0 && window.scrollY < 100) {
         // (옵션) 스크롤이 최상단이면 첫 번째 목차 활성화
         setActiveId(elements[0].id)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // 초기 실행

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      // 클릭 시 이동 위치 계산 (절대 좌표)
      const y = element.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top: y, behavior: "smooth" })
      setActiveId(id)
    }
  }

  if (headings.length === 0) return null

  return (
    <nav className="toc-container">
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
                  ? "text-[#748E63] scale-105 origin-left" // 요청하신 색상 #748E63
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