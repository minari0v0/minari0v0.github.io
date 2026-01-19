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
  const isEnoughItems = itemCount > 3 // 3개 초과일 때만 슬라이드 기능 활성화

  // Embla Carousel 설정 (loop: true -> 무한 스크롤)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: isEnoughItems, // 아이템이 많을 때만 무한 루프
    align: "start",
    slidesToScroll: 1,
    duration: 30, // 부드러운 감도 조절
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
      {/* 1. 헤더 영역 (Flex로 양끝 정렬) */}
      <div className="flex items-end justify-between mb-6">
        {/* 왼쪽: 섹션 제목 */}
        <h2 className="text-2xl font-bold text-[#333333]">{title}</h2>

        {/* 오른쪽: 네비게이션 컨트롤 + 전체보기 */}
        <div className="flex flex-col items-end gap-3">
          
          {/* (1) 화살표 버튼 (아이템 3개 초과일 때만 보임) */}
          {isEnoughItems && (
            <div className="flex items-center gap-2">
              <button
                onClick={scrollPrev}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-matcha-500 hover:text-white hover:border-matcha-500 transition-all active:scale-95"
                aria-label="이전"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollNext}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-matcha-500 hover:text-white hover:border-matcha-500 transition-all active:scale-95"
                aria-label="다음"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* (2) 전체보기 링크 (화살표 아래에 작게 배치) */}
          <Link
            href={viewAllHref}
            className="text-xs text-gray-400 hover:text-matcha-600 hover:underline underline-offset-2 flex items-center gap-1 font-medium transition-colors"
          >
            전체보기 <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* 2. 슬라이드 영역 (Embla Carousel) */}
      <div className="overflow-hidden -mx-4 px-4 py-2" ref={emblaRef}>
        <div className="flex touch-pan-y gap-6"> 
          {/* gap-6는 카드 사이 간격입니다 */}
          {React.Children.map(children, (child, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_32%]" 
              // 모바일: 1개, 태블릿: 2개, 데스크탑: 3개 (gap 고려해서 32% 정도로 설정)
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}