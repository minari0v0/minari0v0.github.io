// lib/mdx-compile.tsx
import { MDXRemote } from "next-mdx-remote/rsc"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"

export function CompileMDX({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          rehypePlugins: [
            rehypeSlug, // 제목에 id 자동 부여
            [rehypeAutolinkHeadings, { behavior: "wrap" }], // 제목에 링크 걸기
          ],
        },
      }}
    />
  )
}