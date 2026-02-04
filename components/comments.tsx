"use client"

import { useState, useEffect, useRef } from "react"
import Giscus from "@giscus/react"
import Image from "next/image"

export function Comments() {
  const [isVisible, setIsVisible] = useState(false) // 스크롤이 도달했는지 여부
  const [isLoaded, setIsLoaded] = useState(false)   // Giscus 로딩 완료 여부
  const ref = useRef<HTMLDivElement>(null)

  // 1. 스크롤 감지 (IntersectionObserver)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true) // 화면에 보이면 로딩 시작!
          observer.disconnect() // 한 번 보이면 감시 종료
        }
      },
      { threshold: 0.1 } // 10% 정도 보이면 트리거
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  // 2. Giscus 로딩 완료 메시지 감지 (무한 로딩 방지용)
  useEffect(() => {
    if (!isVisible) return // 아직 안 보이면 이벤트 리스너도 달지 않음

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://giscus.app") return
      if (!(typeof event.data === "object" && event.data.giscus)) return
      setIsLoaded(true) // 로딩 완료!
    }

    window.addEventListener("message", handleMessage)

    // 안전장치: 5초 지나면 강제로 보여줌 (혹시 메시지 안 올 경우 대비)
    const timer = setTimeout(() => setIsLoaded(true), 3000)

    return () => {
      window.removeEventListener("message", handleMessage)
      clearTimeout(timer)
    }
  }, [isVisible])

  return (
    // ref를 여기에 달아서 스크롤 감지
    <div ref={ref} className="mt-20 pt-10 border-t border-gray-100 min-h-[300px]">
      
      {/* 아직 스크롤 도달 안 했으면 아무것도 안 보여줌 (높이만 확보) */}
      {!isVisible ? (
        <div className="h-20" /> 
      ) : (
        <div className="w-full">
          
          {/* 1. 로딩 중일 때 (모나 GIF) */}
          {!isLoaded && (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="relative w-12 h-12 mb-4">
                <Image 
                  src="https://github.githubassets.com/images/mona-loading-default.gif" 
                  alt="Loading..." 
                  fill 
                  className="object-contain"
                  unoptimized
                />
              </div>
              <p className="text-sm font-medium text-gray-400 animate-pulse">
                댓글 불러오는 중...
              </p>
            </div>
          )}

          {/* 2. Giscus 컴포넌트 */}
          <div className={!isLoaded ? "opacity-0 h-0 overflow-hidden" : "opacity-100 transition-opacity duration-700"}>
            <Giscus
              id="comments"
              repo="minari0v0/minari0v0.github.io"
              repoId="R_kgDOQ6_a0Q"
              category="General"
              categoryId="DIC_kwDOQ6_a0c4C1Uuc"
              mapping="pathname"
              strict="0" 
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="top"
              theme="light"
              lang="ko"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  )
}