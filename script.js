// 프로젝트 데이터
const projects = [
  {
    id: 1,
    title: "텅장수강러",
    description: "수강신청 도우미 웹 서비스. 학생들이 효율적으로 수강신청을 할 수 있도록 도와주는 플랫폼입니다.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    github: "https://github.com/minari0v0/passchecker",
    demo: "#",
    featured: true,
  },
  {
    id: 2,
    title: "imageEditorOpenCV",
    description: "OpenCV를 이용한 간단한 이미지 편집기. 다양한 이미지 처리 기능을 제공합니다.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
    tags: ["Python", "OpenCV", "Image Processing"],
    github: "https://github.com/minari0v0/imageEditorOpenCV",
    featured: true,
  },
  {
    id: 3,
    title: "C++ 프로젝트",
    description: "C++를 활용한 다양한 프로그래밍 프로젝트 모음입니다.",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=400&fit=crop",
    tags: ["C++", "Data Structures", "Algorithms"],
    github: "https://github.com/minari0v0/Cpp",
    featured: false,
  },
]

// 스킬 데이터
const skills = [
  { name: "HTML/CSS", level: 90, category: "frontend", icon: "🌐" },
  { name: "JavaScript", level: 85, category: "frontend", icon: "📜" },
  { name: "React", level: 80, category: "frontend", icon: "⚛️" },
  { name: "Next.js", level: 75, category: "frontend", icon: "▲" },
  { name: "TypeScript", level: 70, category: "language", icon: "🔷" },
  { name: "Python", level: 85, category: "language", icon: "🐍" },
  { name: "C++", level: 80, category: "language", icon: "🔧" },
  { name: "OpenCV", level: 75, category: "tool", icon: "👁️" },
  { name: "Git", level: 85, category: "tool", icon: "📊" },
]

// DOM이 로드된 후 실행
document.addEventListener("DOMContentLoaded", () => {
  // Lucide 아이콘 초기화
  lucide.createIcons()

  // 프로젝트 렌더링
  renderProjects()

  // 스킬 렌더링
  renderSkills()

  // 스크롤 애니메이션 초기화
  initScrollAnimations()

  // 히어로 패럴랙스 효과
  initHeroParallax()

  // 폼 이벤트 리스너
  initContactForm()

  // 스킬 바 애니메이션
  initSkillBars()
})

// 프로젝트 렌더링
function renderProjects() {
  const projectsGrid = document.getElementById("projects-grid")

  projects.forEach((project, index) => {
    const projectCard = document.createElement("div")
    projectCard.className = "project-card bg-white rounded-lg shadow-lg overflow-hidden scroll-animate"
    projectCard.style.animationDelay = `${index * 0.1}s`

    projectCard.innerHTML = `
            <div class="aspect-video overflow-hidden">
                <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105">
            </div>
            <div class="p-6">
                <div class="flex items-center gap-2 mb-2">
                    <h3 class="text-xl font-bold">${project.title}</h3>
                    ${project.featured ? '<span class="bg-blue-500 text-white text-xs px-2 py-1 rounded">Featured</span>' : ""}
                </div>
                <div class="flex flex-wrap gap-2 mb-3">
                    ${project.tags.map((tag) => `<span class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">${tag}</span>`).join("")}
                </div>
                <p class="text-gray-600 mb-4">${project.description}</p>
                <div class="flex gap-2">
                    ${
                      project.github
                        ? `
                        <a href="${project.github}" target="_blank" class="inline-flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded text-sm transition-colors">
                            <i data-lucide="github" class="w-4 h-4 mr-2"></i>
                            GitHub
                        </a>
                    `
                        : ""
                    }
                    ${
                      project.demo && project.demo !== "#"
                        ? `
                        <a href="${project.demo}" target="_blank" class="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm transition-colors">
                            <i data-lucide="external-link" class="w-4 h-4 mr-2"></i>
                            Demo
                        </a>
                    `
                        : ""
                    }
                </div>
            </div>
        `

    projectsGrid.appendChild(projectCard)
  })

  // 아이콘 다시 초기화
  lucide.createIcons()
}

// 스킬 렌더링
function renderSkills() {
  const skillsContainer = document.getElementById("skills-container")

  skills.forEach((skill, index) => {
    const skillElement = document.createElement("div")
    skillElement.className = "skill-item"
    skillElement.style.animationDelay = `${index * 0.1}s`

    skillElement.innerHTML = `
            <div class="flex items-center justify-between mb-2">
                <div class="flex items-center">
                    <span class="text-xl mr-2">${skill.icon}</span>
                    <span class="font-medium">${skill.name}</span>
                </div>
                <span class="text-sm text-gray-500">${skill.level}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="skill-bar bg-blue-500 h-2.5 rounded-full" style="--skill-level: ${skill.level}%"></div>
            </div>
        `

    skillsContainer.appendChild(skillElement)
  })
}

// 스크롤 애니메이션 초기화
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate")
      }
    })
  }, observerOptions)

  document.querySelectorAll(".scroll-animate").forEach((el) => {
    observer.observe(el)
  })
}

// 히어로 패럴랙스 효과
function initHeroParallax() {
  const heroContent = document.querySelector(".hero-content")

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY
    const opacity = 1 - Math.min(scrollY / 500, 1)
    const translateY = scrollY * 0.5

    if (heroContent) {
      heroContent.style.opacity = opacity
      heroContent.style.transform = `translateY(${translateY}px)`
    }
  })
}

// 연락처 폼 초기화
function initContactForm() {
  const contactForm = document.getElementById("contact-form")

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const formData = new FormData(contactForm)
    const name = formData.get("name")
    const email = formData.get("email")
    const message = formData.get("message")

    // 여기에 실제 폼 제출 로직을 추가할 수 있습니다
    alert(`메시지가 전송되었습니다!\n\n이름: ${name}\n이메일: ${email}\n메시지: ${message}`)

    // 폼 리셋
    contactForm.reset()
  })
}

// 스킬 바 애니메이션 초기화
function initSkillBars() {
  const skillsSection = document.getElementById("skills")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillBars = entry.target.querySelectorAll(".skill-bar")
          skillBars.forEach((bar, index) => {
            setTimeout(() => {
              bar.classList.add("animate")
            }, index * 100)
          })
        }
      })
    },
    { threshold: 0.5 },
  )

  observer.observe(skillsSection)
}

// 섹션으로 스크롤하는 함수
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: "smooth" })
  }
}

// 부드러운 스크롤 링크 처리
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  })
})
