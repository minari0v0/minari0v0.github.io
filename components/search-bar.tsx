"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

export function SearchBar() {
  const router = useRouter()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isSearchOpen])

  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => !prev)
  }

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
      setIsSearchOpen(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsSearchOpen(false)
      setQuery("")
    }
  }

  return (
    <div className="relative flex items-center">
      <div
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out",
          isSearchOpen ? "w-48" : "w-0"
        )}
      >
        <form onSubmit={handleSearchSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => setIsSearchOpen(false)}
            placeholder="검색..."
            className={cn(
              "w-full h-9 pl-4 pr-10 rounded-md border border-gray-300 bg-white text-sm transition-opacity duration-300",
              isSearchOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          />
        </form>
      </div>
      
      <button
        onClick={handleSearchToggle}
        className={cn(
          "p-2 rounded-md transition-colors z-10",
          "text-gray-400 hover:text-[#7c9070] hover:bg-[#7c9070]/10"
        )}
        aria-label="Search"
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  )
}
