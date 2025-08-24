// functions/api/chat.ts

export async function onRequestPost(context: any) {
  try {
    const request = context.request;
    const body = await request.json();
    
    const messages = body.messages || [];
    const lastMessage = messages[messages.length - 1];
    const userMessage = lastMessage ? lastMessage.content : '你好！';
    
    const response = {
      choices: [{
        delta: {
          content: `我收到了您的消息：${userMessage}。这是一个通过Cloudflare Pages Functions实现的API响应。当前时间：${new Date().toLocaleString('zh-CN')}`
        }
      }],
      usage: {
        prompt_tokens: userMessage.length,
        completion_tokens: 50,
        total_tokens: userMessage.length + 50
      }
    };

    return new Response(JSON.stringify(response), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: '处理请求失败' }), {
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
    headers: { 'Content-Type': 'application/json' }
  });
}