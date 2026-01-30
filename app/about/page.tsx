import Image from "next/image"
import { Mail, Award, Car, Github, Linkedin, Server, Layout, Cpu, Wrench, Sparkles, GraduationCap } from "lucide-react"

export const metadata = {
  title: "소개 | minari0v0",
  description: "개발자 minari0v0의 포트폴리오 및 소개",
}

// [FINAL FIXED] 아이콘: Java(커피잔), Flask(실험병), VS Code, YOLO(Ultralytics) 등 공식 로고 적용
const skillIcons: { [key: string]: React.ReactNode } = {
  // --- Frontend ---
  "React": <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="React" className="w-6 h-6" />,
  "Next.js": <img src="https://cdn.simpleicons.org/nextdotjs/000000" alt="Next.js" className="w-6 h-6" />,
  "TypeScript": <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="TypeScript" className="w-6 h-6" />,
  "Tailwind CSS": <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="Tailwind CSS" className="w-6 h-6" />,
  "Vue.js": <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg" alt="Vue.js" className="w-6 h-6" />,

  // --- Backend ---
  "Python": <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="Python" className="w-6 h-6" />,
  "Flask": <img src="https://cdn.simpleicons.org/flask/000000" alt="Flask" className="w-6 h-6" />, // 실험실 플라스크 (공식)
  "FastAPI": <img src="https://cdn.simpleicons.org/fastapi/009688" alt="FastAPI" className="w-6 h-6" />,
  "Java": <img src="https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg" alt="Java" className="w-6 h-6" />, // 커피잔 (공식)

  // --- AI & Data ---
  "YOLOv11": <img src="https://cdn.simpleicons.org/ultralytics/0083FD" alt="YOLOv11" className="w-6 h-6" />, // Ultralytics (파란색 로고)
  "Gemini API": <Sparkles className="w-6 h-6 text-[#8E75B2]" />, 
  "MySQL": <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg" alt="MySQL" className="w-6 h-6" />,

  // --- Tools ---
  "Git/GitHub": <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="Git" className="w-6 h-6" />,
  "Docker": <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg" alt="Docker" className="w-6 h-6" />,
  "VS Code": <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg" alt="VS Code" className="w-6 h-6" />,
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
            웹의 근간이 되는 기술부터 최신 AI 트렌드까지 유연하게 흡수하며, 사용자에게 감동을 줄 수 있는 '쓸모 있는 서비스'를 만듭니다.
          </p>

          {/* 버튼 그룹 */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {/* 깃허브 버튼 */}
            <a 
              href="https://github.com/minari0v0" 
              target="_blank" 
              className="group flex items-center gap-3 pl-2 pr-5 py-2 bg-[#24292F] text-white font-bold rounded-xl hover:bg-[#333] hover:-translate-y-1 transition-all shadow-md"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white/30 group-hover:border-white/50 transition-colors">
                <Image 
                  src="https://avatars.githubusercontent.com/u/144759680?v=4&size=64"
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
            
            {/* LinkedIn 버튼 */}
            <a 
              href="https://www.linkedin.com/in/minari0v0/" 
              target="_blank"
              className="flex items-center px-5 py-3 bg-[#0077b5] text-white font-bold rounded-xl hover:bg-[#006097] hover:-translate-y-1 transition-all shadow-md"
            >
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* 구분선 */}
      <hr className="border-dashed border-gray-200 mb-20" />

      {/* 2. Skills 섹션 */}
      <section className="mb-24">
        <h2 className="text-2xl font-bold text-[#333333] mb-8 flex items-center">
          <span className="w-1.5 h-8 bg-[#7c9070] rounded-full mr-3"></span>
          Skills
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Frontend */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Layout className="w-5 h-5 text-[#7c9070]" />
              Frontend
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {["React", "Next.js", "TypeScript", "Vue.js", "Tailwind CSS"].map(skill => (
                <span key={skill} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 font-semibold rounded-xl text-sm border border-gray-200 hover:border-[#7c9070] hover:bg-[#7c9070]/10 transition-colors cursor-default">
                  {skillIcons[skill] || <div className="w-6 h-6 bg-gray-300 rounded-full" />}
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Server className="w-5 h-5 text-[#7c9070]" />
              Backend
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {["Python", "Flask", "FastAPI", "Java", "MySQL"].map(skill => (
                <span key={skill} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 font-semibold rounded-xl text-sm border border-gray-200 hover:border-[#7c9070] hover:bg-[#7c9070]/10 transition-colors cursor-default">
                  {skillIcons[skill] || <div className="w-6 h-6 bg-gray-300 rounded-full" />}
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* AI & Data */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#7c9070]" />
              AI & Data
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {["YOLOv11", "Gemini API"].map(skill => (
                <span key={skill} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 font-semibold rounded-xl text-sm border border-gray-200 hover:border-[#7c9070] hover:bg-[#7c9070]/10 transition-colors cursor-default">
                  {skillIcons[skill] || <div className="w-6 h-6 bg-gray-300 rounded-full" />}
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Tools & DevOps */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-[#7c9070]" />
              Tools & DevOps
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {["Docker", "Git/GitHub", "VS Code"].map(skill => (
                <span key={skill} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 font-semibold rounded-xl text-sm border border-gray-200 hover:border-[#7c9070] hover:bg-[#7c9070]/10 transition-colors cursor-default">
                  {skillIcons[skill] || <div className="w-6 h-6 bg-gray-300 rounded-full" />}
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Projects 섹션 */}
      <section className="mb-24">
        <h2 className="text-2xl font-bold text-[#333333] mb-8 flex items-center">
          <span className="w-1.5 h-8 bg-[#7c9070] rounded-full mr-3"></span>
          Projects
        </h2>
        
        <div className="space-y-8 pl-4 border-l-2 border-gray-100 ml-3">
          
          {/* 포트폴리오 블로그 */}
          <div className="relative pl-8">
            <div className="absolute -left-[21px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[#7c9070]"></div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-baseline mb-2">
              <h3 className="text-xl font-bold text-gray-800">개인 포트폴리오 블로그 개발</h3>
              <span className="text-sm font-bold text-[#7c9070]">2026.01 - 현재</span>
            </div>
            <p className="text-gray-500 text-sm mb-3">Next.js 14, MDX, Tailwind CSS</p>
            <p className="text-gray-600 leading-relaxed max-w-2xl">
              Next.js App Router와 MDX를 활용하여 SEO에 최적화된 정적 블로그를 구축했습니다. 
              Giscus 댓글 연동 및 반응형 UI/UX를 직접 설계 및 구현했습니다.
            </p>
          </div>

          {/* PassCheckers (졸업 프로젝트) */}
          <div className="relative pl-8">
            <div className="absolute -left-[21px] top-1.5 w-4 h-4 rounded-full bg-gray-200"></div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-baseline mb-2">
              <h3 className="text-xl font-bold text-gray-800">PassCheckers (AI 여행 도우미)</h3>
              <span className="text-sm font-bold text-gray-400">2025.03 - 2025.12</span>
            </div>
            <p className="text-gray-500 text-sm mb-3">Team Leader & Full Stack Dev</p>
            <p className="text-gray-600 leading-relaxed max-w-2xl">
              YOLOv11 기반 수하물 분류 및 여행 가이드 플랫폼을 개발했습니다.
              팀 리더로서 TensorRT 추론 가속화 및 Vue.js/Flask 기반의 풀스택 아키텍처를 설계했습니다.
            </p>
          </div>

          {/* 신용카드 사기 탐지 프로젝트 */}
          <div className="relative pl-8">
            <div className="absolute -left-[21px] top-1.5 w-4 h-4 rounded-full bg-gray-200"></div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-baseline mb-2">
              <h3 className="text-xl font-bold text-gray-800">신용카드 사기 탐지 AI</h3>
              <span className="text-sm font-bold text-gray-400">2025.10 - 2025.12</span>
            </div>
            <p className="text-gray-500 text-sm mb-3">AI & Data Engineering</p>
            <p className="text-gray-600 leading-relaxed max-w-2xl">
              Isolation Forest와 SMOTE 기법을 활용하여 불균형 데이터셋(0.17% 사기 비율)에서의 탐지 성능을 극대화했습니다.
              AI 모델 서빙을 위한 FastAPI 백엔드와 모니터링 대시보드(React)까지 전체 풀스택 시스템을 전담하여 구축했습니다.
            </p>
          </div>

          {/* 텅장수강러 */}
          <div className="relative pl-8">
            <div className="absolute -left-[21px] top-1.5 w-4 h-4 rounded-full bg-gray-200"></div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-baseline mb-2">
              <h3 className="text-xl font-bold text-gray-800">텅장수강러 (대학 생활 플랫폼)</h3>
              <span className="text-sm font-bold text-gray-400">2025.04 - 2025.06</span>
            </div>
            <p className="text-gray-500 text-sm mb-3">Java Servlet/JSP, MySQL</p>
            <p className="text-gray-600 leading-relaxed max-w-2xl">
              프레임워크 없이 순수 Java와 표준 웹 기술만으로 MVC 패턴을 직접 구현한 풀스택 프로젝트입니다.
              강의 평가, 시간표, 커뮤니티 기능을 포함한 올인원 학사 관리 서비스를 제작했습니다.
            </p>
          </div>

          {/* Java 소켓 오목 게임 (날짜 및 설명 수정됨) */}
          <div className="relative pl-8">
            <div className="absolute -left-[21px] top-1.5 w-4 h-4 rounded-full bg-gray-200"></div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-baseline mb-2">
              <h3 className="text-xl font-bold text-gray-800">Java 소켓 오목 게임</h3>
              <span className="text-sm font-bold text-gray-400">2024.10 - 2024.12</span>
            </div>
            <p className="text-gray-500 text-sm mb-3">Java Swing, Socket Programming, MySQL</p>
            <p className="text-gray-600 leading-relaxed max-w-2xl">
              프레임워크 없이 순수 Java와 TCP/IP 소켓만으로 멀티 스레딩 게임 서버를 바닥부터 설계 및 구축했습니다.
              `synchronized`를 활용한 동시성 제어와 자체 통신 프로토콜을 정의하여 안정적인 실시간 대전을 구현했으며, Swing 커스텀 렌더링을 통해 직관적인 게임 UI와 채팅 시스템을 완성했습니다.
            </p>
          </div>

        </div>
      </section>

      {/* 4. Education 섹션 */}
      <section className="mb-24">
        <h2 className="text-2xl font-bold text-[#333333] mb-8 flex items-center">
          <span className="w-1.5 h-8 bg-[#7c9070] rounded-full mr-3"></span>
          Education
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 안양대학교 */}
          <div className="flex items-start p-5 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="bg-white p-3 rounded-xl shadow-sm mr-4 text-[#7c9070]">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">안양대학교</h3>
              <p className="text-gray-600 text-sm mb-1 font-medium">소프트웨어학과 학사</p>
              <span className="text-xs font-bold text-white bg-[#7c9070] px-2 py-0.5 rounded-md">2020.03 - 2026.02 (예정)</span>
            </div>
          </div>

          {/* 남강고등학교 */}
          <div className="flex items-start p-5 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="bg-white p-3 rounded-xl shadow-sm mr-4 text-gray-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">남강고등학교</h3>
              <p className="text-gray-500 text-sm mb-1">이과 (자연계열)</p>
              <div className="flex gap-2">
                <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-md">2016.03 - 2018.02</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Certification 섹션 */}
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