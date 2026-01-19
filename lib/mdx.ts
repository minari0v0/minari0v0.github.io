import fs from "fs"
import path from "path"
import matter from "gray-matter"

// 경로 설정
const projectsDirectory = path.join(process.cwd(), "content", "projects")

export function getProjectPosts() {

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

const BLOG_PATH = path.join(process.cwd(), "content/blog")

// 1. 모든 블로그 글 가져오기
export function getBlogPosts() {
  // 폴더가 없으면 빈 배열 반환 (에러 방지)
  if (!fs.existsSync(BLOG_PATH)) return []

  const files = fs.readdirSync(BLOG_PATH)

  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const source = fs.readFileSync(path.join(BLOG_PATH, file), "utf-8")
      const { data } = matter(source)

      return {
        slug: file.replace(".mdx", ""), // 파일명이 곧 ID(slug)가 됨
        title: data.title,
        excerpt: data.excerpt, // 요약글
        date: new Date(data.date), // 날짜 객체로 변환
        image: data.coverImage || "/placeholder.svg", // coverImage를 image로 매핑
        tags: data.tags,
      }
    })
    // 최신 날짜순 정렬
    .sort((a, b) => b.date.getTime() - a.date.getTime())

  return posts
}

// 2. 특정 블로그 글 가져오기 (상세 페이지용)
export async function getBlogPost(slug: string) {
  const filePath = path.join(BLOG_PATH, `${slug}.mdx`)
  
  if (!fs.existsSync(filePath)) return null

  const source = fs.readFileSync(filePath, "utf-8")
  const { content, data } = matter(source)

  // ▼▼▼ [핵심] Velog HTML 태그 자동 교정 (MDX 호환용) ▼▼▼
  const contentForMdx = content
    // 1. <br> 태그를 <br />로 변환
    .replace(/<br>/g, "<br />")
    // 2. (혹시 모를) <img> 태그도 닫는 태그가 없다면 교정
    .replace(/<img([^>]+)>/g, "<img$1 />")
    // 3. <hr> 태그 교정
    .replace(/<hr>/g, "<hr />");

  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    date: new Date(data.date),
    coverImage: data.coverImage,
    tags: data.tags,
    content: contentForMdx, // 교정된 컨텐츠를 전달
  }
}