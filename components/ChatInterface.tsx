// 标记为客户端组件
'use client'

// 导入React hooks
import { useState, useRef, useEffect } from 'react'
// 导入图标组件
import { Send, User, Bot, Loader2 } from 'lucide-react'
// 导入类型定义
import { Message, MediaContent } from '../types'
// 导入Markdown渲染器
import MarkdownRenderer from './MarkdownRenderer'
// 导入多模态组件
import MultimodalMessage from './MultimodalMessage'
import MultimodalInput from './MultimodalInput'

// 聊天界面组件的属性接口
interface ChatInterfaceProps {
  messages: Message[]                                    // 消息列表
  isLoading: boolean                                    // 是否正在加载
  onSendMessage: (content: string, media?: MediaContent[]) => void // 发送消息的回调函数
  messagesEndRef: React.RefObject<HTMLDivElement>      // 消息列表末尾的引用
}

export default function ChatInterface({ 
  messages, 
  isLoading, 
  onSendMessage, 
  messagesEndRef 
}: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue)
      setInputValue('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus()
    }
  }, [isLoading])

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="flex flex-col h-full">
      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
            <Bot className="w-16 h-16 mb-4 text-gray-300 dark:text-gray-600" />
            <h3 className="text-lg font-medium mb-2">欢迎使用AI聊天助手</h3>
            <p className="text-sm max-w-md">
              我是基于DeepSeek API的智能助手，可以回答您的问题、帮助您解决问题。
              请开始输入您的问题吧！
            </p>
          </div>
        ) : (
                     messages.map((message) => (
             <div
               key={message.id}
               className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
             >
               <div className={`flex max-w-3xl ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                 <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                   message.role === 'user' 
                     ? 'bg-primary-500 text-white ml-3' 
                     : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 mr-3'
                 }`}>
                   {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                 </div>
                 
                 <div className="flex-1">
                   <MultimodalMessage 
                     message={message}
                     isUser={message.role === 'user'}
                   />
                   
                   <div className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${
                     message.role === 'user' ? 'text-right' : 'text-left'
                   }`}>
                     {formatTime(message.timestamp)}
                   </div>
                 </div>
               </div>
             </div>
           ))
        )}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex max-w-3xl">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center mr-3">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex items-center space-x-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl">
                <Loader2 className="w-4 h-4 animate-spin text-primary-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">正在思考...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

             {/* 多模态输入框 */}
       <MultimodalInput 
         onSendMessage={onSendMessage}
         isLoading={isLoading}
       />
    </div>
  )
}
