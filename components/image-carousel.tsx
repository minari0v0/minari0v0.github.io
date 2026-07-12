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
import { Maximize2, X, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselImage {
  src: string
  alt: string
  caption?: string
  aspect?: "video" | "auto" | "square" | "cinema" | "mobile"
}

interface ImageCarouselProps {
  images: CarouselImage[]
  aspectRatio?: "video" | "auto" | "square" | "cinema" | "mobile"
}

export default function ImageCarousel({
  images,
}: ImageCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const [zoom, setZoom] = React.useState(1)

  React.useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  // 모달 활성화 시 키보드 단축키(좌우 화살표로 이동, Esc로 닫기) 지원
  React.useEffect(() => {
    if (!isFullscreen || !api) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        api.scrollPrev()
        setZoom(1)
      } else if (e.key === "ArrowRight") {
        api.scrollNext()
        setZoom(1)
      } else if (e.key === "Escape") {
        setIsFullscreen(false)
        setZoom(1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isFullscreen, api])

  if (!images || images.length === 0) return null

  const currentImage = images[current - 1]

  const handleZoomIn = () => setZoom((prev) => Math.min(3, prev + 0.2))
  const handleZoomOut = () => setZoom((prev) => Math.max(0.5, prev - 0.2))
  const handleZoomReset = () => setZoom(1)

  return (
    <div className="my-8 w-full select-none" data-slot="mdx-image-carousel">
      <Carousel 
        setApi={setApi} 
        opts={{ align: "center", loop: false }}
        className="w-full relative group"
      >
        {/* 1. 슬라이드 본체 (높이 고정 h-[350px] md:h-[500px] 설정) */}
        <CarouselContent className="-ml-0 items-center h-[350px] md:h-[500px]">
          {images.map((image, index) => {
            return (
              // [중요] 완벽히 매끄러운 스크롤 애니메이션을 위해 CarouselItem의 너비를 basis-full(100%)로 균일화합니다.
              <CarouselItem key={index} className="pl-0 basis-full w-full h-full flex items-center justify-center px-4">
                {/* 
                  [중요] 이미지 카드: 100% 크기로 차고, 이미지는 object-contain에 의해
                  비율 왜곡이나 잘림 없이 예쁘게 노출됩니다. 불필요한 hover 딤드 및 뱃지를 제거했습니다.
                */}
                <div
                  onClick={() => setIsFullscreen(true)}
                  className="relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-950/5 shadow-inner dark:bg-white/5 w-full h-full cursor-zoom-in"
                >
                  {/* 배경 블러 효과 */}
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
                        unoptimized
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1100px"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>

        {/* 2. 네비게이션 화살표 */}
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
            key={current}
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

      {/* 5. 줌인/줌아웃 전체화면 확대 모달 */}
      {isFullscreen && currentImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between items-center p-6 text-white select-none animate-in fade-in duration-200">
          {/* 모달 헤더 */}
          <div className="w-full flex items-center justify-between z-10">
            <h3 className="font-bold text-lg text-gray-200">
              {currentImage.alt}
            </h3>
            <button
              onClick={() => {
                setIsFullscreen(false)
                setZoom(1)
              }}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* 모달 이미지 본문 (확대 시 오버플로우 스크롤 지원 및 좌우 네비게이션 배치) */}
          <div className="flex-1 w-full overflow-auto flex items-center justify-center p-4 relative">
            {/* 모달용 이전(왼쪽) 화살표 버튼 */}
            {images.length > 1 && current > 1 && (
              <button
                onClick={() => {
                  api?.scrollPrev()
                  setZoom(1)
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer text-white z-20"
                title="이전 이미지"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}

            <div
              className="transition-transform duration-200 ease-out max-w-none max-h-none flex items-center justify-center"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "center center",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className="max-w-[80vw] max-h-[75vh] object-contain rounded-xl shadow-2xl bg-gray-950 border border-white/5"
              />
            </div>

            {/* 모달용 다음(오른쪽) 화살표 버튼 */}
            {images.length > 1 && current < count && (
              <button
                onClick={() => {
                  api?.scrollNext()
                  setZoom(1)
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer text-white z-20"
                title="다음 이미지"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            )}
          </div>

          {/* 하단 줌 컨트롤 패널 */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-lg z-10">
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
    </div>
  )
}
