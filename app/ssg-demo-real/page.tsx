import { Suspense } from 'react';
import SSGDemo from '@/components/SSGDemo';

// 这个页面会在构建时静态生成
export default function SSGRealDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* 简化的Header，不需要事件处理函数 */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🏗️</span>
              <h1 className="text-xl font-bold text-gray-900">
                SSG静态生成演示
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <a 
              href="/ssr-ssg-isr-demo"
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <span className="text-sm font-medium">返回主页</span>
            </a>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            SSG 静态生成演示
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            这个页面在构建时预生成，实现极速加载和最佳性能
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <div className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold">
              ⚡ 预构建页面
            </div>
            <div className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">
              🚀 极速加载
            </div>
            <div className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold">
              💰 成本优化
            </div>
          </div>
        </div>

        {/* SSG技术说明 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            SSG 静态生成的工作原理
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🏗️</div>
              <h3 className="text-xl font-semibold mb-3">构建时生成</h3>
              <p className="text-gray-600">
                在 `npm run build` 时，Next.js 会预先生成所有页面，包括HTML、CSS和JavaScript
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-semibold mb-3">静态文件部署</h3>
              <p className="text-gray-600">
                生成的静态文件可以部署到CDN，实现全球极速访问
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3">运行时零计算</h3>
              <p className="text-gray-600">
                用户访问时直接返回预构建的HTML，无需服务器计算
              </p>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-green-800 mb-3">当前页面的SSG特性：</h4>
            <ul className="text-green-700 space-y-2">
              <li>✅ 页面在构建时预生成，不是运行时渲染</li>
              <li>✅ 可以直接部署到静态托管服务（如Vercel、Netlify）</li>
              <li>✅ 支持CDN缓存，实现全球极速访问</li>
              <li>✅ 无需服务器运行，降低运维成本</li>
              <li>✅ 搜索引擎友好，提升SEO表现</li>
            </ul>
          </div>
        </div>

        {/* 性能对比 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-red-600 mb-4">传统SSR方式</h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center space-x-2">
                <span className="text-red-500">❌</span>
                <span>每次请求都需要服务器渲染</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-red-500">❌</span>
                <span>服务器计算压力大</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-red-500">❌</span>
                <span>响应时间不稳定</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-red-500">❌</span>
                <span>运维成本高</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-green-600 mb-4">SSG静态生成</h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span>页面预构建，访问时直接返回</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span>零服务器计算压力</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span>响应时间稳定且极快</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span>运维成本极低</span>
              </div>
            </div>
          </div>
        </div>

        {/* SSG演示组件 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-16">
          <h3 className="text-2xl font-bold text-green-600 mb-4">SSG性能演示</h3>
          <p className="text-gray-600 mb-4">
            以下是SSG带来的性能提升效果展示
          </p>
          <Suspense fallback={<div className="animate-pulse bg-gray-200 h-32 rounded"></div>}>
            <SSGDemo />
          </Suspense>
        </div>

        {/* 部署说明 */}
        <div className="bg-blue-50 rounded-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
            如何部署SSG页面
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">1. 构建项目</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm">
                npm run build
              </div>
              <p className="text-gray-600 mt-2">
                这会生成静态文件到 `.next` 目录
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">2. 导出静态文件</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm">
                npm run export
              </div>
              <p className="text-gray-600 mt-2">
                生成纯静态HTML文件，可以部署到任何静态托管服务
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">3. 部署选项</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                <div className="text-center p-3 bg-blue-100 rounded">
                  <div className="font-semibold">Vercel</div>
                  <div className="text-sm text-gray-600">自动部署</div>
                </div>
                <div className="text-center p-3 bg-green-100 rounded">
                  <div className="font-semibold">Netlify</div>
                  <div className="text-sm text-gray-600">静态托管</div>
                </div>
                <div className="text-center p-3 bg-purple-100 rounded">
                  <div className="font-semibold">CDN</div>
                  <div className="text-sm text-gray-600">全球加速</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA区域 */}
        <div className="text-center bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            体验SSG的极速性能
          </h2>
          <p className="text-xl mb-8 opacity-90">
            这个页面就是SSG的完美示例 - 预构建、极速加载、零服务器压力
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              查看源码
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-600 transition-colors">
              了解更多
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
