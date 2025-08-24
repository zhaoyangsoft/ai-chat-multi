/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用静态导出，适合部署到Cloudflare Pages
  output: 'export',
  
  // 禁用图片优化，因为静态导出不支持
  images: {
    unoptimized: true,
  },
  
  // 设置基础路径（如果部署到子目录）
  // basePath: '',
  
  // 设置资源前缀（如果部署到子目录）
  // assetPrefix: '',
  
  // 启用实验性的 App 目录功能
  experimental: {
    appDir: true,
  },
  
  // API路由配置（静态导出时API路由不可用）
  async headers() {
    return [
      {
        source: '/api/chat',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ]
  },
}

// - 1.
// reactStrictMode : 启用 React 严格模式，帮助检测潜在问题
// - 2.
// swcMinify : 启用 SWC 压缩，提高构建性能
// - 3.
// images : 配置图像优化选项
// - 4.
// env : 定义环境变量
// - 5.
// rewrites : 配置路径重写规则
// - 6.
// redirects : 配置重定向规则
// - 7.
// typescript : 配置 TypeScript 行为
// - 8.
// webpack : 自定义 Webpack 配置
// - 9.
// eslint : 配置 ESLint 行为
// - 10.
// output : 配置构建输出模式（如静态导出）

module.exports = nextConfig