"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createPortal } from "react-dom" // [추가] 리액트 포털 불러오기
import SkeletonView from "@/components/skeleton-view"

interface LoadingLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
  className?: string
}

export default function LoadingLink({ href, children, className, ...props }: LoadingLinkProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  // 컴포넌트가 마운트된 후에만 Portal을 사용할 수 있음 (Hydration 에러 방지)
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 현재 페이지가 아닐 때만 로딩 시작
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

      {/* [핵심 수정] 
         isLoading 상태일 때, createPortal을 사용해 
         스켈레톤 화면을 document.body(최상위)로 강제 이동시킵니다.
         이제 카드의 transform 속성에 영향을 받지 않고 전체 화면을 덮습니다.
      */}
      {isLoading && mounted && createPortal(
        <div className="fixed inset-0 z-40 pt-[80px] bg-white animate-in fade-in duration-200">
           <SkeletonView />
        </div>,
        document.body
      )}
    </>
  )
}