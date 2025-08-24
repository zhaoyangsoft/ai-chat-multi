// 标记为客户端组件
'use client'

// 导入React
import React from 'react'

// Markdown渲染组件的属性接口
interface MarkdownRendererProps {
  content: string  // 要渲染的Markdown内容
  className?: string  // 可选的CSS类名
}

// Markdown渲染组件
export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  // 简单的Markdown解析函数
  const parseMarkdown = (text: string): string => {
    if (!text) return ''
    
    let parsed = text
    
    // 处理代码块 (```code```)
    parsed = parsed.replace(/```([\s\S]*?)```/g, (match, code) => {
      return `<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4"><code class="text-sm">${code}</code></pre>`
    })
    
    // 处理行内代码 (`code`)
    parsed = parsed.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">$1</code>')
    
    // 处理粗体 (**text**)
    parsed = parsed.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
    
    // 处理斜体 (*text*)
    parsed = parsed.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    
    // 处理链接 [text](url)
    parsed = parsed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-500 hover:text-blue-700 underline" target="_blank" rel="noopener noreferrer">$1</a>')
    
    // 处理标题 (# ## ###)
    parsed = parsed.replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
    parsed = parsed.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>')
    parsed = parsed.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
    
    // 处理列表项 (- item)
    parsed = parsed.replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
    
    // 处理数字列表 (1. item)
    parsed = parsed.replace(/^\d+\. (.*$)/gim, '<li class="ml-4">$1</li>')
    
    // 处理引用 (> text)
    parsed = parsed.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-4 italic text-gray-600 dark:text-gray-400">$1</blockquote>')
    
    // 处理换行
    parsed = parsed.replace(/\n/g, '<br>')
    
    return parsed
  }

  // 渲染HTML内容
  const renderHtml = (html: string) => {
    return { __html: html }
  }

  return (
    <div 
      className={`markdown-content ${className}`}
      dangerouslySetInnerHTML={renderHtml(parseMarkdown(content))}
    />
  )
}
