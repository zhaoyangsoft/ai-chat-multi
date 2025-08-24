// 标记为客户端组件
'use client'

// 导入React
import React, { useState } from 'react'
// 导入多模态组件
import MultimodalInput from '../../components/MultimodalInput'
import MultimodalMessage from '../../components/MultimodalMessage'
// 导入类型定义
import { Message, MediaContent } from '../../types'

// 多模态测试页面组件
export default function MultimodalTestPage() {
  // 状态管理
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // 处理发送消息
  const handleSendMessage = async (content: string, media?: MediaContent[]) => {
    // 创建用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date().toISOString(),
      media
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    // 模拟AI回复
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `我收到了您的消息：${content}${media && media.length > 0 ? `，以及 ${media.length} 个媒体文件` : ''}`,
        role: 'assistant',
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 2000)
  }

  // 创建测试消息
  const createTestMessage = (type: 'image' | 'audio' | 'file') => {
    const testMessage: Message = {
      id: Date.now().toString(),
      content: `这是一个测试${type === 'image' ? '图片' : type === 'audio' ? '音频' : '文件'}消息`,
      role: 'user',
      timestamp: new Date().toISOString(),
      media: [
        {
          type,
          base64: type === 'image' 
            ? 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==' // 1x1 透明图片
            : 'UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT' // 测试音频数据
            : 'SGVsbG8gV29ybGQ=' // "Hello World" 的 Base64
          ,
          filename: type === 'image' ? 'test.png' : type === 'audio' ? 'test.wav' : 'test.txt',
          size: type === 'image' ? 1024 : type === 'audio' ? 2048 : 512,
          mimeType: type === 'image' ? 'image/png' : type === 'audio' ? 'audio/wav' : 'text/plain'
        }
      ]
    }
    setMessages(prev => [...prev, testMessage])
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          {/* 页面标题 */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              多模态交互测试
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              测试图片上传、语音录制、文件处理等多模态功能
            </p>
          </div>

          {/* 测试按钮 */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-4">快速测试</h2>
            <div className="flex gap-4">
              <button
                onClick={() => createTestMessage('image')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                添加测试图片
              </button>
              <button
                onClick={() => createTestMessage('audio')}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                添加测试音频
              </button>
              <button
                onClick={() => createTestMessage('file')}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                添加测试文件
              </button>
            </div>
          </div>

          {/* 聊天区域 */}
          <div className="flex flex-col h-96">
            {/* 消息列表 */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                  <p>暂无消息，请开始测试多模态功能</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="max-w-2xl">
                      <MultimodalMessage 
                        message={message}
                        isUser={message.role === 'user'}
                      />
                    </div>
                  </div>
                ))
              )}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">AI正在处理...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 多模态输入框 */}
            <MultimodalInput 
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* 功能说明 */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">功能说明</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-2">📷 图片上传</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 支持拖拽上传</li>
                <li>• 支持点击选择</li>
                <li>• 格式：JPG, PNG, GIF, WebP</li>
                <li>• 预览和下载功能</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">🎤 语音录制</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 实时录音</li>
                <li>• 可视化波形</li>
                <li>• 降噪和回声消除</li>
                <li>• 播放和下载功能</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">📁 文件处理</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 支持多种文件格式</li>
                <li>• PDF, TXT, JSON等</li>
                <li>• 文件大小显示</li>
                <li>• 下载功能</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
