import { Github } from "lucide-react"

export function GithubButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-bold text-white transition-all duration-300 bg-gray-900 rounded-lg group hover:bg-gray-800 hover:scale-105 active:scale-95 focus:outline-none ring-offset-2 focus:ring-2 ring-gray-400"
    >
      {/* 배경 효과: 마우스 호버 시 살짝 빛나는 느낌 */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* 아이콘 및 텍스트 */}
      <Github className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
      <span className="relative">GitHub 저장소</span>
      
      {/* 우측 상단 장식 점 (GitHub 잔디 느낌의 녹색 점) */}
      <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#4ade80] rounded-full animate-pulse shadow-[0_0_8px_#4ade80]" />
    </a>
  )
}