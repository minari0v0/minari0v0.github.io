import Image from "next/image"
import { Github, Mail } from "lucide-react"

export const metadata = {
  title: "소개 | minari0v0",
  description: "개발자 minari0v0의 소개 페이지입니다.",
}

const skills = {
  Frontend: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js"],
  Backend: ["Node.js", "Express", "MongoDB", "PostgreSQL", "GraphQL"],
  Tools: ["Git", "Figma", "VS Code", "Docker", "Vercel"],
}

export default function AboutPage() {
  return (
    <div className="max-w-[1100px] mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Profile Section - Flex Row Layout */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
          {/* Left: Large Circular Avatar */}
          <div className="shrink-0">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#7c9070]/20">
              <Image
                src="/minimal-avatar-illustration-developer.jpg"
                alt="Profile"
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Right: Name, Email, Intro */}
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl font-bold text-[#333333]">minari0v0</h1>
            <p className="text-gray-500 text-sm mt-1">Developer & Designer</p>

            {/* Contact Links */}
            <div className="flex gap-3 mt-3 justify-center sm:justify-start">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#7c9070] transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@minari0v0.dev"
                className="text-gray-400 hover:text-[#7c9070] transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            {/* Intro Text */}
            <p className="mt-4 text-[#333333]/80 text-sm leading-relaxed max-w-md">
              안녕하세요! 깔끔한 디자인과 직관적인 인터페이스를 중요하게 생각하는 개발자입니다. 사용자 경험을 최우선으로
              생각하며, 접근성과 성능을 모두 갖춘 웹 애플리케이션을 만듭니다.
            </p>
          </div>
        </div>

        {/* Skills Section - Immediately below with spacing */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-[#333333] mb-6">기술 스택</h2>
          <div className="space-y-5">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-sm font-medium text-gray-500 mb-3">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 text-sm rounded-full bg-gray-100 text-[#333333]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
