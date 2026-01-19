"use client"

import { useState, useEffect, useCallback, ReactNode, Children } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

interface ContentCarouselProps {
  title: string
  viewAllHref: string
  children: ReactNode // [변경] 데이터 대신 그려진 자식 요소들을 받음
}

export function ContentCarousel({
  title,
  viewAllHref,
  children,
}: ContentCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsToShow, setCardsToShow] = useState(1)

  // children을 배열로 변환 (ReactNode를 배열처럼 다루기 위함)
  const items = Children.toArray(children)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setCardsToShow(3)
      else if (window.innerWidth >= 768) setCardsToShow(2)
      else setCardsToShow(1)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const maxIndex = Math.max(0, items.length - cardsToShow)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1))
  }, [maxIndex])

  if (items.length === 0) return null

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-[#333333]">{title}</h2>
        <div className="flex items-center gap-4 self-end sm:self-auto">
          <div className="flex items-center gap-2">
            <button 
              onClick={prevSlide} 
              className="p-2 rounded-full border border-gray-200 hover:bg-matcha-500 hover:text-white hover:border-matcha-500 transition-all active:scale-95 text-gray-500"
              aria-label="이전"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextSlide} 
              className="p-2 rounded-full border border-gray-200 hover:bg-matcha-500 hover:text-white hover:border-matcha-500 transition-all active:scale-95 text-gray-500"
              aria-label="다음"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="h-4 w-px bg-gray-300 mx-2 hidden sm:block"></div>
          <Link href={viewAllHref} className="text-sm text-[#7c9070] hover:underline underline-offset-4 flex items-center gap-1 font-medium whitespace-nowrap">
            전체보기 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="relative overflow-hidden -mx-4 px-4 py-4">
        <div 
          className="flex transition-transform duration-500 ease-in-out will-change-transform" 
          style={{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }}
        >
          {items.map((child, index) => (
            <div 
              key={index} 
              className="w-full flex-shrink-0 px-3" 
              style={{ flexBasis: `${100 / cardsToShow}%` }}
            >
              <div className="h-full">
                {child} {/* 이미 그려진 컴포넌트를 보여주기만 함 */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}