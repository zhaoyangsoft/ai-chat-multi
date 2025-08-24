export async function onRequestPost(context: any) {
    const { request } = context;
    const body = await request.json();
    
    const userMessage = body.messages?.[body.messages.length - 1]?.content || '';
    
    // 创建流式响应
    const stream = new ReadableStream({
      start(controller) {
        const words = `我正在处理您的消息：${userMessage}。这是一个流式响应示例。`.split(' ');
        
        let index = 0;
        const interval = setInterval(() => {
          if (index < words.length) {
            controller.enqueue(`data: ${JSON.stringify({
              choices: [{
                delta: { content: words[index] + ' ' }
              }]
            })}\n\n`);
            index++;
          } else {
            controller.enqueue('data: [DONE]\n\n');
            controller.close();
            clearInterval(interval);
          }
        }, 200);
      }
    });
  
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    });
  }