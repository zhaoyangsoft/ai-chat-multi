import { Trash2, Settings, Zap, Code } from 'lucide-react'
import Link from 'next/link'

interface HeaderProps {
  onClearChat: () => void
}

export default function Header({ onClearChat }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Zap className="w-6 h-6 text-primary-500" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              AI聊天助手
            </h1>
          </div>
          <div className="flex items-center space-x-2 px-3 py-1 bg-primary-50 dark:bg-primary-900/20 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
              在线
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Link 
            href="/ssr-ssg-isr-demo"
            className="flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
          >
            <Code className="w-4 h-4" />
            <span className="text-sm font-medium">SSR/SSG/ISR演示</span>
          </Link>
          
          <Link 
            href="/ssg-demo-real"
            className="flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
          >
            <span className="text-lg">🏗️</span>
            <span className="text-sm font-medium">SSG真实演示</span>
          </Link>
          
          <Link 
            href="/ai-workflow-value"
            className="flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
          >
            <span className="text-lg">🤖</span>
            <span className="text-sm font-medium">AI工作流价值</span>
          </Link>
          
          <button
            onClick={onClearChat}
            className="flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm font-medium">清空聊天</span>
          </button>
          
          <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors">
            <Settings className="w-4 h-4" />
            <span className="text-sm font-medium">设置</span>
          </button>
        </div>
      </div>
    </header>
  )
}
