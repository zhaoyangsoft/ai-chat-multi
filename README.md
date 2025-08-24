# AI聊天助手

一个基于DeepSeek API的智能聊天应用，支持流式处理和实时模型可视化。

## 功能特性

- 🤖 **智能对话**: 基于多种AI模型，提供高质量的AI对话体验
- ⚡ **流式处理**: 实时流式响应，提供更自然的对话体验
- 📊 **模型可视化**: 实时显示模型状态、响应时间、令牌速度等性能指标
- 🎨 **现代化UI**: 基于Tailwind CSS的响应式设计，支持深色模式
- 📱 **响应式设计**: 适配桌面和移动设备
- 🔧 **易于配置**: 简单的环境变量配置
- 🎤 **语音交互**: 支持语音录制、转文本和发送给AI
- 🖼️ **多模态交互**: 支持图片、音频、文件等多种媒体类型
- 💻 **AI编程**: 支持UI图片转代码、代码生成等编程功能
- 🌐 **多模型支持**: 支持OpenAI、Claude、Gemini、通义千问、文心一言等多种AI模型

## 技术栈

- **前端**: Next.js 14, React 18, TypeScript
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **API**: DeepSeek Chat API
- **部署**: Vercel (推荐)

## 快速开始

### 1. 克隆项目

```bash
git clone <repository-url>
cd ai-chat-multi
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 配置环境变量

复制环境变量示例文件：

```bash
cp env.example .env.local
```

编辑 `.env.local` 文件，添加你的DeepSeek API密钥：

```env
DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

### 4. 启动开发服务器

```bash
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 获取API密钥

### DeepSeek API密钥
1. 访问 [DeepSeek官网](https://platform.deepseek.com/)
2. 注册并登录账户
3. 进入API管理页面
4. 创建新的API密钥

### OpenAI API密钥
1. 访问 [OpenAI官网](https://platform.openai.com/)
2. 注册并登录账户
3. 进入API Keys页面
4. 创建新的API密钥

### Anthropic Claude API密钥
1. 访问 [Anthropic官网](https://console.anthropic.com/)
2. 注册并登录账户
3. 进入API Keys页面
4. 创建新的API密钥

### Google Gemini API密钥
1. 访问 [Google AI Studio](https://makersuite.google.com/app/apikey)
2. 使用Google账户登录
3. 创建新的API密钥

### 通义千问API密钥
1. 访问 [阿里云通义千问](https://dashscope.console.aliyun.com/)
2. 注册并登录账户
3. 进入API-KEY管理页面
4. 创建新的API密钥

### 文心一言API密钥
1. 访问 [百度智能云](https://cloud.baidu.com/product/wenxinworkshop)
2. 注册并登录账户
3. 进入应用列表页面
4. 创建应用并获取API密钥

### 环境变量配置
将获取的API密钥添加到 `.env.local` 文件中：

```env
# DeepSeek API密钥
DEEPSEEK_API_KEY=your_deepseek_api_key_here

# OpenAI API密钥（用于GPT-4 Vision和语音转文本）
OPENAI_API_KEY=your_openai_api_key_here

# Anthropic Claude API密钥
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Google Gemini API密钥
GOOGLE_API_KEY=your_google_api_key_here

# 通义千问API密钥
DASHSCOPE_API_KEY=your_dashscope_api_key_here

