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
    mainDescription: "### 실시간 거래 데이터 시각화\n- 백엔드 - FastAPI \n- 프론트엔드 - React\n\nCredit Card Fraud Detection데이터셋을\n\n 랜덤포레스트로 학습하여 이상거래를 실시간으로 분석하여\n\n 위험도를 시각화한 웹 대시보드입니다.",
    screenshots: ['images/anomaly/이상탐지스크린샷.png'],
    tags: ["Jupyter Notebook", "AI", "Big Data"],
    github: "https://github.com/minari0v0/anomaly-dashboard-project",
    featured: true,
  },
  {
    id: 2,
    repoName: "PassCheckers",
    title: "PassCheckers",
    description: "AI 이미지 분석 기반 수하물 분류 및 여행 도우미 애플리케이션",
    mainDescription: "#### 주요 기능\n- AI 객체 탐지 모델을 사용한 수하물 자동 분류\n- Vue.js 기반의 반응형 웹 인터페이스\n- 여행자 편의를 위한 추가 정보 제공\n\n메인화면에 Vue ScrollSnap 적용\n\n수하물 분석 페이지 풀스택 개발\n\n수하물 패킹 페이지 풀스택 개발\n\n수하물 공유 페이지 풀스택 개발\n\n수하물 무게 예측 페이지 풀스택 개발\n\n - Chart.js를 통한 시각화",
    screenshots: ['images/passcheckers/패스체커메인.png', 'images/passcheckers/패스체커스샷.png', 'images/passcheckers/패스체커스샷1.png', 'images/passcheckers/패스체커스샷쉐어링.png', 'images/passcheckers/패스체커스샷패킹.png'],
    tags: ["Vue", "AI", "Application"],
    github: "https://github.com/minari0v0/PassCheckers",
    featured: true,
  },
  {
    id: 3,
    repoName: "tungzang",
    title: "tungzang",
    description: "텅장수강러 - 대학생 위한 커뮤니티",
    mainDescription: "#### 주요 기능\n- 강의 평가 및 정보 공유\n- 시간표 작성 도우미\n- 학생 간 익명 커뮤니티\n\n",
    screenshots: ['images/tungzang/텅장수강러메인.png', 'images/tungzang/텅장수강러로긴.png', 'images/tungzang/텅장수강러시간표.png', 'images/tungzang/텅장수강러강평.png', 'images/tungzang/텅장수강러커뮤.png', 'images/tungzang/텅장수강러관리자대시.png'],
    tags: ["Java", "Community", "Web"],
    github: "https://github.com/minari0v0/tungzang",
    featured: false,
  },
  {
    id: 4,
    repoName: "java_omok",
    title: "java_omok",
    description: "자바를 이용해 만든 오목 게임",
    mainDescription: "#### 주요 기능\n- Java Swing 기반의 GUI\n- 실시간 채팅 기능\n- 사용자 랭킹 시스템\n\n",
    screenshots: ['images/omok/오목메인.png', 'images/omok/오목게임진행.png', 'images/omok/오목카톡.png', 'images/omok/오목랭킹.png'],
    tags: ["Java", "Game"],
    github: "https://github.com/minari0v0/java_omok",
    featured: false,
  },
];

// --- DOM 요소 ---
const themeToggle = document.getElementById('theme-toggle');
const projectsGrid = document.getElementById("projects-grid");
const readmeModal = document.getElementById("readme-modal");
const readmeModalTitle = document.getElementById("readme-modal-title");
const readmeModalBody = document.getElementById("readme-modal-body");
const detailModal = document.getElementById("project-detail-modal");
const detailModalTitle = document.getElementById("detail-modal-title");
const detailModalMainImage = document.getElementById("detail-modal-main-image");
const detailModalThumbnails = document.getElementById("detail-modal-thumbnails");
const detailModalDescription = document.getElementById("detail-modal-description");
const imageZoomOverlay = document.getElementById('image-zoom-overlay');
const zoomedImage = document.getElementById('zoomed-image');


// --- 초기화 ---
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  initTheme();
  initContactForm();
  initializeApp();
  initImageZoom();
});

async function initializeApp() {
  await fetchReadmeDetails();
  renderProjects();
  initModals();
  initScrollAnimations();
}

