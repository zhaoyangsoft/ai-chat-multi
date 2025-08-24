'use client'

import React, { useState } from 'react'

export default function DebugPage() {
  const [testResult, setTestResult] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const testAPI = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/test')
      const data = await response.json()
      setTestResult(JSON.stringify(data, null, 2))
    } catch (error) {
      setTestResult(`错误: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const testChatAPI = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: '你好', id: '1', timestamp: new Date().toISOString() }],
          stream: false
        }),
      })
      
      if (!response.ok) {
        const errorText = await response.text()
        setTestResult(`聊天API错误: ${response.status} - ${errorText}`)
      } else {
        const data = await response.json()
        setTestResult(JSON.stringify(data, null, 2))
      }
    } catch (error) {
      setTestResult(`聊天API错误: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const checkEnvVars = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/env-check')
      const data = await response.json()
      setTestResult(JSON.stringify(data, null, 2))
    } catch (error) {
      setTestResult(`环境变量检查错误: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API调试页面</h1>
        
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">API测试</h2>
            <div className="space-y-2">
              <button
                onClick={testAPI}
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
              >
                {loading ? '测试中...' : '测试基础API'}
              </button>
              
                             <button
                 onClick={testChatAPI}
                 disabled={loading}
                 className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 ml-2"
               >
                 {loading ? '测试中...' : '测试聊天API'}
               </button>
               
               <button
                 onClick={checkEnvVars}
                 disabled={loading}
                 className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:bg-gray-400 ml-2"
               >
                 {loading ? '检查中...' : '检查环境变量'}
               </button>
            </div>
          </div>
          
          {testResult && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">测试结果:</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {testResult}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
