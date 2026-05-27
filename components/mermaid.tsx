"use client"

import { useEffect, useState, useRef } from "react"
import mermaid from "mermaid"
import { Maximize2, X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"

interface MermaidProps {
  chart: string
}

export default function Mermaid({ chart }: MermaidProps) {
  const [svg, setSvg] = useState<string>("")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      securityLevel: "loose",
      fontFamily: "var(--font-paperlogy)",

      flowchart: {
        useMaxWidth: true, // 화면 꽉 차게 유지
        curve: 'basis',
        padding: 25,       // 여백을 더 줘서 답답함 해소
        nodeSpacing: 60,
        rankSpacing: 60,
      },

      themeVariables: {
        // 원래의 말차/세이지 그린 중심의 브랜딩 컬러셋 복원
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

  const handleZoomIn = () => setZoom((prev) => Math.min(3, prev + 0.2))
  const handleZoomOut = () => setZoom((prev) => Math.max(0.5, prev - 0.2))
  const handleZoomReset = () => setZoom(1)

  return (
    <div
      ref={containerRef}
      className="mermaid-container my-8 w-full overflow-x-auto bg-[#f9fafb] p-6 rounded-xl border border-gray-200 shadow-sm text-center relative group"
    >
      {/* 크게 보기 버튼 (호버 시 표시) */}
      {svg && (
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/95 hover:bg-white border border-gray-200 shadow-sm px-2.5 py-1.5 rounded-lg text-gray-500 hover:text-[#7c9070] cursor-pointer flex items-center gap-1.5 text-xs font-semibold select-none"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          크게 보기
        </button>
      )}

      {svg ? (
        <div
          className="mx-auto flex justify-center items-center"
          dangerouslySetInnerHTML={{ __html: svg }}
          style={{
            minWidth: "100%", // 부모 너비에 맞춰 꽉 차게 렌더링
          }}
        />
      ) : (
        <div className="opacity-0 whitespace-pre">{chart}</div>
      )}

      {/* 줌인/줌아웃 전체화면 모달 */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-[#111111]/90 backdrop-blur-md flex flex-col justify-between items-center p-6 animate-fade-in text-white select-none">
          {/* 모달 헤더 */}
          <div className="w-full flex items-center justify-between">
            <h3 className="font-bold text-lg text-gray-300">아키텍처 다이어그램</h3>
            <button
              onClick={() => { setIsFullscreen(false); setZoom(1); }}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* 모달 이미지 바디 (컨테이너 오버플로우 지원) */}
          <div className="flex-1 w-full overflow-auto flex items-center justify-center p-4">
            <div
              className="bg-white rounded-2xl shadow-2xl p-10 max-w-none max-h-none flex items-center justify-center overflow-auto transition-transform duration-200 ease-out"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "center center",
                minWidth: "650px",
              }}
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </div>

          {/* 하단 줌 컨트롤 패널 */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-lg">
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-white/10 rounded-lg text-gray-200 hover:text-white transition-colors cursor-pointer"
              title="축소"
            >
              <ZoomOut className="w-5 h-5" />
            </button>

            <span className="text-sm font-semibold min-w-[50px] text-center text-gray-200">
              {Math.round(zoom * 100)}%
            </span>

            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-white/10 rounded-lg text-gray-200 hover:text-white transition-colors cursor-pointer"
              title="확대"
            >
              <ZoomIn className="w-5 h-5" />
            </button>

            <div className="w-px h-5 bg-white/20 mx-1"></div>

            <button
              onClick={handleZoomReset}
              className="p-2 hover:bg-white/10 rounded-lg text-gray-200 hover:text-white transition-colors cursor-pointer"
              title="초기화"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* 스타일 강제 주입 */}
      <style jsx global>{`
        .mermaid-container .label {
          font-weight: 700 !important;
          font-family: var(--font-paperlogy) !important;
          text-shadow: none !important;
        }
        
        .mermaid-container .edgePath .path {
          stroke-width: 2px !important;
        }

        .mermaid-container .node foreignObject {
          overflow: visible !important;
        }

        /* subgraph 제목 스타일 최적화 (글꼴 크기 축소로 줄바꿈/오버랩 방지) */
        .mermaid-container .subgraph-title,
        .mermaid-container .subgraphLabel .label,
        .mermaid-container .cluster .label,
        .mermaid-container .cluster-label {
          font-size: 11px !important;
          font-weight: 700 !important;
          fill: #1F4529 !important;
        }
      `}</style>
    </div>
  )
}