// lib/tag-mapper.ts
// ** 나중에 content/projects/ 에 새로 작성 시, 아래 없는 스택 삽입 시, 아래에 추가

// 기술 스택 분류 정의
const TECH_CATEGORIES: Record<string, string[]> = {
  "Frontend": [
    "HTML", "CSS", "JavaScript", "TypeScript", "React", "Vue.js", "Next.js", 
    "TailwindCSS", "Bootstrap", "JSP", "Thymeleaf", "Swing", "JavaFX"
  ],
  "Backend": [
    "Node.js", "Express", "NestJS", "Java", "Spring", "Spring Boot", 
    "Python", "Django", "Flask", "FastAPI", "PHP", "Go", "Servlet"
  ],
  "Mobile": [
    "Flutter", "React Native", "Swift", "Kotlin", "Android", "iOS"
  ],
  "AI & Data": [
    "Python", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "PyTorch", 
    "YOLO", "OpenCV", "Jupyter Notebook", "R", "Deep Learning", "Machine Learning"
  ],
  "Database": [
    "MySQL", "PostgreSQL", "MongoDB", "Redis", "Oracle", "MariaDB", "SQLite", "Firebase"
  ],
  "DevOps & Tools": [
    "Git", "GitHub", "Docker", "Kubernetes", "AWS", "Vercel", "Jenkins", 
    "Linux", "Nginx", "Notion", "Figma", "Slack", "Discord"
  ]
}

// 태그 리스트를 받아서 카테고리별로 묶어주는 함수
export function categorizeTags(tags: string[]) {
  const categorized: Record<string, string[]> = {}
  const usedTags = new Set<string>()

  // 1. 카테고리별로 매칭
  Object.entries(TECH_CATEGORIES).forEach(([category, techList]) => {
    // 대소문자 무시하고 비교하기 위해 소문자로 변환
    const lowerTechList = techList.map(t => t.toLowerCase())
    
    const matched = tags.filter(tag => {
      // 태그가 해당 카테고리 리스트에 포함되는지 확인 (부분 일치 X, 정확 일치 O)
      // 예: "Java"는 Backend에도 있고 AI에는 없지만, "JavaScript"와 혼동 방지
      return lowerTechList.includes(tag.toLowerCase())
    })

    if (matched.length > 0) {
      categorized[category] = matched
      matched.forEach(t => usedTags.add(t))
    }
  })

  // 2. 어디에도 속하지 않은 태그는 'Others'로 분류
  const others = tags.filter(tag => !usedTags.has(tag))
  if (others.length > 0) {
    categorized["Others"] = others
  }

  return categorized
}