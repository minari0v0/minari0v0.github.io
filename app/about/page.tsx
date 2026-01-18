import Image from "next/image"

export const metadata = {
  title: "소개 | minari0v0",
  description: "개발자 minari0v0의 소개 페이지입니다.",
}

// 1. 프로필 정보 (검은 뱃지 옆에 들어갈 내용들)
const profileInfo = [
  { label: "이름", value: "minari0v0 (미나리)" }, // 본명으로 바꾸셔도 됩니다
  { label: "직무", value: "Backend Developer & Designer" },
  { label: "이메일", value: "hello@minari0v0.dev" }, // 실제 이메일 입력
  { label: "취미", value: "코딩, 기술 블로그 운영, 카페 투어, 고양이 영상 보기" },
  {
    label: "소개",
    value:
      "상상을 현실로 만드는 것을 좋아하는 개발자입니다. 사용자 경험을 최우선으로 생각하며, 유지보수하기 좋은 깔끔한 코드를 지향합니다. 배운 것을 기록하고 공유하는 문화에 기여하고 싶습니다.",
  },
]

// 2. 활동 및 이력 데이터
const activities = [
  {
    title: "Activity",
    items: [
      "(2026.01 ~ ing) GS Neotek CDN 인프라 엔지니어 인턴",
      "(2025.10 ~ 2025.12) 캡스톤 디자인 'PassCheckers' 프로젝트 팀장",
      "(2025.03 ~ 2025.06) 교내 알고리즘 동아리 'Algo' 멘토",
    ],
  },
  {
    title: "Certification",
    items: [
      "(2025.08) 정보처리기사",
      "(2024.11) SQLD (SQL 개발자)",
      "(2024.05) ADsP (데이터분석 준전문가)",
    ],
  },
]

// 3. 기술 스택 데이터
const skills = {
  Frontend: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Zustand"],
  Backend: ["Node.js", "Express", "NestJS", "Python", "MySQL"],
  DevOps: ["Docker", "AWS (EC2, S3)", "GitHub Actions", "Vercel"],
  Tools: ["Git", "Figma", "Notion", "Slack"],
}

export default function AboutPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-16 md:py-20">
      
      {/* 1. 상단 프로필 섹션 (Lucid Dream 스타일) */}
      <section className="mb-20">
        {/* 섹션 타이틀 (말차색 바 포인트) */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-8 bg-matcha-500 rounded-sm" /> {/* 포인트 컬러 바 */}
          <h2 className="text-3xl font-bold text-gray-900">About Me</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* 왼쪽: 프로필 이미지 (크고 시원하게) */}
          <div className="w-full md:w-1/3 flex justify-center md:justify-start">
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <Image
                src="/minimal-avatar-illustration-developer.jpg" // 본인 이미지 경로 확인
                alt="Profile Image"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* 오른쪽: 프로필 정보 리스트 */}
          <div className="w-full md:w-2/3 space-y-4">
            {profileInfo.map((info, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-6">
                {/* 검은색 라벨 뱃지 */}
                <span className="shrink-0 w-20 py-1.5 text-center text-xs font-bold text-white bg-[#333333] rounded-md tracking-wide">
                  {info.label}
                </span>
                {/* 값 */}
                <span className="text-gray-700 leading-relaxed font-medium">
                  {info.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. 활동 및 이력 섹션 (타임라인 스타일) */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-8 bg-matcha-500 rounded-sm" />
          <h2 className="text-3xl font-bold text-gray-900">Communities</h2>
        </div>

        <div className="space-y-10 pl-2">
          {activities.map((section) => (
            <div key={section.title}>
              <h3 className="text-xl font-bold text-gray-800 mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-600 hover:text-matcha-500 transition-colors">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" /> {/* 불렛 포인트 */}
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 기술 스택 섹션 (뱃지 스타일) */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-8 bg-matcha-500 rounded-sm" />
          <h2 className="text-3xl font-bold text-gray-900">Tech Stack</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pl-2">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2 inline-block">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm font-medium rounded-lg bg-white border border-gray-200 text-gray-600 shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}