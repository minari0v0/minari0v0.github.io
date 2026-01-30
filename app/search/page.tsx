import { Metadata } from "next"
import SearchClient from "./search-client"
import { getProjectPosts, getBlogPosts } from "@/lib/mdx"

export const metadata: Metadata = {
  title: "검색 | minari0v0",
  description: "프로젝트와 개발 스토리를 검색해보세요.",
}

export default async function SearchPage() {
  // 1. 빌드 타임(또는 요청 시)에 실제 MDX 파일 데이터를 가져옵니다.
  const projects = getProjectPosts()
  const posts = getBlogPosts()

  // 2. 가져온 데이터를 클라이언트 컴포넌트로 전달합니다.
  return (
    <SearchClient 
      initialProjects={projects} 
      initialPosts={posts} 
    />
  )
}