"use client"

import * as React from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

interface CarouselImage {
  src: string
  alt: string
  caption?: string
}

interface ImageCarouselProps {
  images: CarouselImage[]
  aspectRatio?: "video" | "auto" | "square" | "cinema" | "mobile"
}

export default function ImageCarousel({
  images,
  aspectRatio = "video",
}: ImageCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  if (!images || images.length === 0) return null

  // 종횡비 클래스 매핑
  const aspectClass = {
    video: "aspect-video w-full", // 16:9 (일반적인 웹 화면)
    cinema: "aspect-[21/9] w-full", // 21:9 (울트라와이드 웹 화면)
    square: "aspect-square w-full md:max-w-[500px] mx-auto", // 1:1 (정사각형)
    mobile: "aspect-[9/16] w-full max-w-[320px] mx-auto", // 9:16 (모바일 세로 화면)
    auto: "h-[350px] md:h-[500px] w-full", // 가로/세로 스크린샷 혼합 시 추천 (높이 기준 맞춤)
  }[aspectRatio]

  const currentImage = images[current - 1]

  return (
    <div className="my-8 w-full select-none" data-slot="mdx-image-carousel">
      <Carousel setApi={setApi} className="w-full relative group">
        {/* 1. 슬라이드 본체 */}
        <CarouselContent className="-ml-0">
          {images.map((image, index) => (
            <CarouselItem key={index} className="pl-0">
              <div
                className={cn(
                  "relative w-full overflow-hidden rounded-2xl border border-gray-100 bg-gray-950/5 shadow-inner dark:bg-white/5",
                  aspectClass
                )}
              >
                {/* 배경 블러 효과 (더욱 프리미엄한 느낌을 위해 이미지 뒷배경에 배치) */}
                <div
                  className="absolute inset-0 bg-cover bg-center blur-2xl opacity-15 scale-105 pointer-events-none"
                  style={{ backgroundImage: `url(${image.src})` }}
                />

                {/* 실제 스크린샷 이미지 */}
                <div className="absolute inset-0 flex items-center justify-center p-2 md:p-4">
                  <div className="relative w-full h-full">
                    <Image
                      src={image.src}
                      alt={image.alt || `스크린샷 ${index + 1}`}
                      fill
                      className="object-contain"
                      unoptimized // 외부 링크나 로컬 정적 배포 이미지 호환성 고려
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1100px"
                      priority={index === 0}
                    />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* 2. 네비게이션 화살표 (2개 이상일 때만 표시, 호버 시 노출) */}
        {images.length > 1 && (
          <>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 hover:bg-[#7c9070] hover:text-white border-none shadow-md z-10 size-10" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 hover:bg-[#7c9070] hover:text-white border-none shadow-md z-10 size-10" />
          </>
        )}

        {/* 3. 우측 하단 인덱스 뱃지 */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-gray-900/70 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-white/90 shadow-sm z-10">
            {current} / {count}
          </div>
        )}
      </Carousel>

      {/* 4. 캡션 설명글 영역 */}
      {currentImage && (
        <div className="mt-4 px-4 py-4 rounded-xl border border-gray-100 bg-gray-50/50 dark:bg-gray-900/20 backdrop-blur-xs min-h-[72px] flex flex-col justify-center">
          <div
            key={current} // 현재 인덱스가 바뀔 때 리렌더링하여 애니메이션 효과 발생
            className="animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out"
          >
            {/* 스크린샷 이름 */}
            <h4 className="text-sm font-bold text-[#7c9070] mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7c9070]" />
              {currentImage.alt}
            </h4>
            {/* 설명 텍스트 */}
            {currentImage.caption ? (
              <p className="text-sm font-medium text-gray-500 leading-relaxed break-keep">
                {currentImage.caption}
              </p>
            ) : (
              <p className="text-sm font-medium text-gray-400 italic">
                설명이 등록되지 않은 이미지입니다.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
