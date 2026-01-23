import Image from "next/image"
import { Mail, FileText, Award, Car, Github } from "lucide-react"

export const metadata = {
  title: "소개 | minari0v0",
  description: "개발자 minari0v0의 포트폴리오 및 소개",
}

// [NEW] 아이콘 매핑 (Skills 섹션용)
const skillIcons: { [key: string]: React.ReactNode } = {
  "React": <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.182c4.238 0 7.928 2.69 9.37 6.515H16.32c-1.223-2.81-3.87-4.907-7.1-5.338C10.08 3.09 11.018 3 12 3c.325 0 .644.022.958.065zM4.537 4.938c2.42 1.62 5.42 2.58 8.65 2.58s6.23-.96 8.65-2.58c-2.42 1.62-5.42 2.58-8.65 2.58s-6.23-.96-8.65-2.58zm16.834 5.26C20.276 6.576 17.288 3.87 13.35 2.83c2.51 1.363 4.64 3.663 5.923 6.516h2.098zM2.182 12c0-4.238 2.69-7.928 6.515-9.37C5.887 3.853 3.79 6.5 3.36 9.73c-.274.86-.418 1.798-.418 2.78 0 .325.022.644.065.958C3.853 18.113 6.5 20.21 9.73 20.64c-.86.274-1.798.418-2.78.418-4.238 0-7.928-2.69-9.37-6.515H4.23c1.363 2.51 3.663 4.64 6.516 5.923C6.576 17.724 3.87 14.736 2.83 10.798H2.182zm2.182 9.818H9.73c1.223 2.81 3.87 4.907 7.1 5.338-.86.274-1.798.418-2.78.418-4.238 0-7.928-2.69-9.37-6.515zm9.818 0c-1.223-2.81-3.87-4.907-7.1-5.338.86-.274 1.798-.418 2.78-.418 4.238 0 7.928 2.69 9.37 6.515H13.18zM12 6c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 2.182c2.108 0 3.818 1.71 3.818 3.818S14.108 15.818 12 15.818 8.182 14.108 8.182 12 9.892 8.182 12 8.182z"/></svg>,
  "Next.js": <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM9.99 15.669h1.31v-6.11l4.098 6.11h1.407V9.33h-1.31v5.92l-3.956-5.92H9.99v6.34zM18.747 12c0-3.72-3.028-6.748-6.748-6.748-3.72 0-6.748 3.028-6.748 6.748 0 3.72 3.028 6.748 6.748 6.748 3.72 0 6.748-3.028 6.748-6.748zM8.49 12c0 1.933 1.577 3.51 3.51 3.51 1.933 0 3.51-1.577 3.51-3.51 0-1.933-1.577-3.51-3.51-3.51-1.933 0-3.51 1.577-3.51 3.51z"/></svg>,
  "TypeScript": <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM12.9 10.69h-1.99v6.27h-2.33v-6.27H6.59v-1.99h6.31v1.99zm4.67 6.27h-2.33V8.7h2.33v8.26z"/></svg>,
  "Tailwind CSS": <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624-1.177-1.194-2.538-2.576-5.512-2.576z"/></svg>,
  "Node.js": <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 23.994c-6.627 0-12-5.373-12-12S5.373 0 12 0s12 5.373 12 12-5.373 11.994-12 11.994zM12.558 6.55a1.188 1.188 0 0 0-1.047.605l-3.661 6.343a1.188 1.188 0 0 0 .447 1.635c.56.322 1.26.176 1.635-.447l.876-1.517h2.885l.876 1.517c.375.623 1.075.769 1.635.447.56-.322.769-1.022.447-1.635L13.605 7.155a1.188 1.188 0 0 0-1.047-.605zm-1.434 4.35l.876-1.517.876 1.517H11.124z"/></svg>,
  "Git/GitHub": <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.234c-3.338.725-4.033-1.415-4.033-1.415-.545-1.387-1.332-1.755-1.332-1.755-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.236 1.839 1.236 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.234-3.22-.123-.303-.534-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.22 0 4.609-2.807 5.625-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>,
  "Figma": <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zM9.99 15.669h1.31v-6.11l4.098 6.11h1.407V9.33h-1.31v5.92l-3.956-5.92H9.99v6.34zM18.747 12c0-3.72-3.028-6.748-6.748-6.748-3.72 0-6.748 3.028-6.748 6.748 0 3.72 3.028 6.748 6.748 6.748 3.72 0 6.748-3.028 6.748-6.748zM8.49 12c0 1.933 1.577 3.51 3.51 3.51 1.933 0 3.51-1.577 3.51-3.51 0-1.933-1.577-3.51-3.51-3.51-1.933 0-3.51 1.577-3.51 3.51z"/></svg>,
  // 나머지 기술들은 기본 아이콘 사용
};