# 文心一言API密钥
BAIDU_API_KEY=your_baidu_api_key_here
BAIDU_ACCESS_TOKEN=your_baidu_access_token_here
```

## 项目结构

```
ai-chat-multi/
├── app/                    # Next.js App Router
│   ├── api/               # API路由
│   │   └── chat/         # 聊天API
│   ├── globals.css       # 全局样式
│   ├── layout.tsx        # 根布局
│   └── page.tsx          # 主页面
├── components/           # React组件
│   ├── ChatInterface.tsx # 聊天界面
│   ├── Header.tsx        # 页面头部
│   └── ModelVisualization.tsx # 模型可视化
├── types/               # TypeScript类型定义
│   └── index.ts
├── public/              # 静态资源
├── package.json         # 项目配置
├── tailwind.config.js   # Tailwind配置
├── tsconfig.json        # TypeScript配置
└── README.md           # 项目说明
```

## 主要功能

### 智能对话
- 支持多种AI模型（DeepSeek、OpenAI、Claude、Gemini等）
- 实时流式响应
- 打字机效果显示
- 流畅的用户体验

### 流式渲染技术
- **Server-Sent Events (SSE)**: 基于HTTP长连接的实时数据推送
- **ReadableStream**: 使用Web Streams API处理流式数据
- **TextDecoder**: 实时解码和显示流式文本内容
- **打字机效果**: 逐字符显示，模拟真实打字体验
- **性能优化**: 内存高效，支持大文本流式处理
- **详细文档**: 查看 [流式渲染技术详解](docs/streaming-rendering.md)

### 多模态交互
- **语音交互**: 语音录制、转文本、发送给AI
- **图片处理**: 图片上传、分析、UI转代码
- **文件支持**: 支持PDF、TXT、JSON等多种文件格式
- **媒体预览**: 图片预览、音频播放、文件下载

### AI编程功能
- **UI转代码**: 上传UI设计图片，自动生成前端代码
- **代码生成**: 支持React、Vue、Angular、Svelte等框架
- **多语言支持**: TypeScript、JavaScript
- **代码优化**: 生成的代码可直接运行

### 模型可视化
- 实时连接状态
- 响应时间监控
- 令牌速度统计
- 聊天统计信息
- 模型能力展示

### 用户界面
- 现代化设计
- 深色模式支持
- 响应式布局
- 键盘快捷键支持
- 多页面测试功能

## 部署

### Vercel部署 (推荐)

1. 将代码推送到GitHub
2. 在Vercel中导入项目
3. 配置环境变量
4. 部署完成

### 其他平台

项目支持部署到任何支持Next.js的平台：
- Netlify
- Railway
- DigitalOcean App Platform
- 自托管服务器

## 开发

### 代码规范

项目使用ESLint进行代码检查：

```bash
pnpm lint
```

### 构建

```bash
pnpm build
```

### 生产环境启动

```bash
pnpm start
```

## 贡献

欢迎提交Issue和Pull Request！

## 许可证

MIT License

## 测试页面

项目包含多个测试页面，用于验证不同功能：

- **主页面**: `http://localhost:3000` - 完整的聊天界面
- **语音转文本测试**: `http://localhost:3000/voice-to-text-test` - 测试语音录制和转文本功能
- **UI转代码测试**: `http://localhost:3000/ui-to-code-test` - 测试UI图片转代码功能
- **多模态测试**: `http://localhost:3000/multimodal-test` - 测试多模态交互功能
- **语音测试**: `http://localhost:3000/voice-test` - 测试语音交互功能

## 流式渲染技术详解

### 技术原理

流式渲染是一种实时显示AI响应内容的技术，通过逐步接收和显示数据，提供更自然的对话体验。

#### 1. 服务端流式处理

```typescript
// app/api/chat/route.ts
export async function POST(request: NextRequest) {
  // 创建可读流来处理流式响应
  const stream = new ReadableStream({
    async start(controller) {
      const reader = response.body?.getReader()
      
      try {
        while (true) {
          const { done, value } = await reader.read()
          
          if (done) {
            controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'))
            controller.close()
            break
          }
          
          // 将响应数据转发给客户端
          controller.enqueue(value)
        }
      } catch (error) {
        controller.error(error)
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
```

#### 2. 客户端流式接收

