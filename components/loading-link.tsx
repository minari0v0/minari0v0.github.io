// components/loading-link.tsx

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import SkeletonView from "@/components/skeleton-view"

interface LoadingLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
  className?: string
}

export default function LoadingLink({ href, children, className, ...props }: LoadingLinkProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname !== href) {
        e.preventDefault() 
        setIsLoading(true) 
        router.push(href)  
    }
  }

  return (
    <>
      <Link href={href} onClick={handleClick} className={className} {...props}>
        {children}
      </Link>

      {isLoading && (
        // [수정 포인트 2가지!]
        // 1. z-index: z-[9999] -> z-40 (헤더보다 낮게)
        // 2. padding-top: pt-[80px] (헤더 높이만큼 내용 밀어주기 - 적절히 조절 가능)
        <div className="fixed inset-0 z-40 pt-[80px] bg-white animate-in fade-in duration-200">
           <SkeletonView />
        </div>
      )}
    </>
  )
}