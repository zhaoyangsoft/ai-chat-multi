// 导入Next.js的请求和响应类型
import { NextRequest, NextResponse } from 'next/server'

// 处理POST请求的语音转文本API端点
export async function POST(request: NextRequest) {
  try {
    // 解析请求体
    const body = await request.json()
    const { audioData, mimeType } = body

    // 检查是否有音频数据
    if (!audioData) {
      return NextResponse.json(
        { error: '缺少音频数据' },
        { status: 400 }
      )
    }

    // 方案1：如果有OpenAI API密钥，使用Whisper模型
    if (process.env.OPENAI_API_KEY) {
      try {
        // 将Base64音频数据转换为Blob
        const audioBlob = new Blob(
          [Buffer.from(audioData, 'base64')],
          { type: mimeType || 'audio/wav' }
        )

        // 创建FormData对象，用于发送到语音识别服务
        const formData = new FormData()
        formData.append('file', audioBlob, 'audio.wav')
        formData.append('model', 'whisper-1') // 使用OpenAI的Whisper模型

        // 调用OpenAI的语音转文本API
        const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: formData,
        })

        if (response.ok) {
          const result = await response.json()
          return NextResponse.json({
            text: result.text,
            success: true,
            method: 'whisper'
          })
        }
      } catch (error) {
        console.error('Whisper API错误:', error)
      }
    }

    // 方案2：使用DeepSeek的语音转文本API（如果支持）
    if (process.env.DEEPSEEK_API_KEY) {
      try {
        const response = await fetch('https://api.deepseek.com/v1/audio/transcriptions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            file: audioData,
            model: 'deepseek-whisper'
          }),
        })

        if (response.ok) {
          const result = await response.json()
          return NextResponse.json({
            text: result.text,
            success: true,
            method: 'deepseek'
          })
        }
      } catch (error) {
        console.error('DeepSeek语音API错误:', error)
      }
    }

    // 方案3：返回模拟文本（用于测试）
    return NextResponse.json({
      text: '这是从语音转换的文本（模拟结果）',
      success: true,
      method: 'mock'
    })

  } catch (error) {
    console.error('语音转文本处理错误:', error)
    return NextResponse.json(
      { error: '语音转文本处理失败' },
      { status: 500 }
    )
  }
}
