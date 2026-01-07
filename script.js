// --- Lenis Smooth Scroll ---
const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// --- 데이터 ---
const projects = [
  {
    id: 1,
    repoName: "anomaly-dashboard-project",
    title: "anomaly-dashboard-project",
    description: "금융 빅데이터 기반 신용카드 이상 거래 탐지 시스템",
    tags: ["Jupyter Notebook", "AI", "Big Data"],
    github: "https://github.com/minari0v0/anomaly-dashboard-project",
    featured: true,
  },
  {
    id: 2,
    repoName: "PassCheckers",
    title: "PassCheckers",
    description: "AI 이미지 분석 기반 수하물 분류 및 여행 도우미 애플리케이션",
    tags: ["Vue", "AI", "Application"],
    github: "https://github.com/minari0v0/PassCheckers",
    featured: true,
  },
  {
    id: 3,
    repoName: "tungzang",
    title: "tungzang",
    description: "텅장수강러 - 대학생 위한 커뮤니티",
    tags: ["Java", "Community", "Web"],
    github: "https://github.com/minari0v0/tungzang",
    featured: false,
  },
  {
    id: 4,
    repoName: "java_omok",
    title: "java_omok",
    description: "자바를 이용해 만든 오목 게임",
    tags: ["Java", "Game"],
    github: "https://github.com/minari0v0/java_omok",
    featured: false,
  },
];

// --- DOM 요소 ---
const themeToggle = document.getElementById('theme-toggle');
const projectsGrid = document.getElementById("projects-grid");
const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalImage = document.getElementById("modal-image");
const modalDescription = document.getElementById("modal-description");
const modalClose = document.getElementById("modal-close");

// --- 초기화 ---
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  initTheme();
  initContactForm();
  initializeApp();
});

async function initializeApp() {
  await fetchProjectDetails();
  renderProjects();
  initModal();
  initScrollAnimations();
}

// --- 테마 ---
function initTheme() {
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  // 로드 시 테마 설정
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    // 시스템 기본 설정 확인
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  // 토글 버튼 이벤트
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    applyTheme(isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  });
}


// --- 데이터 패칭 및 처리 ---
async function fetchProjectDetails() {
  const owner = "minari0v0";
  const fetchPromises = projects.map(async (project) => {
    try {
      const response = await fetch(`https://raw.githubusercontent.com/${owner}/${project.repoName}/main/README.md`);
      if (!response.ok) throw new Error('README not found');
      
      const markdown = await response.text();
      project.longDescription = markdown;

      const imageRegex = /!\[.*?\]\((.*?)\)/;
      const match = markdown.match(imageRegex);
      
      if (match && match[1]) {
        const imageUrl = match[1];
        if (imageUrl.startsWith('http')) {
          project.imageUrl = imageUrl;
        } else {
          const relativePath = imageUrl.startsWith('./') ? imageUrl.substring(2) : imageUrl;
          project.imageUrl = `https://raw.githubusercontent.com/${owner}/${project.repoName}/main/${relativePath}`;
        }
      } else {
        project.imageUrl = '';
      }
    } catch (error) {
      console.error(`Error fetching README for ${project.repoName}:`, error);
      project.longDescription = "상세 설명을 불러오는 데 실패했습니다.";
      project.imageUrl = '';
    }
    return project;
  });

  await Promise.all(fetchPromises);
}

// --- 렌더링 ---
function renderProjects() {
  if (!projectsGrid) return;

  projectsGrid.innerHTML = '';
  const sortedProjects = projects.sort((a, b) => b.featured - a.featured);

  sortedProjects.forEach((project) => {
    const isFeatured = project.featured;
    const columnSpan = isFeatured ? 'lg:col-span-2' : 'lg:col-span-1';
    const cardClass = `project-card cursor-pointer ${columnSpan}`;
    
    const projectCard = document.createElement("div");
    projectCard.className = cardClass;
    projectCard.dataset.id = project.id;

    projectCard.innerHTML = `
      <div class="p-6 md:p-8 h-full flex flex-col">
        <h3 class="text-xl md:text-2xl font-bold mb-3">${project.title}</h3>
        <div class="flex flex-wrap gap-2 mb-4">
          ${project.tags.map((tag) => `<span class="tag text-xs px-2 py-1 rounded">${tag}</span>`).join("")}
        </div>
        <p class="mb-6 flex-grow">${project.description}</p>
        <div class="mt-auto flex justify-between items-center">
            <span class="text-sm font-semibold text-primary-color hover:underline">확인하기 &rarr;</span>
            <a href="${project.github}" target="_blank" class="github-link">
                <i data-lucide="github" class="w-5 h-5"></i>
            </a>
        </div>
      </div>
    `;
    projectsGrid.appendChild(projectCard);
  });
  lucide.createIcons();
}

// --- 모달 로직 ---
function initModal() {
  if (!modal) return;

  projectsGrid.addEventListener("click", (e) => {
    if (e.target.closest('.github-link')) {
      return; 
    }

    const card = e.target.closest(".project-card");
    if (card) {
      const projectId = parseInt(card.dataset.id, 10);
      const project = projects.find(p => p.id === projectId);
      if (project) {
        openModal(project);
      }
    }
  });

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

function openModal(project) {
  modalTitle.textContent = project.title;
  
  if (project.imageUrl) {
    modalImage.src = project.imageUrl;
    modalImage.style.display = 'block';
  } else {
    modalImage.style.display = 'none';
  }
  
  modalDescription.innerHTML = marked.parse(project.longDescription);
  
  modal.classList.add('visible');
  lenis.stop(); // 모달 열리면 배경 스크롤 중지
}

function closeModal() {
  modal.classList.remove('visible');
  lenis.start(); // 모달 닫히면 배경 스크롤 다시 시작
}

// --- 기타 유틸리티 ---
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  document.querySelectorAll(".scroll-animate").forEach((el) => observer.observe(el));
}

function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert(`메시지가 전송되었습니다!`);
    contactForm.reset();
  });
}

// Lenis와 연동되도록 수정
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    lenis.scrollTo(section);
  }
}