export default function AboutPage() {
  return (
    <div className="max-w-[1000px] mx-auto px-6 py-20">
      
      {/* 1. 프로필 섹션 */}
      <section className="flex flex-col md:flex-row gap-12 items-center mb-24">
        
        {/* 캐릭터 이미지 영역 */}
        <div className="relative w-full max-w-[360px] aspect-[2/3] md:w-[320px] flex-shrink-0 rounded-3xl overflow-hidden border border-gray-100 shadow-xl bg-[#e3e8e1]">
           <Image 
             src="/me_character.png" 
             alt="Profile Character"
             fill
             className="object-cover hover:scale-105 transition-transform duration-700"
             priority
           />
        </div>

        {/* 소개 멘트 & 버튼 영역 */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-lg font-bold text-[#7c9070] mb-2 tracking-wide uppercase">
            Full Stack Developer
          </h2>
          
          {/* 헤드라인 */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#333333] mb-6 leading-tight break-keep">
            빠르게 만들고, <br />
            <span className="relative inline-block">
              <span className="relative z-10">깊게 다듬습니다.</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-[#D8E983]/60 -z-0"></span>
            </span>
          </h1>

          {/* 본문 */}
          <p className="text-gray-600 text-lg leading-relaxed mb-8 break-keep">
            아이디어를 현실로 만드는 시간은 짧게, 완성도를 높이는 고민은 깊게 가져갑니다. 
            효율적인 개발 프로세스로 생산성을 극대화하고, 남는 에너지는 오직 사용자에게 감동을 줄 디테일을 완성하는 데 쏟습니다.
          </p>

          {/* 버튼 그룹 */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            
            {/* [NEW] 깃허브 프로필 버튼 (사진 + 닉네임) */}
            <a 
              href="https://github.com/minari0v0" 
              target="_blank" 
              className="group flex items-center gap-3 pl-2 pr-5 py-2 bg-[#24292F] text-white font-bold rounded-xl hover:bg-[#333] hover:-translate-y-1 transition-all shadow-md"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white/30 group-hover:border-white/50 transition-colors">
                <Image 
                  src="https://avatars.githubusercontent.com/u/144759680?v=4&size=64" // [필수] 본인 프로필 이미지 URL
                  alt="minari0v0" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] font-medium text-gray-300 mb-0.5">GitHub</span>
                <span>minari0v0</span>
              </div>
            </a>

            {/* 이메일 버튼 */}
            <a 
              href="mailto:cc360653@gmail.com" 
              className="flex items-center px-5 py-3 bg-white text-gray-700 font-bold border border-gray-200 rounded-xl hover:border-[#7c9070] hover:text-[#7c9070] hover:-translate-y-1 transition-all shadow-sm"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email
            </a>
            
            {/* 이력서 다운로드 버튼 */}
            <a 
              href="/resume.pdf" 
              target="_blank"
              className="flex items-center px-5 py-3 bg-[#7c9070] text-white font-bold rounded-xl hover:bg-[#6a7d5f] hover:-translate-y-1 transition-all shadow-md"
            >
              <FileText className="w-5 h-5 mr-2" />
              이력서 다운로드
            </a>
          </div>
        </div>
      </section>

      {/* 구분선 */}
      <hr className="border-dashed border-gray-200 mb-20" />

      {/* 2. Skills 섹션 ([NEW] 아이콘 적용) */}
      <section className="mb-24">
        <h2 className="text-2xl font-bold text-[#333333] mb-8 flex items-center">
          <span className="w-1.5 h-8 bg-[#7c9070] rounded-full mr-3"></span>
          Skills
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Frontend */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              Frontend
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {["React", "Next.js", "TypeScript", "Tailwind CSS", "Zustand"].map(skill => (
                <span key={skill} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 font-semibold rounded-xl text-sm border border-gray-200 hover:border-[#7c9070] hover:bg-[#7c9070]/10 transition-colors cursor-default">
                  {skillIcons[skill] || <div className="w-4 h-4 bg-gray-300 rounded-full" />} {/* 아이콘 없으면 기본 원형 */}
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Backend & Tools */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              Backend & Tools
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {["Node.js", "Supabase", "Git/GitHub", "Figma"].map(skill => (
                <span key={skill} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 font-semibold rounded-xl text-sm border border-gray-200 hover:border-[#7c9070] hover:bg-[#7c9070]/10 transition-colors cursor-default">
                  {skillIcons[skill] || <Github className="w-4 h-4" />} {/* 기본 아이콘 설정 */}
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Experience 섹션 (기존 유지) */}
      <section className="mb-24">
        <h2 className="text-2xl font-bold text-[#333333] mb-8 flex items-center">
          <span className="w-1.5 h-8 bg-[#7c9070] rounded-full mr-3"></span>
          Experience
        </h2>
        
        <div className="space-y-8 pl-4 border-l-2 border-gray-100 ml-3">
          {/* 경험 1 */}
          <div className="relative pl-8">
            <div className="absolute -left-[21px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[#7c9070]"></div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-baseline mb-2">
              <h3 className="text-xl font-bold text-gray-800">개인 포트폴리오 블로그 개발</h3>
              <span className="text-sm font-bold text-[#7c9070]">2026.01 - 현재</span>
            </div>
            <p className="text-gray-500 text-sm mb-3">Next.js, MDX, Tailwind CSS</p>
            <p className="text-gray-600 leading-relaxed max-w-2xl">
              Next.js 14 App Router를 활용하여 정적 블로그를 구축했습니다. 
              SEO 최적화 및 Giscus 댓글 연동, 반응형 UI를 직접 구현하며 웹 최적화 경험을 쌓았습니다.
            </p>
          </div>

          {/* 경험 2 */}
          <div className="relative pl-8">
            <div className="absolute -left-[21px] top-1.5 w-4 h-4 rounded-full bg-gray-200"></div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-baseline mb-2">
              <h3 className="text-xl font-bold text-gray-800">OOO 부트캠프 수료</h3>
              <span className="text-sm font-bold text-gray-400">2025.09 - 2025.12</span>
            </div>
            <p className="text-gray-500 text-sm mb-3">Frontend Course</p>
            <p className="text-gray-600 leading-relaxed max-w-2xl">
              16주간의 집중 과정을 통해 JavaScript 심화 및 React 생태계를 학습했습니다.
              팀 프로젝트 리더를 맡아 4인 팀을 이끌고 우수 프로젝트상을 수상했습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Certification 섹션 (기존 유지) */}
      <section>
        <h2 className="text-2xl font-bold text-[#333333] mb-8 flex items-center">
          <span className="w-1.5 h-8 bg-[#7c9070] rounded-full mr-3"></span>
          Certification
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 정보처리기사 */}
          <div className="flex items-start p-5 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="bg-white p-3 rounded-xl shadow-sm mr-4 text-[#7c9070]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">정보처리기사</h3>
              <p className="text-gray-500 text-sm mb-1">한국산업인력공단</p>
              <span className="text-xs font-bold text-white bg-[#7c9070] px-2 py-0.5 rounded-md">2025.09</span>
            </div>
          </div>

          {/* 운전면허증 */}
          <div className="flex items-start p-5 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="bg-white p-3 rounded-xl shadow-sm mr-4 text-gray-400">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">1종 보통 운전면허</h3>
              <p className="text-gray-500 text-sm mb-1">서울특별시경찰청장</p>
              <div className="flex gap-2">
                <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-md">2022.12</span>
                <span className="text-xs font-bold text-gray-400 border border-gray-300 px-2 py-0.5 rounded-md">Etc</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}