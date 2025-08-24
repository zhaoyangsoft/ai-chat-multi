// 标记为客户端组件，启用客户端交互功能
'use client'

// 导入React
import React, { useState, useRef, useEffect } from 'react'
// 导入自定义组件
import ChatInterface from '../components/ChatInterface'        // 聊天界面组件
import ModelVisualization from '../components/ModelVisualization' // 模型可视化组件
import Header from '../components/Header'                      // 页面头部组件
// 导入类型定义
import { Message, ModelStatus, MediaContent } from '../types'

// 主页面组件
export default function Home() {
  // 状态管理：聊天消息列表
  const [messages, setMessages] = useState<Message[]>([])
  // 状态管理：是否正在加载中
  const [isLoading, setIsLoading] = useState(false)
  // 状态管理：模型状态信息
  const [modelStatus, setModelStatus] = useState<ModelStatus>({
    isConnected: true,    // 默认设置为已连接状态
    responseTime: 0,      // 响应时间（秒）
    tokensPerSecond: 0,   // 令牌生成速度
    modelName: 'DeepSeek Chat', // 模型名称
    temperature: 0.7,     // 温度参数
    maxTokens: 2048       // 最大令牌数
  })

  // 创建对消息列表末尾的引用，用于自动滚动
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 滚动到消息列表底部的函数
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // 当消息列表更新时，自动滚动到底部
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 处理发送消息的函数
  const handleSendMessage = async (content: string, media?: MediaContent[]) => {
    // 如果消息内容为空，直接返回
    if (!content.trim()) return

    // 创建用户消息对象
    const userMessage: Message = {
      id: Date.now().toString(),           // 使用时间戳作为唯一ID
      content,                             // 消息内容
      role: 'user',                        // 消息角色：用户
      timestamp: new Date().toISOString(), // 时间戳
      media                               // 媒体内容
    }

    // 将用户消息添加到消息列表
    setMessages(prev => [...prev, userMessage])
    // 设置加载状态为true
    setIsLoading(true)

    try {
      // 发送POST请求到聊天API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // 设置请求头
        },
        body: JSON.stringify({
          messages: [...messages, userMessage], // 发送所有历史消息
          stream: true,                         // 启用流式响应
          audioData: media && media.length > 0 ? media.find(m => m.type === 'audio') : undefined // 发送音频数据
        }),
      })

      // 检查响应是否成功
      if (!response.ok) {
        throw new Error('网络请求失败')
      }

      // 获取响应体的读取器
      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('无法读取响应流')
      }

      // 创建文本解码器
      const decoder = new TextDecoder()
      // 创建助手消息对象
      let assistantMessage: Message = {
        id: (Date.now() + 1).toString(),        // 使用时间戳+1作为唯一ID
        content: '',                             // 初始内容为空
        role: 'assistant',                       // 消息角色：助手
        timestamp: new Date().toISOString()      // 时间戳
      }

      // 将助手消息添加到消息列表
      setMessages(prev => [...prev, assistantMessage])

      // 记录开始时间，用于计算响应时间
      const startTime = Date.now()
      // 令牌计数器
      let tokenCount = 0

      // 循环读取流数据
      while (true) {
        const { done, value } = await reader.read()
        
        // 如果流结束，跳出循环
        if (done) break

        // 解码接收到的数据
        const chunk = decoder.decode(value)
        // 按行分割数据
        const lines = chunk.split('\n')

        // 处理每一行数据
        for (const line of lines) {
          // 检查是否是数据行
          if (line.startsWith('data: ')) {
            const data = line.slice(6) // 移除 'data: ' 前缀
            
            // 检查是否是结束标记
            if (data === '[DONE]') {
              break
            }

            try {
              // 解析JSON数据
              const parsed = JSON.parse(data)
              // 检查是否有新的内容
              if (parsed.choices?.[0]?.delta?.content) {
                const content = parsed.choices[0].delta.content
                // 将新内容追加到助手消息
                assistantMessage.content += content
                tokenCount++ // 增加令牌计数
                
                // 更新模型状态信息
                const currentTime = Date.now()
                const elapsed = (currentTime - startTime) / 1000 // 计算经过的时间（秒）
                setModelStatus(prev => ({
                  ...prev,
                  isConnected: true,                                    // 设置为已连接
                  responseTime: elapsed,                               // 更新响应时间
                  tokensPerSecond: elapsed > 0 ? tokenCount / elapsed : 0 // 计算令牌速度
                }))

                // 更新消息列表中的助手消息内容
                setMessages(prev => 
                  prev.map(msg => 
                    msg.id === assistantMessage.id 
                      ? { ...msg, content: assistantMessage.content } // 更新内容
                      : msg
                  )
                )
              }
            } catch (e) {
              console.error('解析响应数据失败:', e)
            }
          }
        }
      }

    } catch (error) {
      // 处理错误情况
      console.error('发送消息失败:', error)
      // 创建错误消息
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),        // 使用时间戳+2作为唯一ID
        content: '抱歉，发送消息时出现错误。请稍后重试。', // 错误提示内容
        role: 'assistant',                       // 消息角色：助手
        timestamp: new Date().toISOString(),     // 时间戳
        isError: true                           // 标记为错误消息
      }
      // 将错误消息添加到消息列表
      setMessages(prev => [...prev, errorMessage])
    } finally {
      // 无论成功还是失败，都要执行的操作
      setIsLoading(false) // 设置加载状态为false
      setModelStatus(prev => ({ ...prev, isConnected: false })) // 设置连接状态为false
    }
  }

  // 清空聊天记录的函数
  const clearChat = () => {
    setMessages([]) // 清空消息列表
    // 重置模型状态
    setModelStatus(prev => ({ 
      ...prev, 
      isConnected: false,    // 设置连接状态为false
      responseTime: 0,       // 重置响应时间
      tokensPerSecond: 0     // 重置令牌速度
    }))
  }

  // 渲染页面结构
  return (
    <div className="flex flex-col h-screen">
      {/* 页面头部 */}
      <Header onClearChat={clearChat} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* 主聊天区域 - 占据剩余空间 */}
        <div className="flex-1 flex flex-col">
          <ChatInterface 
            messages={messages}           // 传递消息列表
            isLoading={isLoading}         // 传递加载状态
            onSendMessage={handleSendMessage} // 传递发送消息函数
            messagesEndRef={messagesEndRef}   // 传递滚动引用
          />
        </div>
        
        {/* 模型可视化侧边栏 - 固定宽度320px */}
        <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
          <ModelVisualization 
            modelStatus={modelStatus}     // 传递模型状态
            messageCount={messages.length} // 传递消息数量
          />
        </div>
      </div>
    </div>
  )
}
