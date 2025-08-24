'use client';

import { Suspense } from 'react';
import SSRDemo from '@/components/SSRDemo';
import SSGDemo from '@/components/SSGDemo';
import ISRDemo from '@/components/ISRDemo';
import AIWorkflowAdvantages from '@/components/AIWorkflowAdvantages';
import Header from '@/components/Header';

export default function SSRDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 静态Header，不需要事件处理函数 */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🚀</span>
              <h1 className="text-xl font-bold text-gray-900">
                AI企业工作流优化平台
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <a 
              href="/"
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
            AI企业工作流优化平台
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            基于Next.js 14的现代化渲染技术，为企业提供高性能、可扩展的AI工作流解决方案
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <div className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">
              SSR - 服务端渲染
            </div>
            <div className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold">
              SSG - 静态生成
            </div>
            <div className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold">
              ISR - 增量静态再生
            </div>
          </div>
        </div>

        {/* AI工作流优势展示 */}
        <AIWorkflowAdvantages />

        {/* 技术演示区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">SSR 服务端渲染</h3>
            <p className="text-gray-600 mb-4">
              实时数据渲染，确保内容始终最新，提升SEO表现
            </p>
            <Suspense fallback={<div className="animate-pulse bg-gray-200 h-32 rounded"></div>}>
              <SSRDemo />
            </Suspense>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-green-600 mb-4">SSG 静态生成</h3>
            <p className="text-gray-600 mb-4">
              预构建页面，极速加载，降低服务器成本
            </p>
            <Suspense fallback={<div className="animate-pulse bg-gray-200 h-32 rounded"></div>}>
              <SSGDemo />
            </Suspense>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-purple-600 mb-4">ISR 增量静态再生</h3>
            <p className="text-gray-600 mb-4">
              智能缓存更新，平衡性能与实时性
            </p>
            <Suspense fallback={<div className="animate-pulse bg-gray-200 h-32 rounded"></div>}>
              <ISRDemo />
            </Suspense>
          </div>
        </div>

        {/* 企业价值展示 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            为企业带来的核心价值
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">性能提升</h3>
              <p className="text-gray-600">页面加载速度提升60%，用户体验显著改善</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">成本降低</h3>
              <p className="text-gray-600">服务器资源消耗减少40%，运维成本大幅下降</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">可靠性增强</h3>
              <p className="text-gray-600">99.9%的可用性保证，业务连续性得到保障</p>
            </div>
          </div>
        </div>

        {/* CTA区域 */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            开始您的AI工作流优化之旅
          </h2>
          <p className="text-xl mb-8 opacity-90">
            立即体验Next.js 14的强大渲染能力，为企业数字化转型赋能
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
            免费试用
          </button>
        </div>
      </main>
    </div>
  );
}
