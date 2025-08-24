// 标记为客户端组件
'use client'

// 导入React
import React, { useState } from 'react'
// 导入多模态组件
import MultimodalInput from '../../components/MultimodalInput'
// 导入类型定义
import { Message, MediaContent } from '../../types'

// 语音转文本测试页面组件
export default function VoiceToTextTestPage() {
  // 状态管理
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [transcriptionResult, setTranscriptionResult] = useState<string>('')

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

    // 如果有音频文件，测试语音转文本
    if (media && media.length > 0) {
      const audioFile = media.find(m => m.type === 'audio')
      if (audioFile) {
        await testVoiceToText(audioFile)
      }
    }

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

  // 测试语音转文本功能
  const testVoiceToText = async (audioContent: MediaContent) => {
    try {
      const response = await fetch('/api/speech-to-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          audioData: audioContent.base64,
          mimeType: audioContent.mimeType
        }),
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          setTranscriptionResult(result.text)
        }
      }
    } catch (error) {
      console.error('语音转文本测试失败:', error)
      setTranscriptionResult('语音转文本失败')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          {/* 页面标题 */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              🎤 语音转文本测试
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              测试语音录制、转文本和发送给大模型的功能
            </p>
          </div>

          {/* 语音转文本结果显示 */}
          {transcriptionResult && (
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-4">语音转文本结果</h2>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <p className="text-green-800 dark:text-green-200">
                  <strong>识别结果：</strong> {transcriptionResult}
                </p>
              </div>
            </div>
          )}

          {/* 聊天区域 */}
          <div className="flex flex-col h-96">
            {/* 消息列表 */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                  <div className="text-6xl mb-4">🎤</div>
                  <p className="text-lg font-medium mb-2">开始测试语音转文本</p>
                  <p className="text-sm">点击下方的录音按钮录制语音，系统会自动转换为文本并发送给AI</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="max-w-2xl">
                      <div className={`px-4 py-3 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-primary-500 text-white'
                          : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white'
                      }`}>
                        <div className="whitespace-pre-wrap break-words">
                          {message.content}
                        </div>
                        {message.media && message.media.length > 0 && (
                          <div className="mt-2 text-xs opacity-75">
                            📎 包含 {message.media.length} 个媒体文件
                          </div>
                        )}
                      </div>
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
          <h2 className="text-xl font-semibold mb-4">🎤 语音转文本流程</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-2">1. 录制语音</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 点击录音按钮开始录制</li>
                <li>• 实时波形可视化</li>
                <li>• 支持暂停和继续</li>
                <li>• 自动保存录音</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">2. 语音转文本</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 自动调用语音识别API</li>
                <li>• 支持多种语音识别服务</li>
                <li>• 实时显示转换结果</li>
                <li>• 错误处理和重试</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">3. 发送给AI</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 转换后的文本发送给大模型</li>
                <li>• 保留原始音频用于显示</li>
                <li>• 流式响应处理</li>
                <li>• 完整的对话历史</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 技术说明 */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">🔧 技术实现</h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• <strong>录音：</strong>使用 react-audio-voice-recorder 库</li>
            <li>• <strong>编码：</strong>音频数据转换为 Base64 格式</li>
            <li>• <strong>识别：</strong>调用 OpenAI Whisper 或 DeepSeek 语音API</li>
            <li>• <strong>发送：</strong>文本和音频数据一起发送给大模型</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
