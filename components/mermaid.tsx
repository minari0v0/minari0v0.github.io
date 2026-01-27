"use client"

import { useEffect, useState, useRef } from "react"
import mermaid from "mermaid"

interface MermaidProps {
  chart: string
}

export default function Mermaid({ chart }: MermaidProps) {
  const [svg, setSvg] = useState<string>("")
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      securityLevel: "loose",
      fontFamily: "var(--font-paperlogy)",
      
      flowchart: {
        useMaxWidth: true, // 화면 꽉 차게 유지
        htmlLabels: true,
        curve: 'basis',
        padding: 25,       // 여백을 더 줘서 답답함 해소
        nodeSpacing: 60,   
        rankSpacing: 60,   
      },
      
      themeVariables: {
        // [핵심 1] 색상을 완전 검정(#000)으로 해서 선명도 UP
        primaryColor: "#E8EDE5",
        primaryTextColor: "#000000",
        primaryBorderColor: "#7c9070",
        lineColor: "#5f6f55",
        secondaryColor: "#f5f5f0",
        tertiaryColor: "#fff",
        
        // [핵심 2] 폰트 크기를 20px로 뻥튀기 (축소돼도 잘 보이게)
        fontSize: "20px", 
      }
    })

    const renderChart = async () => {
      try {
        const id = `mermaid-${Math.random().toString(36).slice(2)}`
        const { svg } = await mermaid.render(id, chart)
        setSvg(svg)
      } catch (error) {
        console.error("Mermaid render error:", error)
        setSvg(`<div class="text-red-500 text-sm p-4">Mermaid Error: ${error}</div>`)
      }
    }

    renderChart()
  }, [chart])

  return (
    <div 
      ref={containerRef}
      className="mermaid-container my-8 w-full overflow-x-auto bg-[#f9fafb] p-6 rounded-xl border border-gray-200 shadow-sm text-center"
    >
      {svg ? (
        <div 
          className="mx-auto"
          dangerouslySetInnerHTML={{ __html: svg }}
          style={{
            minWidth: "100%", // 부모 너비에 딱 맞춤
          }}
        />
      ) : (
        <div className="opacity-0 whitespace-pre">{chart}</div>
      )}
      
      {/* [스타일 강제 주입] */}
      <style jsx global>{`
        /* 글씨를 무조건 굵게(Bold) 만들어서 가독성 확보 */
        .mermaid-container .label {
          font-weight: 700 !important;
          font-family: var(--font-paperlogy) !important;
          text-shadow: none !important; /* 흐릿해지는 그림자 제거 */
        }
        
        /* 엣지(선)도 조금 더 진하게 */
        .mermaid-container .edgePath .path {
          stroke-width: 2px !important;
        }

        /* 글자 잘림 방지 */
        .mermaid-container .node foreignObject {
          overflow: visible !important;
        }
      `}</style>
    </div>
  )
}