// --- 테마 ---
function initTheme() {
  const applyTheme = (theme) => {
    document.body.classList.toggle('dark', theme === 'dark');
  }
  const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

// --- 데이터 패칭 (README) ---
function resolveReadmeImagePaths(markdown, project) {
    const owner = "minari0v0";
    const regex = /!\\[(.*?)\\]\(((?!http|data:).+?)\\/g;
    return markdown.replace(regex, (match, altText, relativePath) => {
        const cleanPath = relativePath.startsWith('./') ? relativePath.substring(2) : relativePath;
        const absolutePath = `https://raw.githubusercontent.com/${owner}/${project.repoName}/main/${cleanPath}`;
        return `![${altText}](${absolutePath})`;
    });
}

async function fetchReadmeDetails() {
  const owner = "minari0v0";
  const fetchPromises = projects.map(async (project) => {
    try {
      const response = await fetch(`https://raw.githubusercontent.com/${owner}/${project.repoName}/main/README.md`);
      if (!response.ok) throw new Error('README not found');
      const markdown = await response.text();
      project.readmeContent = resolveReadmeImagePaths(markdown, project);
    } catch (error) {
      console.error(`Error fetching README for ${project.repoName}:`, error);
      project.readmeContent = "README.md 파일을 불러오는 데 실패했습니다.";
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
    const cardClass = `project-card ${columnSpan}`;
    
    const projectCard = document.createElement("div");
    projectCard.className = cardClass;
    projectCard.dataset.id = project.id;
    projectCard.dataset.action = "open-detail";

    projectCard.innerHTML = `
      <div class="p-6 md:p-8 h-full flex flex-col cursor-pointer">
        <h3 class="text-xl md:text-2xl font-bold mb-3">${project.title}</h3>
        <div class="flex flex-wrap gap-2 mb-4">
          ${project.tags.map((tag) => `<span class="tag text-xs px-2 py-1 rounded">${tag}</span>`).join("")}
        </div>
        <p class="mb-6 flex-grow">${project.description}</p>
        <div class="mt-auto flex justify-between items-center">
          <span class="text-sm font-semibold text-primary-color hover:underline">확인하기 &rarr;</span>
          <div class="flex gap-2">
            <button data-id="${project.id}" data-action="open-readme" class="card-button">README</button>
            <a href="${project.github}" target="_blank" class="card-button github-link">
              <i data-lucide="github" class="w-4 h-4"></i>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    `;
    projectsGrid.appendChild(projectCard);
  });
  lucide.createIcons();
}

// --- 모달 로직 ---
function initModals() {
  document.body.addEventListener("click", (e) => {
    const actionTarget = e.target.closest('[data-action]');
    if (actionTarget) {
      e.stopPropagation();
      const card = actionTarget.closest('.project-card');
      if (!card) return;
      
      const projectId = parseInt(card.dataset.id, 10);
      const project = projects.find(p => p.id === projectId);
      if (!project) return;
      
      const action = actionTarget.dataset.action;
      switch(action) {
        case 'open-detail':
          openProjectDetailModal(project);
          break;
        case 'open-readme':
          openReadmeModal(project);
          break;
      }
    }

    if (e.target.closest('.modal-close-button') || e.target.classList.contains('modal-container')) {
      closeAllModals();
    }
  });
}

function openReadmeModal(project) {
  readmeModalTitle.textContent = `${project.title} - README.md`;
  readmeModalBody.innerHTML = marked.parse(project.readmeContent || '');
  readmeModal.classList.add('visible');
  lenis.stop();
}

function openProjectDetailModal(project) {
  detailModalTitle.textContent = project.title;
  detailModalDescription.innerHTML = marked.parse(project.mainDescription || '');

  if (project.screenshots && project.screenshots.length > 0) {
    detailModalMainImage.src = project.screenshots[0];
    detailModalMainImage.style.display = 'block';
    detailModalThumbnails.innerHTML = '';
    project.screenshots.forEach((src, index) => {
        const thumb = document.createElement('img');
        thumb.src = src;
        thumb.addEventListener('click', () => {
            // 이미 같은 이미지를 클릭했으면 아무것도 안 함
            if (detailModalMainImage.src.includes(encodeURI(src))) return;

            // 부드러운 전환 애니메이션
            detailModalMainImage.style.opacity = '0';
            setTimeout(() => {
                detailModalMainImage.src = src;
                detailModalMainImage.style.opacity = '1';
            }, 300); // CSS transition duration과 일치

            detailModalThumbnails.querySelectorAll('img').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
        if (index === 0) thumb.classList.add('active');
        detailModalThumbnails.appendChild(thumb);
    });
  } else {
    detailModalMainImage.style.display = 'none';
    detailModalThumbnails.innerHTML = '';
  }

  detailModal.classList.add('visible');
  lenis.stop();
}

function closeAllModals() {
  document.querySelectorAll('.modal-container').forEach(modal => {
    modal.classList.remove('visible');
  });
  lenis.start();
}

// --- 이미지 줌 로직 ---
function initImageZoom() {
    detailModalMainImage.addEventListener('click', () => {
        if(detailModalMainImage.src) {
            zoomedImage.src = detailModalMainImage.src;
            imageZoomOverlay.classList.add('visible');
            // lenis는 이미 stop 상태
        }
    });

    imageZoomOverlay.addEventListener('click', () => {
        imageZoomOverlay.classList.remove('visible');
    });
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

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) lenis.scrollTo(section);
}