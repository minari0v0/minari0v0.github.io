// lib/mdx.ts
import fs from "fs"
import path from "path"
import matter from "gray-matter"

const projectsDirectory = path.join(process.cwd(), "content/projects")

// 1. 모든 프로젝트 글 가져오기
export function getProjectPosts() {
  // 폴더가 없으면 빈 배열 반환 (에러 방지)
  if (!fs.existsSync(projectsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(projectsDirectory)
  const allProjects = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "")
    const fullPath = path.join(projectsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data } = matter(fileContents)

    return {
      slug,
      ...data,
    } as any // 타입은 나중에 정확히 정의하면 됨
  })

  // 날짜순 정렬
  return allProjects.sort((a, b) => (a.date < b.date ? 1 : -1))
}

// 2. 특정 프로젝트 글 가져오기 (Slug로 검색)
export function getProjectBySlug(slug: string) {
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return { slug, frontmatter: data, content }
}