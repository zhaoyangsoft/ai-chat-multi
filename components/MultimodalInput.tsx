// 标记为客户端组件
'use client'

// 导入React
import React, { useState, useCallback } from 'react'
// 导入图标
import { Upload, Mic, MicOff, File, X, Send, Volume2 } from 'lucide-react'
// 导入第三方库
import { AudioRecorder } from 'react-audio-voice-recorder'
// 导入类型定义
import { MediaContent } from '../types'

// 多模态输入组件的属性接口
interface MultimodalInputProps {
  onSendMessage: (content: string, media?: MediaContent[]) => void
  isLoading: boolean
}

// 多模态输入组件
export default function MultimodalInput({ onSendMessage, isLoading }: MultimodalInputProps) {
  // 状态管理
  const [inputValue, setInputValue] = useState('')
  const [mediaFiles, setMediaFiles] = useState<MediaContent[]>([])
  const [isRecording, setIsRecording] = useState(false)

  // 处理文件上传
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = reader.result as string
        const mediaContent: MediaContent = {
          type: file.type.startsWith('image/') ? 'image' : 'file',
          base64: base64.split(',')[1], // 移除 data:image/jpeg;base64, 前缀
          filename: file.name,
          size: file.size,
          mimeType: file.type
        }
        setMediaFiles(prev => [...prev, mediaContent])
      }
      reader.readAsDataURL(file)
    })
  }, [])

  // 处理语音录制完成
  const handleAudioRecording = (blob: Blob) => {
    const reader = new FileReader()
    reader.onload = () => {
      const base64 = reader.result as string
      const mediaContent: MediaContent = {
        type: 'audio',
        base64: base64.split(',')[1],
        filename: `audio_${Date.now()}.wav`,
        size: blob.size,
        mimeType: blob.type
      }
      setMediaFiles(prev => [...prev, mediaContent])
      
      // 自动将语音转换为文本并发送
      handleVoiceToText(mediaContent)
    }
    reader.readAsDataURL(blob)
  }

  // 处理语音转文本
  const handleVoiceToText = async (audioContent: MediaContent) => {
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
        if (result.success && result.text) {
          // 将转换后的文本设置到输入框
          setInputValue(result.text)
        }
      }
    } catch (error) {
      console.error('语音转文本失败:', error)
    }
  }

  // 移除媒体文件
  const removeMediaFile = (index: number) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index))
  }

  // 处理发送消息
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if ((inputValue.trim() || mediaFiles.length > 0) && !isLoading) {
      onSendMessage(inputValue, mediaFiles.length > 0 ? mediaFiles : undefined)
      setInputValue('')
      setMediaFiles([])
    }
  }

  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 p-6">
      {/* 媒体文件预览 */}
      {mediaFiles.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {mediaFiles.map((file, index) => (
            <div key={index} className="relative group">
              {file.type === 'image' ? (
                <img
                  src={`data:${file.mimeType};base64,${file.base64}`}
                  alt={file.filename}
                  className="w-16 h-16 object-cover rounded-lg border"
                />
              ) : file.type === 'audio' ? (
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-lg border flex items-center justify-center">
                  <Volume2 className="w-6 h-6 text-blue-500" />
                </div>
              ) : (
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg border flex items-center justify-center">
                  <File className="w-6 h-6 text-gray-500" />
                </div>
              )}
              <button
                onClick={() => removeMediaFile(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
                {file.filename}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 输入表单 */}
      <form onSubmit={handleSubmit} className="flex space-x-4">
        {/* 文件上传按钮 */}
        <div className="flex-shrink-0">
          <input
            type="file"
            multiple
            accept="image/*,audio/*,.pdf,.txt,.json"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
            disabled={isLoading}
          />
          <label
            htmlFor="file-upload"
            className="p-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer flex items-center justify-center"
          >
            <Upload className="w-5 h-5 text-gray-500" />
          </label>
        </div>

        {/* 语音录制按钮 */}
        <div className="flex-shrink-0">
          <AudioRecorder
            onRecordingComplete={handleAudioRecording}
            audioTrackConstraints={{
              noiseSuppression: true,
              echoCancellation: true,
            }}
            downloadOnSavePress={false}
            downloadFileExtension="wav"
            showVisualizer={true}
            classes={{
              AudioRecorderClass: `p-3 rounded-xl border transition-colors ${
                isRecording
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
              }`
            }}
          />
        </div>

        {/* 文本输入框 */}
        <div className="flex-1 relative">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入您的问题或上传文件..."
            disabled={isLoading}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            rows={1}
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
        </div>
        
        {/* 发送按钮 */}
        <button
          type="submit"
          disabled={(!inputValue.trim() && mediaFiles.length === 0) || isLoading}
          className="px-4 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-xl transition-colors flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
      
      {/* 提示信息 */}
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
        支持图片、音频、PDF等文件，按 Enter 发送，Shift + Enter 换行
      </div>
    </div>
  )
}
