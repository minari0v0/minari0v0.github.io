import { getBlogPosts } from "@/lib/mdx"
import { BlogList } from "@/components/blog-list"

export const metadata = {
  title: "스토리 | minari0v0",
  description: "개발, 디자인, 기술에 대한 이야기를 기록합니다.",
}

export default function BlogPage() {
  const allPosts = getBlogPosts()

  // 카테고리 추출
  const rawCategories = allPosts.map((p) => p.category || "General")
  const uniqueCategorySet = new Set(rawCategories)
  
  // 데이터에 혹시 '전체'라는 카테고리가 있으면 중복되니 제거
  if (uniqueCategorySet.has("전체")) {
    uniqueCategorySet.delete("전체")
  }

  // [수정] "All" -> "전체"로 변경
  const categories = ["전체", ...Array.from(uniqueCategorySet)]
  
  const counts = categories.reduce((acc, cat) => {
    if (cat === "전체") { // [수정] "All" -> "전체"
      acc[cat] = allPosts.length
    } else {
      acc[cat] = allPosts.filter((p) => (p.category || "General") === cat).length
    }
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-[#333333]">스토리</h1>
        <p className="mt-3 text-gray-500">개발, 디자인, 기술에 대한 이야기를 기록합니다.</p>
      </header>

      <BlogList posts={allPosts} categories={categories} counts={counts} />
    </div>
  )
}