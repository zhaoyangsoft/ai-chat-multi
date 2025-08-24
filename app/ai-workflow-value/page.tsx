'use client';

import { useState } from 'react';

interface ValueProposition {
  id: string;
  title: string;
  description: string;
  metrics: {
    label: string;
    value: string;
    unit: string;
    improvement: string;
  }[];
  icon: string;
  color: string;
}

const valuePropositions: ValueProposition[] = [
  {
    id: 'efficiency',
    title: '工作效率大幅提升',
    description: '通过AI自动化工作流程，显著减少人工干预，提升整体工作效率',
    metrics: [
      { label: '流程执行效率', value: '3.5', unit: '倍', improvement: '+250%' },
      { label: '人工干预减少', value: '80', unit: '%', improvement: '-80%' },
      { label: '错误率降低', value: '95', unit: '%', improvement: '-95%' },
      { label: '响应时间缩短', value: '60', unit: '%', improvement: '-60%' }
    ],
    icon: '🚀',
    color: 'blue'
  },
  {
    id: 'cost',
    title: '运营成本显著降低',
    description: '智能优化资源配置，减少人力成本，提高投资回报率',
    metrics: [
      { label: '人力成本节省', value: '40', unit: '%', improvement: '-40%' },
      { label: '服务器成本', value: '35', unit: '%', improvement: '-35%' },
      { label: '维护成本', value: '50', unit: '%', improvement: '-50%' },
      { label: '培训成本', value: '60', unit: '%', improvement: '-60%' }
    ],
    icon: '💰',
    color: 'green'
  },
  {
    id: 'quality',
    title: '服务质量全面提升',
    description: 'AI驱动的质量控制系统，确保服务的一致性和准确性',
    metrics: [
      { label: '服务质量评分', value: '98', unit: '分', improvement: '+15%' },
      { label: '客户满意度', value: '95', unit: '%', improvement: '+20%' },
      { label: '问题解决率', value: '99', unit: '%', improvement: '+25%' },
      { label: '服务可用性', value: '99.9', unit: '%', improvement: '+0.5%' }
    ],
    icon: '⭐',
    color: 'purple'
  },
  {
    id: 'innovation',
    title: '创新能力持续增强',
    description: '数据驱动的决策支持，帮助企业快速响应市场变化，保持竞争优势',
    metrics: [
      { label: '决策速度提升', value: '5', unit: '倍', improvement: '+400%' },
      { label: '市场响应时间', value: '70', unit: '%', improvement: '-70%' },
      { label: '创新项目成功率', value: '85', unit: '%', improvement: '+30%' },
      { label: '数据洞察准确度', value: '90', unit: '%', improvement: '+25%' }
    ],
    icon: '💡',
    color: 'orange'
  }
];

