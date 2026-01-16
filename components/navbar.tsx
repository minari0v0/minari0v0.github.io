"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/projects", label: "프로젝트" },
  { href: "/blog", label: "스토리" },
  { href: "/about", label: "소개" },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="max-w-[1100px] mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/" className="font-semibold text-lg text-foreground hover:text-primary transition-colors">
          minari0v0
        </Link>

        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/search"
            className={cn(
              "p-2 rounded-md transition-colors hover:bg-accent",
              pathname === "/search" ? "text-primary" : "text-muted-foreground",
            )}
            aria-label="검색"
          >
            <Search className="h-5 w-5" />
          </Link>
        </div>
      </nav>
    </header>
  )
}
