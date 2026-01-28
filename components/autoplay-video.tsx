"use client"

import { useRef, useState, useEffect } from "react"
import { RotateCcw } from "lucide-react"

interface AutoPlayVideoProps {
  src: string
  poster?: string
}

export default function AutoPlayVideo({ src, poster }: AutoPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [isEnded, setIsEnded] = useState(false) // [변경] 재생 끝났는지 여부

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 화면에 50% 이상 들어오고 + 아직 재생 안 했다면 -> 자동 재생
        if (entry.isIntersecting && !hasPlayed && videoRef.current) {
          videoRef.current.play().catch(() => {})
          setHasPlayed(true)
        }
      },
      { threshold: 1.0 }
    )

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => observer.disconnect()
  }, [hasPlayed])

  // 재생이 끝나면 '끝남' 상태로 변경
  const handleVideoEnded = () => {
    setIsEnded(true)
  }

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
      setIsEnded(false) // 다시 재생 중이므로 끝남 상태 해제
    }
  }

  return (
    // [핵심] group 클래스가 있어야 자식 요소가 호버를 감지함
    <div className="relative my-8 rounded-xl overflow-hidden shadow-md border border-gray-100 bg-gray-50 group">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        playsInline
        className="w-full h-auto block"
        onEnded={handleVideoEnded}
      />

      {/* [변경 포인트] 
        1. isEnded가 true일 때만 렌더링 (재생 중일 땐 아예 없음)
        2. opacity-0: 기본적으로 투명해서 안 보임 (마지막 장면 그대로 보임)
        3. group-hover:opacity-100: 마우스를 올리면 나타남
      */}
      {isEnded && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px] transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          <button
            onClick={handleReplay}
            className="flex flex-col items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-md border border-white/30 hover:scale-110 transition-transform shadow-lg">
              <RotateCcw size={28} className="text-white" />
            </div>
            <span className="text-white text-sm font-medium drop-shadow-md">다시 보기</span>
          </button>
        </div>
      )}
    </div>
  )
}