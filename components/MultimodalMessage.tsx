// 标记为客户端组件
'use client'

// 导入React
import React, { useState } from 'react'
// 导入图标
import { Play, Pause, Download, File, Image, Volume2 } from 'lucide-react'
// 导入类型定义
import { Message, MediaContent } from '../types'
// 导入Markdown渲染器
import MarkdownRenderer from './MarkdownRenderer'

// 多模态消息组件的属性接口
interface MultimodalMessageProps {
  message: Message
  isUser: boolean
}

// 多模态消息组件
export default function MultimodalMessage({ message, isUser }: MultimodalMessageProps) {
  // 状态管理
  const [audioPlaying, setAudioPlaying] = useState<{ [key: string]: boolean }>({})

  // 处理音频播放
  const handleAudioPlay = (mediaIndex: number) => {
    const audioElement = document.getElementById(`audio-${message.id}-${mediaIndex}`) as HTMLAudioElement
    if (audioElement) {
      if (audioPlaying[`${message.id}-${mediaIndex}`]) {
        audioElement.pause()
        setAudioPlaying(prev => ({ ...prev, [`${message.id}-${mediaIndex}`]: false }))
      } else {
        // 停止其他音频
        Object.keys(audioPlaying).forEach(key => {
          const otherAudio = document.getElementById(`audio-${key}`) as HTMLAudioElement
          if (otherAudio) {
            otherAudio.pause()
          }
        })
        audioElement.play()
        setAudioPlaying(prev => ({ ...prev, [`${message.id}-${mediaIndex}`]: true }))
      }
    }
  }

  // 处理音频结束
  const handleAudioEnded = (mediaIndex: number) => {
    setAudioPlaying(prev => ({ ...prev, [`${message.id}-${mediaIndex}`]: false }))
  }

  // 下载文件
  const downloadFile = (media: MediaContent) => {
    if (media.base64) {
      const link = document.createElement('a')
      link.href = `data:${media.mimeType};base64,${media.base64}`
      link.download = media.filename || 'download'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  // 渲染媒体内容
  const renderMediaContent = (media: MediaContent, index: number) => {
    switch (media.type) {
      case 'image':
        return (
          <div key={index} className="mb-2">
            <img
              src={`data:${media.mimeType};base64,${media.base64}`}
              alt={media.filename || '图片'}
              className="max-w-full max-h-64 rounded-lg border cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => window.open(`data:${media.mimeType};base64,${media.base64}`, '_blank')}
            />
            {media.filename && (
              <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <Image className="w-3 h-3" />
                {media.filename}
              </div>
            )}
          </div>
        )

      case 'audio':
        return (
          <div key={index} className="mb-2">
            <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <button
                onClick={() => handleAudioPlay(index)}
                className="p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
              >
                {audioPlaying[`${message.id}-${index}`] ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </button>
              <audio
                id={`audio-${message.id}-${index}`}
                src={`data:${media.mimeType};base64,${media.base64}`}
                onEnded={() => handleAudioEnded(index)}
                style={{ display: 'none' }}
              />
              <div className="flex-1">
                <div className="text-sm font-medium">音频消息</div>
                {media.filename && (
                  <div className="text-xs text-gray-500">{media.filename}</div>
                )}
              </div>
              <button
                onClick={() => downloadFile(media)}
                className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        )

      case 'file':
        return (
          <div key={index} className="mb-2">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border">
              <File className="w-8 h-8 text-gray-500" />
              <div className="flex-1">
                <div className="text-sm font-medium">{media.filename}</div>
                <div className="text-xs text-gray-500">
                  {media.size ? `${(media.size / 1024).toFixed(1)} KB` : ''}
                </div>
              </div>
              <button
                onClick={() => downloadFile(media)}
                className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
      <div className={`px-4 py-3 rounded-2xl ${
        isUser
          ? 'bg-primary-500 text-white'
          : message.isError
          ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200'
          : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white'
      }`}>
        {/* 媒体内容 */}
        {message.media && message.media.length > 0 && (
          <div className="mb-3">
            {message.media.map((media, index) => renderMediaContent(media, index))}
          </div>
        )}

        {/* 文本内容 */}
        {message.content && (
          <div>
            {isUser ? (
              // 用户消息使用普通文本显示
              <div className="whitespace-pre-wrap break-words">
                {message.content}
              </div>
            ) : (
              // 助手消息使用Markdown渲染
              <MarkdownRenderer 
                content={message.content}
                className="prose prose-sm max-w-none dark:prose-invert"
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
