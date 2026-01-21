import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import "./globals.css"
import "katex/dist/katex.min.css";

// 폰트 설정 (app/fonts 폴더 안에 파일이 있어야 함)
const paperlogy = localFont({
  src: [
    { path: "./fonts/Paperlogy-4Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Paperlogy-5Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Paperlogy-7Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-paperlogy",
  display: "swap",
})

export const metadata: Metadata = {
  title: "minari0v0's blog",
  description: "프로젝트와 스토리를 기록하는 개발자 아카이브"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      {/* [수정] 'font-sans' 클래스 제거! 
         이제 globals.css의 body 스타일이 적용되어 Paperlogy 폰트가 나옵니다.
      */}
      <body className={`${paperlogy.variable} antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}