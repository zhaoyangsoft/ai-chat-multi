'use client';

import { useState } from 'react';

interface Advantage {
  id: string;
  title: string;
  description: string;
  icon: string;
  benefits: string[];
  color: string;
}

const advantages: Advantage[] = [
  {
    id: 'automation',
    title: '智能工作流自动化',
    description: '基于AI的智能决策引擎，自动识别和优化业务流程',
    icon: '🤖',
    benefits: [
      '减少人工干预80%',
      '流程执行效率提升3倍',
      '错误率降低95%',
      '24/7不间断运行'
    ],
    color: 'blue'
  },
  {
    id: 'optimization',
    title: '实时性能优化',
    description: '动态监控和调整系统性能，确保最佳用户体验',
    icon: '⚡',
    benefits: [
      '响应时间减少60%',
      '吞吐量提升2.5倍',
      '资源利用率优化40%',
      '智能负载均衡'
    ],
    color: 'green'
  },
  {
    id: 'intelligence',
    title: '数据驱动决策',
    description: '深度分析业务数据，提供智能决策建议',
    icon: '📊',
    benefits: [
      '决策准确率提升85%',
      '预测分析准确度90%',
      '实时数据洞察',
      '智能风险评估'
    ],
    color: 'purple'
  },
  {
    id: 'integration',
    title: '无缝系统集成',
    description: '支持多种企业系统，实现数据互通和流程协同',
    icon: '🔗',
    benefits: [
      '支持100+企业系统',
      'API集成成功率99%',
      '零代码配置',
      '快速部署上线'
    ],
    color: 'orange'
  }
];

export default function AIWorkflowAdvantages() {
  const [activeAdvantage, setActiveAdvantage] = useState<string>('automation');

  const getActiveAdvantage = () => advantages.find(adv => adv.id === activeAdvantage) || advantages[0];

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          AI工作流优化的核心优势
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          通过先进的AI技术，为企业工作流带来革命性的改变
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        {advantages.map((advantage) => (
          <button
            key={advantage.id}
            onClick={() => setActiveAdvantage(advantage.id)}
            className={`p-4 rounded-lg text-left transition-all duration-300 ${
              activeAdvantage === advantage.id
                ? `bg-${advantage.color}-100 border-2 border-${advantage.color}-300`
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="text-3xl mb-2">{advantage.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-1">{advantage.title}</h3>
            <p className="text-sm text-gray-600">{advantage.description}</p>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-start space-x-6">
          <div className="text-6xl">{getActiveAdvantage().icon}</div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {getActiveAdvantage().title}
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              {getActiveAdvantage().description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getActiveAdvantage().benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">技术特点：</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">机器学习</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">深度学习</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">自然语言处理</span>
                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">计算机视觉</span>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">预测分析</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 统计数据 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
          <div className="text-gray-600">企业客户</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
          <div className="text-gray-600">客户满意度</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-purple-600 mb-2">3.5x</div>
          <div className="text-gray-600">效率提升</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
          <div className="text-gray-600">技术支持</div>
        </div>
      </div>
    </div>
  );
}
