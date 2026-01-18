// components/toc.tsx
"use client"

import { useEffect, useState } from "react"

export default function TableOfContents() {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([])
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    // h2, h3 태그만 긁어모으기
    const elements = Array.from(document.querySelectorAll("h2, h3"))
    const data = elements.map((elem) => ({
      id: elem.id,
      text: elem.textContent || "",
      level: Number(elem.tagName.charAt(1)),
    }))
    setHeadings(data)

    // 스크롤 감지해서 현재 위치 하이라이팅
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
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="sticky top-24 hidden lg:block w-64 pl-4 border-l border-gray-100">
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
                  ? "text-matcha-500 font-semibold" // 활성화됐을 때 말차색
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