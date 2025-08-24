import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'API服务器运行正常',
    timestamp: new Date().toISOString(),
    status: 'ok'
  })
}
