// 导入Next.js的请求和响应类型
import { NextRequest, NextResponse } from 'next/server'
// 导入聊天请求的类型定义
import { ChatRequest } from '../../../types'

// DeepSeek API的端点URL
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'
// 从环境变量获取API密钥，如果没有则使用默认值
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || 'sk-a0bb3e093da84cfca66924fe1d64a9ec'

// 处理POST请求的聊天API端点
export async function POST(request: NextRequest) {
  try {
    // 解析请求体为ChatRequest类型
    const body: ChatRequest = await request.json()
    // 从请求体中解构出参数，设置默认值
    const { messages, stream = true, temperature = 0.7, maxTokens = 2048, audioData } = body

    // 如果有音频数据，先进行语音转文本
    let processedMessages = messages
    if (audioData) {
      try {
        const speechResponse = await fetch(`${request.nextUrl.origin}/api/speech-to-text`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            audioData: audioData.base64,
            mimeType: audioData.mimeType
          }),
        })

        if (speechResponse.ok) {
          const speechResult = await speechResponse.json()
          if (speechResult.success && speechResult.text) {
            // 将转换后的文本添加到消息中
            processedMessages = [
              ...messages,
              {
                id: Date.now().toString(),
                content: speechResult.text,
                role: 'user',
                timestamp: new Date().toISOString(),
                media: [audioData] // 保留原始音频数据用于显示
              }
            ]
          }
        }
      } catch (error) {
        console.error('语音转文本失败:', error)
      }
    }

    // 记录收到的聊天请求信息
    console.log('收到聊天请求:', { messages: messages.length, stream, temperature, maxTokens })

    // 检查API密钥是否配置
    if (!DEEPSEEK_API_KEY) {
      console.error('DeepSeek API密钥未配置')
      return NextResponse.json(
        { error: 'DeepSeek API密钥未配置' },
        { status: 500 }
      )
    }

    // 验证消息数组是否为空
    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: '消息不能为空' },
        { status: 400 }
      )
    }

    // 转换消息格式为DeepSeek API要求的格式
    const apiMessages = processedMessages.map(msg => ({
      role: msg.role,      // 消息角色（user/assistant/system）
      content: msg.content // 消息内容
    }))

    // 构建发送给DeepSeek API的请求体
    const requestBody = {
      model: 'deepseek-chat',        // 使用的模型名称
      messages: apiMessages,         // 消息数组
      stream: stream,                // 是否使用流式响应
      temperature: temperature,      // 温度参数，控制输出的随机性
      max_tokens: maxTokens,         // 最大生成令牌数
      top_p: 1,                     // 核采样参数
      frequency_penalty: 0,          // 频率惩罚
      presence_penalty: 0            // 存在惩罚
    }

    // 记录发送到DeepSeek的请求内容
    console.log('发送到DeepSeek的请求:', requestBody)

    // 根据stream参数决定使用流式还是非流式响应
    if (stream) {
      // 流式响应处理
      const response = await fetch(DEEPSEEK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`, // 添加API密钥到请求头
        },
        body: JSON.stringify(requestBody), // 将请求体转换为JSON字符串
      })

      // 检查API响应是否成功
      if (!response.ok) {
        const errorText = await response.text()
        console.error('DeepSeek API错误:', errorText)
        return NextResponse.json(
          { error: 'DeepSeek API请求失败' },
          { status: response.status }
        )
      }

      // 创建可读流来处理流式响应
      const stream = new ReadableStream({
        async start(controller) {
          // 获取响应体的读取器
          const reader = response.body?.getReader()
          if (!reader) {
            controller.error('无法读取响应流')
            return
          }

          try {
            // 循环读取流数据
            while (true) {
              const { done, value } = await reader.read()
              
              // 如果流结束，发送结束标记并关闭控制器
              if (done) {
                // 发送结束标记
                controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'))
                controller.close()
                break
              }

              // 将响应数据转发给客户端
              controller.enqueue(value)
            }
          } catch (error) {
            console.error('流处理错误:', error)
            controller.error(error)
          } finally {
            // 释放读取器锁
            reader.releaseLock()
          }
        },
      })

      // 返回流式响应
      return new Response(stream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8', // 设置内容类型
          'Cache-Control': 'no-cache',                 // 禁用缓存
          'Connection': 'keep-alive',                  // 保持连接
        },
      })
    } else {
      // 非流式响应处理
      const response = await fetch(DEEPSEEK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`, // 添加API密钥到请求头
        },
        body: JSON.stringify(requestBody), // 将请求体转换为JSON字符串
      })

      // 检查API响应是否成功
      if (!response.ok) {
        const errorText = await response.text()
        console.error('DeepSeek API错误:', errorText)
        return NextResponse.json(
          { error: 'DeepSeek API请求失败' },
          { status: response.status }
        )
      }

      // 解析响应数据并返回
      const data = await response.json()
      return NextResponse.json(data)
    }
  } catch (error) {
    // 捕获并记录所有错误
    console.error('API处理错误:', error)
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    )
  }
}
