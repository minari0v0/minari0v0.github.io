"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProjectCard } from "./project-card"
import type { BlogPost } from "@/lib/data"

interface StoryCarouselProps {
  posts: BlogPost[]
}

export function StoryCarousel({ posts }: StoryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScrollButtons()
    const container = scrollRef.current
    if (container) {
      container.addEventListener("scroll", checkScrollButtons)
      return () => container.removeEventListener("scroll", checkScrollButtons)
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="relative">
      {/* Navigation Controls */}
      <div className="absolute -top-14 right-0 flex gap-2">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center transition-all hover:border-[#7c9070] hover:text-[#7c9070] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-inherit"
          aria-label="이전"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center transition-all hover:border-[#7c9070] hover:text-[#7c9070] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-inherit"
          aria-label="다음"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {posts.map((post) => (
          <div key={post.id} className="flex-shrink-0 w-[320px]" style={{ scrollSnapAlign: "start" }}>
            <ProjectCard
              id={post.id}
              title={post.title}
              description={post.excerpt}
              image={post.image}
              date={post.date}
              href={`/blog/${post.id}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
