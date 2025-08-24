// 导入类型定义
import { AIModel, MultimodalConfig } from '../types'

// 多模态模型配置管理器
export class MultimodalModelManager {
  private static instance: MultimodalModelManager
  private configs: Map<AIModel, MultimodalConfig> = new Map()

  private constructor() {
    this.initializeConfigs()
  }

  // 单例模式获取实例
  public static getInstance(): MultimodalModelManager {
    if (!MultimodalModelManager.instance) {
      MultimodalModelManager.instance = new MultimodalModelManager()
    }
    return MultimodalModelManager.instance
  }

  // 初始化模型配置
  private initializeConfigs() {
    // OpenAI GPT-4 Vision 配置
    this.configs.set('gpt-4-vision-preview', {
      model: 'gpt-4-vision-preview',
      apiKey: process.env.OPENAI_API_KEY || '',
      endpoint: 'https://api.openai.com/v1/chat/completions',
      capabilities: {
        vision: true,
        audio: false,
        code: true,
        ui: true
      },
      maxImageSize: 20 * 1024 * 1024, // 20MB
      supportedFormats: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    })

    // OpenAI GPT-4 Turbo 配置
    this.configs.set('gpt-4-turbo', {
      model: 'gpt-4-turbo',
      apiKey: process.env.OPENAI_API_KEY || '',
      endpoint: 'https://api.openai.com/v1/chat/completions',
      capabilities: {
        vision: false,
        audio: false,
        code: true,
        ui: false
      },
      maxImageSize: 0,
      supportedFormats: []
    })

    // Anthropic Claude 3 Opus 配置
    this.configs.set('claude-3-opus', {
      model: 'claude-3-opus',
      apiKey: process.env.ANTHROPIC_API_KEY || '',
      endpoint: 'https://api.anthropic.com/v1/messages',
      capabilities: {
        vision: true,
        audio: false,
        code: true,
        ui: true
      },
      maxImageSize: 20 * 1024 * 1024, // 20MB
      supportedFormats: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    })

    // Anthropic Claude 3 Sonnet 配置
    this.configs.set('claude-3-sonnet', {
      model: 'claude-3-sonnet',
      apiKey: process.env.ANTHROPIC_API_KEY || '',
      endpoint: 'https://api.anthropic.com/v1/messages',
      capabilities: {
        vision: true,
        audio: false,
        code: true,
        ui: true
      },
      maxImageSize: 20 * 1024 * 1024, // 20MB
      supportedFormats: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    })

    // Google Gemini Pro Vision 配置
    this.configs.set('gemini-pro-vision', {
      model: 'gemini-pro-vision',
      apiKey: process.env.GOOGLE_API_KEY || '',
      endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent',
      capabilities: {
        vision: true,
        audio: false,
        code: true,
        ui: true
      },
      maxImageSize: 4 * 1024 * 1024, // 4MB
      supportedFormats: ['image/jpeg', 'image/png', 'image/webp', 'image/heic']
    })

    // 通义千问视觉模型配置
    this.configs.set('qwen-vl', {
      model: 'qwen-vl',
      apiKey: process.env.DASHSCOPE_API_KEY || '',
      endpoint: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation',
      capabilities: {
        vision: true,
        audio: false,
        code: true,
        ui: true
      },
      maxImageSize: 10 * 1024 * 1024, // 10MB
      supportedFormats: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    })

    // 文心一言配置
    this.configs.set('ernie-bot', {
      model: 'ernie-bot',
      apiKey: process.env.BAIDU_API_KEY || '',
      endpoint: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions',
      capabilities: {
        vision: true,
        audio: false,
        code: true,
        ui: true
      },
      maxImageSize: 10 * 1024 * 1024, // 10MB
      supportedFormats: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    })

    // DeepSeek Chat 配置
    this.configs.set('deepseek-chat', {
      model: 'deepseek-chat',
      apiKey: process.env.DEEPSEEK_API_KEY || '',
      endpoint: 'https://api.deepseek.com/v1/chat/completions',
      capabilities: {
        vision: false,
        audio: false,
        code: true,
        ui: false
      },
      maxImageSize: 0,
      supportedFormats: []
    })
  }

  // 获取模型配置
  public getConfig(model: AIModel): MultimodalConfig | undefined {
    return this.configs.get(model)
  }

  // 获取所有可用模型
  public getAvailableModels(): AIModel[] {
    return Array.from(this.configs.keys())
  }

  // 获取支持特定能力的模型
  public getModelsByCapability(capability: keyof MultimodalConfig['capabilities']): AIModel[] {
    return Array.from(this.configs.entries())
      .filter(([_, config]) => config.capabilities[capability])
      .map(([model, _]) => model)
  }

  // 检查模型是否支持特定能力
  public hasCapability(model: AIModel, capability: keyof MultimodalConfig['capabilities']): boolean {
    const config = this.configs.get(model)
    return config?.capabilities[capability] || false
  }

  // 获取支持UI分析的模型
  public getUIAnalysisModels(): AIModel[] {
    return this.getModelsByCapability('ui')
  }

  // 获取支持代码生成的模型
  public getCodeGenerationModels(): AIModel[] {
    return this.getModelsByCapability('code')
  }

  // 获取支持视觉理解的模型
  public getVisionModels(): AIModel[] {
    return this.getModelsByCapability('vision')
  }

  // 验证文件格式是否支持
  public isFormatSupported(model: AIModel, mimeType: string): boolean {
    const config = this.configs.get(model)
    return config?.supportedFormats.includes(mimeType) || false
  }

  // 验证文件大小是否在限制内
  public isSizeValid(model: AIModel, size: number): boolean {
    const config = this.configs.get(model)
    return config ? size <= config.maxImageSize : false
  }
}

// 导出单例实例
export const modelManager = MultimodalModelManager.getInstance()