export default function AIWorkflowValuePage() {
  const [activeValue, setActiveValue] = useState<string>('efficiency');

  const getActiveValue = () => valuePropositions.find(v => v.id === activeValue) || valuePropositions[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* 简化的Header，不需要事件处理函数 */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🤖</span>
              <h1 className="text-xl font-bold text-gray-900">
                AI工作流价值
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <a 
              href="/ssr-ssg-isr-demo"
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <span className="text-sm font-medium">返回主页</span>
            </a>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI企业工作流优化的商业价值
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            通过先进的AI技术和Next.js 14的现代化渲染能力，为企业数字化转型提供强有力的技术支撑，
            实现效率提升、成本降低、质量改善和创新加速的全面价值
          </p>
        </div>

        {/* 价值主张选择器 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {valuePropositions.map((value) => (
            <button
              key={value.id}
              onClick={() => setActiveValue(value.id)}
              className={`p-6 rounded-xl text-left transition-all duration-300 ${
                activeValue === value.id
                  ? `bg-${value.color}-100 border-2 border-${value.color}-300 shadow-lg`
                  : 'bg-white hover:bg-gray-50 shadow-md'
              }`}
            >
              <div className="text-4xl mb-3">{value.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-sm text-gray-600">{value.description}</p>
            </button>
          ))}
        </div>

        {/* 详细价值展示 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <div className="flex items-start space-x-6">
            <div className="text-6xl">{getActiveValue().icon}</div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {getActiveValue().title}
              </h3>
              <p className="text-gray-600 text-lg mb-8">
                {getActiveValue().description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getActiveValue().metrics.map((metric, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">{metric.label}</div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold text-blue-600">
                        {metric.value}
                      </span>
                      <span className="text-lg text-gray-500">{metric.unit}</span>
                      <span className="text-sm font-semibold text-green-600">
                        {metric.improvement}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 技术架构优势 */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 mb-16 text-white">
          <h2 className="text-3xl font-bold mb-8 text-center">
            基于Next.js 14的技术架构优势
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3">SSR - 实时数据渲染</h3>
              <p className="text-blue-100">
                确保企业数据始终最新，支持实时监控和决策，提升业务响应速度
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-3">SSG - 极速性能</h3>
              <p className="text-blue-100">
                预构建页面实现毫秒级加载，提升用户体验，降低服务器成本
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-semibold mb-3">ISR - 智能更新</h3>
              <p className="text-blue-100">
                平衡性能与实时性，按需更新内容，保持系统高效运行
              </p>
            </div>
          </div>
        </div>

        {/* 行业应用案例 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            行业应用案例与成功故事
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-xl font-semibold mb-3">制造业流程优化</h3>
              <p className="text-gray-600 mb-3">
                某大型制造企业通过AI工作流优化，生产效率提升40%，质量控制准确率达到99.5%
              </p>
              <div className="text-sm text-blue-600 font-semibold">
                投资回报率: 300% | 实施周期: 6个月
              </div>
            </div>
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-xl font-semibold mb-3">金融服务智能化</h3>
              <p className="text-gray-600 mb-3">
                银行通过AI工作流优化，客户服务响应时间缩短70%，风险识别准确率提升85%
              </p>
              <div className="text-sm text-green-600 font-semibold">
                投资回报率: 250% | 实施周期: 8个月
              </div>
            </div>
            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-xl font-semibold mb-3">零售业数字化转型</h3>
              <p className="text-gray-600 mb-3">
                零售连锁企业实现库存管理自动化，缺货率降低60%，客户满意度提升25%
              </p>
              <div className="text-sm text-purple-600 font-semibold">
                投资回报率: 200% | 实施周期: 4个月
              </div>
            </div>
            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-xl font-semibold mb-3">医疗健康流程优化</h3>
              <p className="text-gray-600 mb-3">
                医院通过AI工作流优化，患者等待时间减少50%，诊断准确率提升90%
              </p>
              <div className="text-sm text-orange-600 font-semibold">
                投资回报率: 400% | 实施周期: 12个月
              </div>
            </div>
          </div>
        </div>

        {/* ROI计算器 */}
        <div className="bg-gray-50 rounded-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            AI工作流优化投资回报率计算
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">成本投入</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>技术实施费用</span>
                  <span className="font-semibold">¥500,000</span>
                </div>
                <div className="flex justify-between">
                  <span>人员培训费用</span>
                  <span className="font-semibold">¥100,000</span>
                </div>
                <div className="flex justify-between">
                  <span>系统集成费用</span>
                  <span className="font-semibold">¥200,000</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>总投入</span>
                    <span className="text-red-600">¥800,000</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">预期收益</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>效率提升收益</span>
                  <span className="font-semibold">¥1,200,000</span>
                </div>
                <div className="flex justify-between">
                  <span>成本节省收益</span>
                  <span className="font-semibold">¥800,000</span>
                </div>
                <div className="flex justify-between">
                  <span>质量改善收益</span>
                  <span className="font-semibold">¥600,000</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>总收益</span>
                    <span className="text-green-600">¥2,600,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-8 p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              预期投资回报率: 225%
            </div>
            <div className="text-gray-600">
              投资回收期: 约8个月 | 年化收益率: 337%
            </div>
          </div>
        </div>

        {/* CTA区域 */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            立即开始您的AI工作流优化之旅
          </h2>
          <p className="text-xl mb-8 opacity-90">
            联系我们，获取专业的AI工作流优化解决方案，实现企业数字化转型的突破性进展
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              免费咨询
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors">
              查看演示
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
