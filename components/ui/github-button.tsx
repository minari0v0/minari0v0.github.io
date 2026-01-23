import { Github } from "lucide-react"

export function GithubButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-bold text-white transition-all duration-300 bg-gray-900 rounded-lg group hover:bg-gray-800 hover:scale-105 active:scale-95 focus:outline-none ring-offset-2 focus:ring-2 ring-gray-400"
    >
      
      {/* 아이콘 및 텍스트 */}
      <Github className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
      <span className="relative">GitHub 저장소</span>
      
    </a>
  )
}