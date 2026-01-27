"use client"

import { useEffect, useRef } from "react"
import mermaid from "mermaid"

interface MermaidProps {
  chart: string
}

export default function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 초기 설정 (테마 등)
    mermaid.initialize({
      startOnLoad: true,
      theme: "base", // 'default', 'dark', 'forest', 'neutral' 등 선택 가능
      securityLevel: "loose",
      themeVariables: {
        fontFamily: "var(--font-paperlogy)", // 블로그 폰트 적용
        primaryColor: "#E8EDE5",
        primaryTextColor: "#333",
        lineColor: "#7c9070",
      }
    })
    
    // 차트 렌더링 실행
    if (ref.current) {
      mermaid.contentLoaded()
    }
  }, [chart])

  return (
    <div className="mermaid flex justify-center my-8 bg-white p-4 rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
      {chart}
    </div>
  )
}