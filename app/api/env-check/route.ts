import { NextResponse } from 'next/server'

export async function GET() {
  const envVars = {
    DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY ? '已配置' : '未配置',
    DEEPSEEK_API_KEY_LENGTH: process.env.DEEPSEEK_API_KEY ? process.env.DEEPSEEK_API_KEY.length : 0,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
  }

  return NextResponse.json({
    message: '环境变量检查',
    timestamp: new Date().toISOString(),
    environment: envVars,
    hasApiKey: !!process.env.DEEPSEEK_API_KEY
  })
}
