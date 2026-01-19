"use client"

import React, { useCallback } from "react"
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
  const showArrows = itemCount > 3

  // Embla Carousel 설정
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true, // 무한 루프
    align: "start",
    slidesToScroll: 1,
    duration: 25, // 부드러운 속도감
  })

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
        <h2 className="text-2xl font-bold text-[#333333]">{title}</h2>

        <div className="flex flex-col items-end gap-3">
          {/* 화살표 버튼 */}
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

          {/* 전체보기 링크 */}
          <Link
            href={viewAllHref}
            className="text-xs text-[#7c9070] hover:text-[#5a6b50] hover:underline underline-offset-2 flex items-center gap-1 font-bold transition-colors"
          >
            전체보기 <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* 2. 슬라이드 영역 (구조 변경됨) */}
      <div className="overflow-hidden -mx-4 px-4 py-4" ref={emblaRef}>
        {/* gap-6 대신 -ml-6 (왼쪽 마진 상쇄) 사용 */}
        <div className="flex touch-pan-y -ml-6"> 
          {React.Children.map(children, (child, index) => (
            <div
              key={index}
              // gap 대신 pl-6 (왼쪽 패딩)으로 간격 생성 -> 루프 계산 오류 해결!
              className="flex-[0_0_100%] min-w-0 pl-6 md:flex-[0_0_50%] lg:flex-[0_0_33.33333%]" 
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}