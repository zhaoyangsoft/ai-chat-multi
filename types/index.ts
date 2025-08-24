// 多模态内容类型
export interface MediaContent {
  type: 'image' | 'audio' | 'file' | 'text' | 'video'  // 内容类型
  url?: string                               // 文件URL
  base64?: string                            // Base64编码
  filename?: string                          // 文件名
  size?: number                              // 文件大小
  mimeType?: string                          // MIME类型
  description?: string                       // 内容描述（用于AI理解）
}

// AI模型类型
export type AIModel = 
  | 'deepseek-chat'           // DeepSeek聊天模型
  | 'gpt-4-vision-preview'    // OpenAI GPT-4 Vision
  | 'gpt-4-turbo'            // OpenAI GPT-4 Turbo
  | 'claude-3-opus'          // Anthropic Claude 3 Opus
  | 'claude-3-sonnet'        // Anthropic Claude 3 Sonnet
  | 'gemini-pro-vision'      // Google Gemini Pro Vision
  | 'qwen-vl'                // 通义千问视觉模型
  | 'ernie-bot'              // 文心一言
  | 'code-llama'             // Code Llama
  | 'wizard-coder'           // WizardCoder
  | 'starcoder'              // StarCoder

// 消息接口定义
export interface Message {
  id: string                    // 消息唯一标识符
  content: string              // 消息内容
  role: 'user' | 'assistant' | 'system' // 消息角色：用户/助手/系统
  timestamp: string            // 消息时间戳
  isError?: boolean            // 是否为错误消息（可选）
  media?: MediaContent[]       // 多模态内容（可选）
  model?: AIModel              // 使用的AI模型（可选）
  codeGenerated?: boolean      // 是否生成了代码（可选）
}

// 模型状态接口定义
export interface ModelStatus {
  isConnected: boolean         // 是否已连接到API
  responseTime: number         // 响应时间（秒）
  tokensPerSecond: number      // 令牌生成速度（个/秒）
  modelName: string           // 模型名称
  temperature: number         // 温度参数（0-1）
  maxTokens: number          // 最大生成令牌数
  modelType: AIModel         // 模型类型
  capabilities: string[]      // 模型能力列表
}

// 聊天请求接口定义
export interface ChatRequest {
  messages: Message[]          // 消息历史数组
  stream?: boolean            // 是否使用流式响应（可选）
  temperature?: number        // 温度参数（可选）
  maxTokens?: number         // 最大令牌数（可选）
  audioData?: MediaContent    // 音频数据（可选）
  model?: AIModel            // 指定使用的模型（可选）
  codeGeneration?: boolean   // 是否启用代码生成模式（可选）
  uiAnalysis?: boolean       // 是否启用UI分析模式（可选）
}

// 聊天响应接口定义
export interface ChatResponse {
  choices: Array<{            // 选择数组
    delta: {                  // 增量内容
      content?: string        // 内容（可选）
    }
    finish_reason?: string    // 完成原因（可选）
  }>
  usage?: {                   // 使用统计（可选）
    prompt_tokens: number     // 提示令牌数
    completion_tokens: number // 完成令牌数
    total_tokens: number      // 总令牌数
  }
  codeBlocks?: string[]       // 生成的代码块（可选）
  uiAnalysis?: {              // UI分析结果（可选）
    components: string[]      // 识别出的组件
    layout: string           // 布局结构
    styles: object           // 样式信息
  }
}

// AI编程任务类型
export interface ProgrammingTask {
  type: 'code-generation' | 'code-review' | 'bug-fix' | 'ui-to-code' | 'documentation'
  language: string           // 编程语言
  framework?: string         // 框架（可选）
  requirements: string       // 需求描述
  context?: string          // 上下文信息
  files?: MediaContent[]    // 相关文件
}

// 多模态模型配置
export interface MultimodalConfig {
  model: AIModel
  apiKey: string
  endpoint: string
  capabilities: {
    vision: boolean          // 视觉理解
    audio: boolean          // 音频处理
    code: boolean           // 代码生成
    ui: boolean             // UI分析
  }
  maxImageSize: number      // 最大图片大小
  supportedFormats: string[] // 支持的文件格式
}
