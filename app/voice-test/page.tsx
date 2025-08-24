// 标记为客户端组件
'use client'

// 导入React
import React, { useState } from 'react'
// 导入多模态组件
import MultimodalInput from '../../components/MultimodalInput'
import MultimodalMessage from '../../components/MultimodalMessage'
// 导入类型定义
import { Message, MediaContent } from '../../types'

// 语音测试页面组件
export default function VoiceTestPage() {
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

  // 创建测试音频消息
  const createTestAudioMessage = () => {
    const testMessage: Message = {
      id: Date.now().toString(),
      content: '这是一个测试音频消息',
      role: 'user',
      timestamp: new Date().toISOString(),
      media: [
        {
          type: 'audio',
          base64: 'UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT',
          filename: 'test_audio.wav',
          size: 2048,
          mimeType: 'audio/wav'
        }
      ]
    }
    setMessages(prev => [...prev, testMessage])
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          {/* 页面标题 */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              🎤 语音交互测试
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              测试语音录制、播放和多模态交互功能
            </p>
          </div>

          {/* 测试按钮 */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-4">快速测试</h2>
            <div className="flex gap-4">
              <button
                onClick={createTestAudioMessage}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                添加测试音频
              </button>
            </div>
          </div>

          {/* 聊天区域 */}
          <div className="flex flex-col h-96">
            {/* 消息列表 */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                  <div className="text-6xl mb-4">🎤</div>
                  <p className="text-lg font-medium mb-2">开始测试语音功能</p>
                  <p className="text-sm">点击下方的录音按钮开始录制语音，或上传音频文件</p>
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
          <h2 className="text-xl font-semibold mb-4">🎤 语音功能说明</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">录音功能</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 点击录音按钮开始录制</li>
                <li>• 实时波形可视化</li>
                <li>• 降噪和回声消除</li>
                <li>• 支持暂停和继续</li>
                <li>• 自动保存录音</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">播放功能</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 点击播放按钮播放音频</li>
                <li>• 支持暂停和继续</li>
                <li>• 自动停止其他音频</li>
                <li>• 下载音频文件</li>
                <li>• 显示音频信息</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 使用提示 */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">💡 使用提示</h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• 确保浏览器允许麦克风权限</li>
            <li>• 建议使用 Chrome 或 Edge 浏览器</li>
            <li>• 录音时请保持安静的环境</li>
            <li>• 支持上传 MP3、WAV、M4A 等格式</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
