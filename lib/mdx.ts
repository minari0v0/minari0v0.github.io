import fs from "fs"
import path from "path"
import matter from "gray-matter"

// 경로 설정
const projectsDirectory = path.join(process.cwd(), "content", "projects")

export function getProjectPosts() {
  console.log("------------------------------------------------")
  console.log("🔍 [디버깅] 프로젝트 폴더 찾는 중...");
  console.log("📂 현재 위치(CWD):", process.cwd());
  console.log("📂 목표 폴더:", projectsDirectory);

  // 1. 폴더가 없는 경우
  if (!fs.existsSync(projectsDirectory)) {
    console.error("❌ 오류: 폴더가 실제로 존재하지 않습니다!");
    return []
  }

  const fileNames = fs.readdirSync(projectsDirectory)
  console.log("📄 발견된 파일들:", fileNames);

  // 2. .mdx 파일만 걸러내기
  const mdxFiles = fileNames.filter((fileName) => fileName.endsWith(".mdx"))
  console.log("📝 MDX 파일 목록:", mdxFiles);
  console.log("------------------------------------------------")

  const allProjects = mdxFiles.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "")
    const fullPath = path.join(projectsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data } = matter(fileContents)

    return {
      slug,
      ...data,
    } as any
  })

  // 날짜순 정렬
  return allProjects.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getProjectBySlug(slug: string) {
  if (!fs.existsSync(projectsDirectory)) return { slug, frontmatter: null, content: "" }
  
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`)
  
  if (!fs.existsSync(fullPath)) {
    return { slug, frontmatter: null, content: "" }
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return { slug, frontmatter: data, content }
}