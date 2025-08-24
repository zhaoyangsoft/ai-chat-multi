// 标记为客户端组件
'use client'

// 导入React
import React, { useState } from 'react'
// 导入图标
import { Upload, Code, Download, Copy, Check, Settings } from 'lucide-react'
// 导入类型定义
import { AIModel } from '../../types'
// 导入模型管理器
import { modelManager } from '../../lib/multimodal-config'

// UI转代码测试页面组件
export default function UIToCodeTestPage() {
  // 状态管理
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [selectedModel, setSelectedModel] = useState<AIModel>('gpt-4-vision-preview')
  const [framework, setFramework] = useState('react')
  const [language, setLanguage] = useState('typescript')
  const [requirements, setRequirements] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  // 获取支持UI分析的模型
  const uiModels = modelManager.getUIAnalysisModels()

  // 处理图片上传
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // 验证文件格式
    if (!modelManager.isFormatSupported(selectedModel, file.type)) {
      alert(`模型 ${selectedModel} 不支持文件格式 ${file.type}`)
      return
    }

    // 验证文件大小
    if (!modelManager.isSizeValid(selectedModel, file.size)) {
      alert(`文件大小 ${file.size} 超过模型限制`)
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const base64 = reader.result as string
      setSelectedImage(base64.split(',')[1])
    }
    reader.readAsDataURL(file)
  }

  // 生成代码
  const generateCode = async () => {
    if (!selectedImage) {
      alert('请先上传UI图片')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/ui-to-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageData: selectedImage,
          mimeType: 'image/jpeg', // 简化处理，实际应该从文件获取
          model: selectedModel,
          framework,
          language,
          requirements
        }),
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          setGeneratedCode(result.code)
        } else {
          alert('代码生成失败')
        }
      } else {
        const error = await response.json()
        alert(`错误: ${error.error}`)
      }
    } catch (error) {
      console.error('代码生成失败:', error)
      alert('代码生成失败')
    } finally {
      setIsLoading(false)
    }
  }

  // 复制代码
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('复制失败:', error)
    }
  }

  // 下载代码
  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ui-code.${language === 'typescript' ? 'tsx' : 'jsx'}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          {/* 页面标题 */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              🎨 UI图片转代码
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              上传UI设计图片，AI自动生成对应的前端代码
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* 左侧：图片上传和配置 */}
            <div className="space-y-6">
              {/* 模型选择 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  AI模型
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value as AIModel)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {uiModels.map(model => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>

              {/* 框架选择 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  前端框架
                </label>
                <select
                  value={framework}
                  onChange={(e) => setFramework(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="react">React</option>
                  <option value="vue">Vue</option>
                  <option value="angular">Angular</option>
                  <option value="svelte">Svelte</option>
                  <option value="html">纯HTML/CSS</option>
                </select>
              </div>

              {/* 编程语言 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  编程语言
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="typescript">TypeScript</option>
                  <option value="javascript">JavaScript</option>
                </select>
              </div>

              {/* 额外要求 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  额外要求（可选）
                </label>
                <textarea
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="例如：使用Tailwind CSS、添加动画效果、支持深色模式等"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  rows={3}
                />
              </div>

              {/* 图片上传 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  UI设计图片
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      点击上传UI设计图片
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      支持 JPG, PNG, GIF, WebP 格式
                    </span>
                  </label>
                </div>
              </div>

              {/* 生成按钮 */}
              <button
                onClick={generateCode}
                disabled={!selectedImage || isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    生成中...
                  </>
                ) : (
                  <>
                    <Code className="w-4 h-4 mr-2" />
                    生成代码
                  </>
                )}
              </button>
            </div>

            {/* 右侧：生成的代码 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  生成的代码
                </h3>
                {generatedCode && (
                  <div className="flex space-x-2">
                    <button
                      onClick={copyCode}
                      className="flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          已复制
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-1" />
                          复制
                        </>
                      )}
                    </button>
                    <button
                      onClick={downloadCode}
                      className="flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      下载
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 h-96 overflow-auto">
                {generatedCode ? (
                  <pre className="text-sm whitespace-pre-wrap">{generatedCode}</pre>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                      <Code className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>上传UI图片并点击生成按钮</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 功能说明 */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🎨 支持的模型和功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-2">OpenAI GPT-4 Vision</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 强大的图像理解能力</li>
                <li>• 高质量代码生成</li>
                <li>• 支持多种编程语言</li>
                <li>• 最大20MB图片</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Claude 3 Opus/Sonnet</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 优秀的UI分析能力</li>
                <li>• 200K上下文窗口</li>
                <li>• 代码质量极高</li>
                <li>• 支持复杂设计</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Google Gemini Pro Vision</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 免费额度较大</li>
                <li>• 快速响应</li>
                <li>• 多语言支持</li>
                <li>• 最大4MB图片</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">通义千问 Qwen-VL</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 中文理解能力强</li>
                <li>• 国内服务稳定</li>
                <li>• 支持多种框架</li>
                <li>• 最大10MB图片</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">文心一言 ERNIE Bot</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 百度开发</li>
                <li>• 中文优化</li>
                <li>• 图像分析能力强</li>
                <li>• 最大10MB图片</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">支持的前端框架</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• React (TypeScript/JavaScript)</li>
                <li>• Vue (TypeScript/JavaScript)</li>
                <li>• Angular (TypeScript)</li>
                <li>• Svelte (TypeScript/JavaScript)</li>
                <li>• 纯HTML/CSS</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 使用建议 */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">💡 使用建议</h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• <strong>图片质量：</strong>使用清晰、高分辨率的UI设计图片</li>
            <li>• <strong>设计稿：</strong>包含完整的界面元素和布局信息</li>
            <li>• <strong>要求描述：</strong>在额外要求中详细说明特殊需求</li>
            <li>• <strong>模型选择：</strong>根据项目需求选择合适的AI模型</li>
            <li>• <strong>代码优化：</strong>生成的代码可能需要进一步优化和调整</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
