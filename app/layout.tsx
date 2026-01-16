import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import "./globals.css"

const paperlogy = localFont({
  src: "./fonts/Paperlogy-4Regular.ttf",
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
      <body className={`${paperlogy.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}