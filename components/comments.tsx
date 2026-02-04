"use client"

import { useState, useEffect } from "react"
import Giscus from "@giscus/react"
import Image from "next/image"

export function Comments() {
  // 로딩 상태 관리 (true: 로딩 중, false: 로딩 완료)
  const [isMounted, setIsMounted] = useState(true)

  // [수정] onLoad 대신 메시지 이벤트 리스너로 로딩 감지
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // 보안 확인: giscus.app에서 온 메시지인지 확인
      if (event.origin !== "https://giscus.app") return
      
      // giscus 데이터가 포함된 메시지라면 로딩 완료로 간주
      if (!(typeof event.data === "object" && event.data.giscus)) return

      setIsMounted(false)
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  return (
    <div className="mt-20 pt-10 border-t border-gray-100">
      <div className="w-full min-h-[300px]">
        {/* 1. 로딩 중일 때 보이는 '모나 로딩' GIF */}
        {isMounted && (
          <div className="flex flex-col items-center justify-center py-10 transition-opacity duration-500">
            <div className="relative w-12 h-12 mb-4">
               <Image 
                 src="https://github.githubassets.com/images/mona-loading-default.gif" 
                 alt="Loading..." 
                 fill 
                 className="object-contain"
                 unoptimized // 외부 URL 이미지 바로 허용
               />
            </div>
            <p className="text-sm font-medium text-gray-400 animate-pulse">
              댓글 불러오는 중...
            </p>
          </div>
        )}

        {/* 2. Giscus 댓글창 */}
        <div className={isMounted ? "opacity-0 h-0 overflow-hidden" : "opacity-100 transition-opacity duration-700"}>
          <Giscus
            id="comments"
            repo="minari0v0/minari0v0.github.io"
            repoId="R_kgDOQ6_a0Q"
            category="General"
            categoryId="DIC_kwDOQ6_a0c4C1Uuc"
            mapping="pathname"
            term="Welcome to @giscus/react component!"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme="light"
            lang="ko"
            loading="lazy"
            // onLoad={handleLoad}  <-- [삭제] 이 줄을 지웠습니다!
          />
        </div>
      </div>
    </div>
  )
}
