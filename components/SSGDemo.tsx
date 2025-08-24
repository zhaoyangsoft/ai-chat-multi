'use client';

import { useState, useEffect } from 'react';

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  improvement: number;
  color: string;
}

export default function SSGDemo() {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mockMetrics: PerformanceMetric[] = [
      {
        name: '首屏加载时间',
        value: 0.8,
        unit: '秒',
        improvement: 60,
        color: 'blue'
      },
      {
        name: '页面渲染速度',
        value: 2.1,
        unit: '秒',
        improvement: 45,
        color: 'green'
      },
      {
        name: '资源加载时间',
        value: 1.2,
        unit: '秒',
        improvement: 55,
        color: 'purple'
      },
      {
        name: '交互响应时间',
        value: 0.3,
        unit: '秒',
        improvement: 70,
        color: 'orange'
      }
    ];

    setMetrics(mockMetrics);
    
    // 模拟性能测试动画
    setTimeout(() => setIsVisible(true), 500);
  }, []);

  const getColorClass = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-600';
      case 'green': return 'text-green-600';
      case 'purple': return 'text-purple-600';
      case 'orange': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getBgColorClass = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100';
      case 'green': return 'bg-green-100';
      case 'purple': return 'bg-purple-100';
      case 'orange': return 'bg-orange-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-500 mb-3">
        ⚡ 预构建页面 - 极速加载
      </div>

      {/* 性能对比图表 */}
      <div className="space-y-3">
        {metrics.map((metric, index) => (
          <div key={metric.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">{metric.name}</span>
              <span className={`text-xs font-bold ${getColorClass(metric.color)}`}>
                {metric.value}{metric.unit}
              </span>
            </div>
            
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ease-out ${getBgColorClass(metric.color)}`}
                  style={{ 
                    width: isVisible ? `${100 - (metric.value / 3) * 100}%` : '0%'
                  }}
                ></div>
              </div>
              
              <div className="absolute -top-6 right-0 text-xs text-green-600 font-semibold">
                +{metric.improvement}%
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 性能优势说明 */}
      <div className="bg-green-50 p-3 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-green-600">⚡</span>
          <span className="text-sm font-semibold text-green-800">SSG性能优势</span>
        </div>
        <ul className="text-xs text-green-700 space-y-1">
          <li>• 页面预构建，加载速度提升60%</li>
          <li>• 减少服务器计算压力</li>
          <li>• 更好的SEO表现</li>
          <li>• 降低带宽成本</li>
        </ul>
      </div>

      {/* 缓存状态指示器 */}
      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
        <span className="text-xs text-gray-600">缓存状态:</span>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-600 font-medium">已缓存</span>
        </div>
      </div>

      {/* 构建时间信息 */}
      <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
        <div className="flex justify-between">
          <span>构建时间:</span>
          <span className="font-mono">2.3s</span>
        </div>
        <div className="flex justify-between">
          <span>部署时间:</span>
          <span className="font-mono">45s</span>
        </div>
      </div>
    </div>
  );
}
