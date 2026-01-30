export interface Project {
  id: string
  title: string
  description: string
  image: string
  techStack: string[]
  date: string
  github?: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  image: string
}

// [FIXED] 더미 데이터 제거 및 실제 프로젝트 데이터(MDX 기반)로 교체
export const projects: Project[] = [
  {
    id: "passcheckers",
    title: "PassCheckers",
    description: "AI 이미지 분석 기반 수하물 분류 및 여행 도우미 애플리케이션",
    image: "/images/projects/passcheckers/main.gif", // MDX의 thumbnail 경로
    techStack: ["Vue.js", "Flask", "YOLOv11", "MySQL", "Nginx"],
    date: "2025.03 - 2025.12",
    github: "https://github.com/minari0v0/PassCheckers",
  },
  {
    id: "anomaly-dashboard",
    title: "금융 이상 거래 탐지 시스템",
    description: "금융 빅데이터 기반 실시간 신용카드 사기 탐지 및 모니터링 시스템",
    image: "/images/projects/anomaly-dashboard/main.png",
    techStack: ["Python", "FastAPI", "React", "Scikit-learn", "Docker"],
    date: "2025.10 - 2025.12",
    github: "https://github.com/silok/anomaly-dashboard-project",
  },
  {
    id: "tungzang",
    title: "텅장수강러",
    description: "대학생들을 위한 강의 평가 및 정보 공유 커뮤니티",
    image: "/images/projects/tungzang/Thumbnail.png",
    techStack: ["Java", "JSP", "Servlet", "MySQL", "jQuery"],
    date: "2025.04 - 2025.06",
    github: "https://github.com/minari0v0/tungzang",
  },
  {
    id: "java-omok",
    title: "Java 소켓 기반 온라인 오목 게임",
    description: "Java 소켓 통신과 Swing을 활용하여 구현한 2인용 오목 게임",
    image: "/images/projects/java-omok/Thumbnail.png",
    techStack: ["Java", "Swing", "Socket", "Multi-threading"],
    date: "2024.10 - 2024.12",
    github: "https://github.com/minari0v0/java_omok",
  },
]

// [FIXED] 더미 블로그 데이터 제거 (나중에 실제 데이터가 생기면 추가하세요)
export const blogPosts: BlogPost[] = []

export const skills = {
  frontend: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js"],
  backend: ["Python", "Flask", "FastAPI", "Java", "MySQL"],
  tools: ["Git", "Docker", "VS Code", "Figma"],
}