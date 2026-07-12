# 🌿 minari0v0.github.io

> **"빠르게 만들고, 깊게 다듬습니다."** > 끊임없이 성장하는 개발자 **minari0v0**의 포트폴리오 & 기술 블로그입니다.

![Next.js](https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

---

## 📖 About This Project

이 프로젝트는 저의 개발 경험과 학습 기록을 담아두기 위해 구축한 **정적 웹사이트**입니다.  
상용 블로그 플랫폼 대신 직접 포트폴리오 사이트를 구축함으로써, **Next.js의 동작 원리**와 **SEO 최적화**, **CI/CD 파이프라인**을 직접 경험하고 학습하고자 했습니다.

### 🎨 Design & Atmosphere
* **Theme:** `Minari Green` 🌱
* **Concept:** 닉네임 '미나리'에서 영감을 받아, **올리브 그린(#7c9070)**을 메인 컬러로 사용하여 눈이 편안하고 자연스러운 분위기를 연출했습니다.
* **UI/UX:** 화려한 효과보다는 **콘텐츠의 가독성**과 **직관적인 사용자 경험**에 집중했습니다. 카드형 레이아웃과 반응형 디자인을 적용하여 어떤 디바이스에서도 깔끔하게 보이도록 설계했습니다.

---

## 🛠️ Tech Stack

이 프로젝트는 최신 웹 기술 표준을 준수하며, 성능과 유지보수성을 고려하여 설계되었습니다.

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | **Next.js 14 (App Router)** | 서버 컴포넌트 활용 및 정적 사이트 생성(SSG) |
| **Language** | **TypeScript** | 정적 타입 시스템을 통한 안정적인 개발 환경 구축 |
| **Styling** | **Tailwind CSS** | 유틸리티 퍼스트 CSS를 통한 빠른 UI 구현 및 디자인 시스템 통일 |
| **Content** | **MDX** | 마크다운에 React 컴포넌트를 결합하여 풍부한 콘텐츠 작성 |
| **Deployment** | **GitHub Pages** | GitHub Actions를 이용한 자동화된 빌드 및 배포 파이프라인 |

---

## ✨ Key Features

* **🗂️ Project & Story Management:** MDX 기반으로 프로젝트 경험과 기술 블로그 포스팅을 관리합니다.
* **🔍 Real-time Search:** 디바운싱(Debouncing)이 적용된 실시간 검색 기능으로 프로젝트와 글을 빠르게 찾을 수 있습니다.
* **📱 Responsive Design:** 모바일, 태블릿, 데스크탑 등 모든 환경에 최적화된 반응형 UI를 제공합니다.
* **🚀 SEO Optimization:** 메타데이터, Open Graph, 시맨틱 태그를 활용하여 검색 엔진 최적화를 수행했습니다.

---

## 🚀 Running Locally

이 프로젝트를 로컬 환경에서 실행하려면 다음 명령어를 사용하세요.

```bash
# 1. 저장소 복제
git clone [https://github.com/minari0v0/minari0v0.github.io.git](https://github.com/minari0v0/minari0v0.github.io.git)

# 2. 디렉토리 이동
cd minari0v0.github.io

# 3. 패키지 설치
npm install

# 4. 개발 서버 실행
npm run dev
```

---

## 🖼️ MDX 이미지 캐러셀(ImageCarousel) 사용법

포트폴리오 프로젝트 상세 정보나 블로그 MDX 글을 작성할 때, 여러 장의 스크린샷과 캡션을 깔끔하게 슬라이딩 뷰로 제공하는 커스텀 캐러셀 컴포넌트입니다.

### 💡 기본 작성법
MDX 파일 본문에서 다음과 같이 선언하여 사용할 수 있습니다.

```mdx
<ImageCarousel
  aspectRatio="auto"
  images={[
    {
      src: "/images/projects/pickpl/login.png",
      alt: "로그인 페이지",
      caption: "픽플의 모바일 로그인 화면"
    },
    {
      src: "/images/projects/pickpl/mypageDash.png",
      alt: "마이페이지 대시보드",
      caption: "사용자 활동 로그 대시보드 화면"
    }
  ]}
/>
```

### ⚙️ 주요 속성 가이드
* **`aspectRatio`**: 이미지의 기본 가로세로 비율을 결정합니다.
  * `auto` **(추천/기본값)**: 각 이미지 파일이 로드되었을 때 **실제 이미지의 비율을 브라우저가 자동 감지**하여 유동적으로 크기를 잡습니다. 가로/세로 이미지가 한 캐러셀 내에 혼합되어도 짤리지 않고 제 비율을 지켜 렌더링됩니다.
  * `video` / `cinema` / `square` / `mobile`: 각각 `16:9`, `21:9`, `1:1`, `9:16` 비율로 강제 고정하여 표시합니다.
* **`images`**: 이미지 정보 객체 배열
  * `src`: `/public` 기준의 정적 자산 절대 경로
  * `alt`: 이미지 설명 제목 (모달 열었을 때 제목으로 노출됨)
  * `caption`: 이미지 상세 설명구 (슬라이드 하단에 부드러운 트랜지션 애니메이션으로 전환됨)

> [!TIP]
> **자세히 보기(모달 줌) 기능**: 캐러셀 이미지를 클릭하면 확대/축소(Zoom In/Out) 및 상하좌우 마우스 스크롤이 가능한 전체화면 모달창이 활성화됩니다. 모달창 내에서는 키보드 **좌우 방향키** 또는 화면 좌우 화살표 버튼으로 이미지 탐색이 가능합니다.

---

## 📬 Contact
- GitHub: @minari0v0
- Email: cc360653@gmail.com

© 2026 minari0v0. All rights reserved.

