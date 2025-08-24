'use client';

import { useState, useEffect } from 'react';

interface WorkflowData {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'failed' | 'pending';
  progress: number;
  startTime: string;
  duration: string;
}

export default function SSRDemo() {
  const [workflows, setWorkflows] = useState<WorkflowData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 模拟实时数据更新
  useEffect(() => {
    const mockData: WorkflowData[] = [
      {
        id: '1',
        name: 'AI数据分析流程',
        status: 'running',
        progress: 75,
        startTime: '14:30:25',
        duration: '2m 15s'
      },
      {
        id: '2',
        name: '自动化报告生成',
        status: 'completed',
        progress: 100,
        startTime: '14:25:10',
        duration: '1m 45s'
      },
      {
        id: '3',
        name: '智能决策引擎',
        status: 'pending',
        progress: 0,
        startTime: '14:35:00',
        duration: '0s'
      }
    ];

    setWorkflows(mockData);
    setIsLoading(false);

    // 模拟实时更新
    const interval = setInterval(() => {
      setWorkflows(prev => prev.map(wf => {
        if (wf.status === 'running' && wf.progress < 100) {
          return {
            ...wf,
            progress: Math.min(wf.progress + Math.random() * 10, 100),
            duration: `${Math.floor(Math.random() * 3)}m ${Math.floor(Math.random() * 60)}s`
          };
        }
        if (wf.status === 'running' && wf.progress >= 100) {
          return { ...wf, status: 'completed' as const };
        }
        if (wf.status === 'pending' && Math.random() > 0.7) {
          return { ...wf, status: 'running' as const };
        }
        return wf;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-blue-600';
      case 'completed': return 'text-green-600';
      case 'failed': return 'text-red-600';
      case 'pending': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return '🔄';
      case 'completed': return '✅';
      case 'failed': return '❌';
      case 'pending': return '⏳';
      default: return '⏳';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse bg-gray-200 h-4 rounded"></div>
        <div className="animate-pulse bg-gray-200 h-4 rounded w-3/4"></div>
        <div className="animate-pulse bg-gray-200 h-4 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-500 mb-3">
        🔄 实时更新 - 每2秒刷新
      </div>
      
      {workflows.map((workflow) => (
        <div key={workflow.id} className="border rounded-lg p-3 bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-lg">{getStatusIcon(workflow.status)}</span>
              <span className="font-medium text-sm">{workflow.name}</span>
            </div>
            <span className={`text-xs font-semibold ${getStatusColor(workflow.status)}`}>
              {workflow.status.toUpperCase()}
            </span>
          </div>
          
          <div className="mb-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>进度: {workflow.progress.toFixed(0)}%</span>
              <span>{workflow.duration}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  workflow.status === 'completed' ? 'bg-green-500' :
                  workflow.status === 'running' ? 'bg-blue-500' :
                  workflow.status === 'failed' ? 'bg-red-500' : 'bg-gray-400'
                }`}
                style={{ width: `${workflow.progress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="text-xs text-gray-500">
            开始时间: {workflow.startTime}
          </div>
        </div>
      ))}
      
      <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
        💡 SSR优势：实时数据渲染，确保内容始终最新
      </div>
    </div>
  );
}
