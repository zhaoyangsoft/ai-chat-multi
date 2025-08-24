// 导入Next.js的请求和响应类型
import { NextRequest, NextResponse } from 'next/server'
// 导入模型管理器
import { modelManager } from '../../../lib/multimodal-config'
// 导入类型定义
import { AIModel, ProgrammingTask } from '../../../types'

// 处理POST请求的UI转代码API端点
export async function POST(request: NextRequest) {
  try {
    // 解析请求体
    const body = await request.json()
    const { 
      imageData, 
      mimeType, 
      model = 'gpt-4-vision-preview',
      framework = 'react',
      language = 'typescript',
      requirements = ''
    } = body

    // 检查是否有图片数据
    if (!imageData) {
      return NextResponse.json(
        { error: '缺少图片数据' },
        { status: 400 }
      )
    }

    // 验证模型是否支持UI分析
    if (!modelManager.hasCapability(model as AIModel, 'ui')) {
      return NextResponse.json(
        { error: `模型 ${model} 不支持UI分析` },
        { status: 400 }
      )
    }

    // 获取模型配置
    const config = modelManager.getConfig(model as AIModel)
    if (!config) {
      return NextResponse.json(
        { error: `模型 ${model} 配置不存在` },
        { status: 400 }
      )
    }

    // 验证文件格式和大小
    if (!modelManager.isFormatSupported(model as AIModel, mimeType)) {
      return NextResponse.json(
        { error: `模型 ${model} 不支持文件格式 ${mimeType}` },
        { status: 400 }
      )
    }

    const imageSize = Buffer.from(imageData, 'base64').length
    if (!modelManager.isSizeValid(model as AIModel, imageSize)) {
      return NextResponse.json(
        { error: `图片大小 ${imageSize} 超过模型限制 ${config.maxImageSize}` },
        { status: 400 }
      )
    }

    // 根据模型类型调用相应的API
    let result
    switch (model) {
      case 'gpt-4-vision-preview':
        result = await callOpenAIVisionAPI(imageData, mimeType, framework, language, requirements)
        break
      case 'claude-3-opus':
      case 'claude-3-sonnet':
        result = await callClaudeAPI(imageData, mimeType, framework, language, requirements)
        break
      case 'gemini-pro-vision':
        result = await callGeminiAPI(imageData, mimeType, framework, language, requirements)
        break
      case 'qwen-vl':
        result = await callQwenAPI(imageData, mimeType, framework, language, requirements)
        break
      case 'ernie-bot':
        result = await callErnieAPI(imageData, mimeType, framework, language, requirements)
        break
      default:
        return NextResponse.json(
          { error: `不支持的模型: ${model}` },
          { status: 400 }
        )
    }

    return NextResponse.json(result)

  } catch (error) {
    console.error('UI转代码处理错误:', error)
    return NextResponse.json(
      { error: 'UI转代码处理失败' },
      { status: 500 }
    )
  }
}

// 调用OpenAI Vision API
async function callOpenAIVisionAPI(
  imageData: string, 
  mimeType: string, 
  framework: string, 
  language: string, 
  requirements: string
) {
  const prompt = generateUIPrompt(framework, language, requirements)
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:${mimeType};base64,${imageData}`
              }
            }
          ]
        }
      ],
      max_tokens: 4000,
      temperature: 0.1
    }),
  })

  if (!response.ok) {
    throw new Error(`OpenAI API错误: ${response.status}`)
  }

  const data = await response.json()
  return {
    success: true,
    code: data.choices[0].message.content,
    model: 'gpt-4-vision-preview',
    framework,
    language
  }
}

// 调用Claude API
async function callClaudeAPI(
  imageData: string, 
  mimeType: string, 
  framework: string, 
  language: string, 
  requirements: string
) {
  const prompt = generateUIPrompt(framework, language, requirements)
  
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY || '',
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-opus-20240229',
      max_tokens: 4000,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt
            },
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mimeType,
                data: imageData
              }
            }
          ]
        }
      ]
    }),
  })

  if (!response.ok) {
    throw new Error(`Claude API错误: ${response.status}`)
  }

  const data = await response.json()
  return {
    success: true,
    code: data.content[0].text,
    model: 'claude-3-opus',
    framework,
    language
  }
}

// 调用Gemini API
async function callGeminiAPI(
  imageData: string, 
  mimeType: string, 
  framework: string, 
  language: string, 
  requirements: string
) {
  const prompt = generateUIPrompt(framework, language, requirements)
  
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${process.env.GOOGLE_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt
            },
            {
              inline_data: {
                mime_type: mimeType,
                data: imageData
              }
            }
          ]
        }
      ],
      generationConfig: {
        maxOutputTokens: 4000,
        temperature: 0.1
      }
    }),
  })

  if (!response.ok) {
    throw new Error(`Gemini API错误: ${response.status}`)
  }

  const data = await response.json()
  return {
    success: true,
    code: data.candidates[0].content.parts[0].text,
    model: 'gemini-pro-vision',
    framework,
    language
  }
}

// 调用通义千问API
async function callQwenAPI(
  imageData: string, 
  mimeType: string, 
  framework: string, 
  language: string, 
  requirements: string
) {
  const prompt = generateUIPrompt(framework, language, requirements)
  
  const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.DASHSCOPE_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'qwen-vl-plus',
      input: {
        messages: [
          {
            role: 'user',
            content: [
              {
                text: prompt
              },
              {
                image: imageData
              }
            ]
          }
        ]
      },
      parameters: {
        max_tokens: 4000,
        temperature: 0.1
      }
    }),
  })

  if (!response.ok) {
    throw new Error(`通义千问API错误: ${response.status}`)
  }

  const data = await response.json()
  return {
    success: true,
    code: data.output.choices[0].message.content[0].text,
    model: 'qwen-vl',
    framework,
    language
  }
}

// 调用文心一言API
async function callErnieAPI(
  imageData: string, 
  mimeType: string, 
  framework: string, 
  language: string, 
  requirements: string
) {
  const prompt = generateUIPrompt(framework, language, requirements)
  
  const response = await fetch('https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.BAIDU_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:${mimeType};base64,${imageData}`
              }
            }
          ]
        }
      ],
      max_output_tokens: 4000,
      temperature: 0.1
    }),
  })

  if (!response.ok) {
    throw new Error(`文心一言API错误: ${response.status}`)
  }

  const data = await response.json()
  return {
    success: true,
    code: data.result,
    model: 'ernie-bot',
    framework,
    language
  }
}

// 生成UI转代码的提示词
function generateUIPrompt(framework: string, language: string, requirements: string): string {
  const basePrompt = `请分析这张UI设计图片，并生成对应的${framework}代码。

要求：
- 使用${language}语言
- 遵循现代前端开发最佳实践
- 代码要清晰、可维护
- 包含必要的样式和交互逻辑
- 使用语义化的HTML结构
- 响应式设计，适配不同屏幕尺寸

${requirements ? `额外要求：${requirements}` : ''}

请只返回代码，不要包含解释文字。代码应该是完整的、可以直接运行的。`

  return basePrompt
}
