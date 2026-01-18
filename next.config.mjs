/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  //output: "export", //정적파일로 내보내기
  images: {
    unoptimized: true, //github.io라면 최적화서버 없어서 T
  },
}

export default nextConfig
