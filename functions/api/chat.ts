// functions/api/chat.ts

// DeepSeek API的端点URL
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
// 从环境变量获取API密钥
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || 'sk-a0bb3e093da84cfca66924fe1d64a9ec';

// 处理POST请求
export async function onRequestPost(context: any) {
  try {
    const request = context.request;
    const body = await request.json();

    // 从请求体中解构出参数，设置默认值
    const { messages = [], stream = true, temperature = 0.7, maxTokens = 2048, audioData } = body;

    // 如果有音频数据，先进行语音转文本
    let processedMessages = messages;
    if (audioData) {
      try {
        // 构建语音转文本请求URL
        const origin = new URL(request.url).origin;
        const speechResponse = await fetch(`${origin}/api/speech-to-text`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            audioData: audioData.base64,
            mimeType: audioData.mimeType
          }),
        });

        if (speechResponse.ok) {
          const speechResult = await speechResponse.json();
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
            ];
          }
        }
      } catch (error) {
        console.error('语音转文本失败:', error);
      }
    }

    // 记录收到的聊天请求信息
    console.log('收到聊天请求:', { messages: messages.length, stream, temperature, maxTokens });

    // 检查API密钥是否配置
    if (!DEEPSEEK_API_KEY) {
      console.error('DeepSeek API密钥未配置');
      return new Response(JSON.stringify({
        error: 'DeepSeek API密钥未配置'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // 验证消息数组是否为空
    if (messages.length === 0) {
      return new Response(JSON.stringify({
        error: '消息不能为空'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // 转换消息格式为DeepSeek API要求的格式
    const apiMessages = processedMessages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // 构建发送给DeepSeek API的请求体
    const requestBody = {
      model: 'deepseek-chat',
      messages: apiMessages,
      stream: stream,
      temperature: temperature,
      max_tokens: maxTokens,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    };

    // 记录发送到DeepSeek的请求内容
    console.log('发送到DeepSeek的请求:', requestBody);

    // 根据stream参数决定使用流式还是非流式响应
    if (stream) {
      // 流式响应处理
      const response = await fetch(DEEPSEEK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify(requestBody),
      });

      // 检查API响应是否成功
      if (!response.ok) {
        const errorText = await response.text();
        console.error('DeepSeek API错误:', errorText);
        return new Response(JSON.stringify({
          error: 'DeepSeek API请求失败'
        }), {
          status: response.status,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }

      // 创建可读流来处理流式响应
      const { readable, writable } = new TransformStream();
      const writer = writable.getWriter();

      // 处理DeepSeek的流式响应
      const reader = response.body?.getReader();
      if (!reader) {
        return new Response(JSON.stringify({
          error: '无法读取响应流'
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }

      // 异步处理流
      (async () => {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              // 发送结束标记
              await writer.write(new TextEncoder().encode('data: [DONE]\n\n'));
              writer.close();
              break;
            }
            // 将响应数据转发给客户端
            await writer.write(value);
          }
        } catch (error) {
          console.error('流处理错误:', error);
          writer.error(error);
        } finally {
          reader.releaseLock();
        }
      })();

      // 返回流式响应
      return new Response(readable, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'Access-Control-Allow-Origin': '*'
        },
      });
    } else {
      // 非流式响应处理
      const response = await fetch(DEEPSEEK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify(requestBody),
      });

      // 检查API响应是否成功
      if (!response.ok) {
        const errorText = await response.text();
        console.error('DeepSeek API错误:', errorText);
        return new Response(JSON.stringify({
          error: 'DeepSeek API请求失败'
        }), {
          status: response.status,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }

      // 解析响应数据并返回
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  } catch (error) {
    // 捕获并记录所有错误
    console.error('API处理错误:', error);
    return new Response(JSON.stringify({
      error: '服务器内部错误'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

// 处理OPTIONS请求（CORS预检）
export async function onRequestOptions(context: any) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}

// 处理GET请求（用于测试）
export async function onRequestGet(context: any) {
  return new Response(JSON.stringify({
    message: 'Chat API is running',
    timestamp: new Date().toISOString()
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}