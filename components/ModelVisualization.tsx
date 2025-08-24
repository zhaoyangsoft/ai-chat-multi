'use client'

import { useState, useEffect } from 'react'
import { 
  Activity, 
  Clock, 
  Zap, 
  Cpu, 
  BarChart3, 
  TrendingUp,
  Wifi,
  WifiOff,
  MessageSquare,
  Settings
} from 'lucide-react'
import { ModelStatus } from '@/types'

interface ModelVisualizationProps {
  modelStatus: ModelStatus
  messageCount: number
}

export default function ModelVisualization({ modelStatus, messageCount }: ModelVisualizationProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="h-full flex flex-col">
      {/* 标题栏 */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            模型状态
          </h2>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* 连接状态 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">连接状态</h3>
            <div className={`flex items-center space-x-2 px-2 py-1 rounded-full text-xs ${
              modelStatus.isConnected 
                ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}>
              {modelStatus.isConnected ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
              <span>{modelStatus.isConnected ? '已连接' : '未连接'}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">模型名称</span>
              <span className="font-medium text-gray-900 dark:text-white">{modelStatus.modelName}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">温度</span>
              <span className="font-medium text-gray-900 dark:text-white">{modelStatus.temperature}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">最大令牌</span>
              <span className="font-medium text-gray-900 dark:text-white">{modelStatus.maxTokens}</span>
            </div>
          </div>
        </div>

        {/* 性能指标 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">性能指标</h3>
          
          <div className="space-y-4">
            {/* 响应时间 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">响应时间</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {modelStatus.responseTime.toFixed(2)}s
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${Math.min((modelStatus.responseTime / 10) * 100, 100)}%` 
                  }}
                ></div>
              </div>
            </div>

            {/* 令牌速度 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">令牌/秒</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {modelStatus.tokensPerSecond.toFixed(1)}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${Math.min((modelStatus.tokensPerSecond / 50) * 100, 100)}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* 聊天统计 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">聊天统计</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">消息总数</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{messageCount}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-purple-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">活跃状态</span>
              </div>
              <div className={`w-2 h-2 rounded-full ${
                modelStatus.isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
              }`}></div>
            </div>
          </div>
        </div>

        {/* 实时图表 */}
        {isExpanded && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">实时监控</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center h-20 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">图表功能开发中</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <div className="font-medium text-gray-900 dark:text-white">CPU使用率</div>
                  <div className="text-gray-500 dark:text-gray-400">正常</div>
                </div>
                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <div className="font-medium text-gray-900 dark:text-white">内存使用</div>
                  <div className="text-gray-500 dark:text-gray-400">正常</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部状态栏 */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>最后更新: {new Date().toLocaleTimeString('zh-CN')}</span>
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>实时</span>
          </div>
        </div>
      </div>
    </div>
  )
}
