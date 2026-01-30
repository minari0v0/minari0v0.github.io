import { Github, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-[1100px] mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} minari0v0. All rights reserved.</p>
          <div className="flex gap-4">
            <a
              href="https://github.com/minari0v0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#7c9070] transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="mailto:cc360653@gmail.com"
              className="text-gray-400 hover:text-[#7c9070] transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
