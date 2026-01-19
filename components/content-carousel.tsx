"use client"

import React, { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

interface ContentCarouselProps {
  title: string
  viewAllHref: string
  children: React.ReactNode
}

export function ContentCarousel({
  title,
  viewAllHref,
  children,
}: ContentCarouselProps) {
  // 아이템 개수 확인
  const itemCount = React.Children.count(children)
  
  // 3개 이하면 화살표 숨기기 (데스크탑 기준)
  const showArrows = itemCount > 3 

  // Embla Carousel 설정
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true, // [핵심] 무조건 무한 루프 활성화
    align: "start",
    slidesToScroll: 1,
    duration: 25, // [튜닝] 숫자가 작을수록 '일정한 속도'로 빠르게 샥! 넘어갑니다. (기본값은 약 60이라 처음에 느림)
  })

  // 화살표 기능
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="w-full">
      {/* 1. 헤더 영역 */}
      <div className="flex items-end justify-between mb-6">
        {/* 왼쪽: 섹션 제목 */}
        <h2 className="text-2xl font-bold text-[#333333]">{title}</h2>

        {/* 오른쪽: 네비게이션 컨트롤 + 전체보기 */}
        <div className="flex flex-col items-end gap-3">
          
          {/* (1) 화살표 버튼 (3개 초과일 때만 보임) */}
          {showArrows && (
            <div className="flex items-center gap-2">
              <button
                onClick={scrollPrev}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-[#7c9070] hover:text-white hover:border-[#7c9070] transition-all active:scale-95"
                aria-label="이전"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollNext}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-[#7c9070] hover:text-white hover:border-[#7c9070] transition-all active:scale-95"
                aria-label="다음"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* (2) 전체보기 링크 (말차색 적용) */}
          <Link
            href={viewAllHref}
            className="text-xs text-[#7c9070] hover:text-[#5a6b50] hover:underline underline-offset-2 flex items-center gap-1 font-bold transition-colors"
          >
            전체보기 <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* 2. 슬라이드 영역 (Embla Carousel) */}
      <div className="overflow-hidden -mx-4 px-4 py-4" ref={emblaRef}>
        <div className="flex touch-pan-y gap-6"> 
          {/* gap-6: 카드 사이 간격 */}
          {React.Children.map(children, (child, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_32%]" 
              // 반응형: 모바일 1개 / 태블릿 2개 / 데스크탑 3개
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}