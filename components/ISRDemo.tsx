'use client';

import { useState, useEffect } from 'react';

interface CacheData {
  id: string;
  name: string;
  lastUpdated: string;
  cacheAge: string;
  status: 'fresh' | 'stale' | 'updating';
  data: string;
}

export default function ISRDemo() {
  const [cacheData, setCacheData] = useState<CacheData[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const mockData: CacheData[] = [
      {
        id: '1',
        name: 'AI工作流配置',
        lastUpdated: '2分钟前',
        cacheAge: '2分钟',
        status: 'fresh',
        data: '配置数据已缓存'
      },
      {
        id: '2',
        name: '用户权限数据',
        lastUpdated: '15分钟前',
        cacheAge: '15分钟',
        status: 'stale',
        data: '需要更新'
      },
      {
        id: '3',
        name: '系统状态信息',
        lastUpdated: '1小时前',
        cacheAge: '1小时',
        status: 'stale',
        data: '数据过期'
      }
    ];

    setCacheData(mockData);

    // 模拟自动更新
    const interval = setInterval(() => {
      setCacheData(prev => prev.map(item => {
        if (item.status === 'stale' && Math.random() > 0.8) {
          return {
            ...item,
            status: 'updating' as const,
            lastUpdated: '刚刚',
            cacheAge: '0分钟'
          };
        }
        if (item.status === 'updating') {
          return {
            ...item,
            status: 'fresh' as const,
            data: '数据已更新'
          };
        }
        return item;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'fresh': return 'text-green-600';
      case 'stale': return 'text-orange-600';
      case 'updating': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'fresh': return '✅';
      case 'stale': return '⚠️';
      case 'updating': return '🔄';
      default: return '⏳';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'fresh': return 'bg-green-50';
      case 'stale': return 'bg-orange-50';
      case 'updating': return 'bg-blue-50';
      default: return 'bg-gray-50';
    }
  };

  const handleManualUpdate = (id: string) => {
    setIsUpdating(true);
    setCacheData(prev => prev.map(item => 
      item.id === id 
        ? { ...item, status: 'updating' as const }
        : item
    ));

    setTimeout(() => {
      setCacheData(prev => prev.map(item => 
        item.id === id 
          ? { 
              ...item, 
              status: 'fresh' as const, 
              lastUpdated: '刚刚',
              cacheAge: '0分钟',
              data: '手动更新完成'
            }
          : item
      ));
      setIsUpdating(false);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-500 mb-3">
        🔄 智能缓存更新 - 平衡性能与实时性
      </div>

      {/* 缓存状态展示 */}
      <div className="space-y-3">
        {cacheData.map((item) => (
          <div key={item.id} className={`border rounded-lg p-3 ${getStatusBg(item.status)}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getStatusIcon(item.status)}</span>
                <span className="font-medium text-sm">{item.name}</span>
              </div>
              <span className={`text-xs font-semibold ${getStatusColor(item.status)}`}>
                {item.status === 'fresh' ? '新鲜' : 
                 item.status === 'stale' ? '过期' : '更新中'}
              </span>
            </div>
            
            <div className="text-xs text-gray-600 mb-2">
              <div className="flex justify-between">
                <span>最后更新: {item.lastUpdated}</span>
                <span>缓存年龄: {item.cacheAge}</span>
              </div>
            </div>
            
            <div className="text-xs text-gray-700 mb-2">
              {item.data}
            </div>

            {item.status === 'stale' && (
              <button
                onClick={() => handleManualUpdate(item.id)}
                disabled={isUpdating}
                className="w-full text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {isUpdating ? '更新中...' : '手动更新'}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* ISR优势说明 */}
      <div className="bg-purple-50 p-3 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-purple-600">🔄</span>
          <span className="text-sm font-semibold text-purple-800">ISR核心优势</span>
        </div>
        <ul className="text-xs text-purple-700 space-y-1">
          <li>• 智能缓存策略，平衡性能与实时性</li>
          <li>• 按需更新，减少不必要的重新构建</li>
          <li>• 支持手动触发更新</li>
          <li>• 保持SSG的性能优势</li>
        </ul>
      </div>

      {/* 缓存策略说明 */}
      <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
        <div className="font-semibold mb-1">缓存策略:</div>
        <div className="space-y-1">
          <div>• 新鲜数据: 直接返回缓存</div>
          <div>• 过期数据: 后台更新，下次访问返回新数据</div>
          <div>• 更新频率: 可配置，默认1小时</div>
        </div>
      </div>
    </div>
  );
}