```typescript
// 处理流式响应
const handleStreamResponse = async (response: Response) => {
  const reader = response.body?.getReader()
  const decoder = new TextDecoder()
  
  while (true) {
    const { done, value } = await reader.read()
    
    if (done) break
    
    const chunk = decoder.decode(value)
    const lines = chunk.split('\n')
    
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6)
        
        if (data === '[DONE]') break
        
        try {
          const parsed = JSON.parse(data)
          if (parsed.choices?.[0]?.delta?.content) {
            // 实时更新UI显示
            updateMessageContent(parsed.choices[0].delta.content)
          }
        } catch (e) {
          console.error('解析响应数据失败:', e)
        }
      }
    }
  }
}
```

#### 3. 打字机效果实现

```typescript
// 打字机效果组件
const TypewriterEffect = ({ content }: { content: string }) => {
  const [displayedContent, setDisplayedContent] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    if (currentIndex < content.length) {
      const timer = setTimeout(() => {
        setDisplayedContent(prev => prev + content[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 50) // 50ms延迟，模拟打字速度
      
      return () => clearTimeout(timer)
    }
  }, [currentIndex, content])
  
  return <div className="whitespace-pre-wrap">{displayedContent}</div>
}
```

### 技术特点

#### 1. 实时性
- **低延迟**: 数据到达即显示，无需等待完整响应
- **即时反馈**: 用户可以看到AI正在"思考"和"回答"
- **流畅体验**: 避免长时间等待，提升用户满意度

#### 2. 性能优化
- **内存高效**: 流式处理避免大量数据堆积
- **网络优化**: 减少网络延迟，提高响应速度
- **资源管理**: 自动释放连接资源，避免内存泄漏

#### 3. 用户体验
- **视觉反馈**: 打字机效果提供直观的进度指示
- **交互性**: 用户可以随时中断或继续对话
- **可访问性**: 支持屏幕阅读器等辅助技术

### 实现细节

#### 1. 数据格式

```typescript
// 流式数据格式
interface StreamData {
  choices: Array<{
    delta: {
      content?: string
    }
    finish_reason?: string
  }>
  usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}
```

#### 2. 错误处理

```typescript
// 流式错误处理
const handleStreamError = (error: Error) => {
  console.error('流处理错误:', error)
  
  // 显示错误消息
  setMessages(prev => [...prev, {
    id: Date.now().toString(),
    content: '抱歉，处理您的请求时出现错误。请稍后重试。',
    role: 'assistant',
    timestamp: new Date().toISOString(),
    isError: true
  }])
  
  // 重置加载状态
  setIsLoading(false)
}
```

#### 3. 状态管理

```typescript
// 流式状态管理
const [streamState, setStreamState] = useState({
  isStreaming: false,
  currentMessage: '',
  tokenCount: 0,
  startTime: 0
})

// 开始流式处理
const startStreaming = () => {
  setStreamState({
    isStreaming: true,
    currentMessage: '',
    tokenCount: 0,
    startTime: Date.now()
  })
}

// 更新流式内容
const updateStreamContent = (content: string) => {
  setStreamState(prev => ({
    ...prev,
    currentMessage: prev.currentMessage + content,
    tokenCount: prev.tokenCount + 1
  }))
}
```

### 最佳实践

#### 1. 性能优化
- 使用防抖处理频繁的UI更新
- 实现虚拟滚动处理长对话
- 合理设置缓冲区大小

#### 2. 用户体验
- 提供加载指示器
- 支持中断和重试功能
- 实现自动滚动到最新消息

#### 3. 错误处理
- 网络错误重试机制
- 优雅的错误提示
- 状态恢复功能

### 兼容性

- **现代浏览器**: 支持所有现代浏览器的Streams API
- **移动设备**: 在移动设备上提供良好的流式体验
- **降级处理**: 在不支持的浏览器中提供非流式备选方案

## 支持

如果你遇到问题或有建议，请：

1. 查看 [Issues](../../issues)
2. 创建新的Issue
3. 联系开发者

---

**注意**: 请确保你有有效的API密钥，并且账户有足够的配额。不同模型的功能和限制可能不同，请参考各平台的官方文档。
