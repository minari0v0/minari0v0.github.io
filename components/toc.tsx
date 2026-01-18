"use client"

import { useEffect, useState } from "react"

export default function TableOfContents() {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([])
  const [activeId, setActiveId] = useState("")
  const [isVisible, setIsVisible] = useState(false) // [NEW] 보여짐 여부 상태

  useEffect(() => {
    // 1. 헤딩 태그 수집
    const elements = Array.from(document.querySelectorAll("h2, h3"))
    const data = elements.map((elem) => ({
      id: elem.id,
      text: elem.textContent || "",
      level: Number(elem.tagName.charAt(1)),
    }))
    setHeadings(data)

    // 2. 현재 읽고 있는 위치 감지 (IntersectionObserver)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0% 0% -80% 0%" }
    )
    elements.forEach((elem) => observer.observe(elem))

    // 3. [NEW] 스크롤 위치 감지해서 TOC 숨기기/보이기
    const handleScroll = () => {
      // 400px 이상 스크롤되면 보임, 아니면 숨김
      if (window.scrollY > 400) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // 초기 실행 및 이벤트 등록
    handleScroll()
    window.addEventListener("scroll", handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <nav
      className={`
        sticky top-32 w-64 pl-4 border-l border-gray-100 
        transition-opacity duration-500 ease-in-out  // [NEW] 부드러운 투명도 전환
        ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"} // [NEW] 안 보일 땐 클릭도 안 되게
      `}
    >
      <p className="mb-4 text-sm font-bold text-gray-900 uppercase tracking-wider">On This Page</p>
      <ul className="space-y-3 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: heading.level === 3 ? "1rem" : "0" }}
          >
            <a
              href={`#${heading.id}`}
              className={`block transition-colors duration-200 ${
                activeId === heading.id
                  ? "text-matcha-500 font-bold scale-105 origin-left" // 활성화 효과 강화
                  : "text-gray-500 hover:text-gray-900"
              }`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}