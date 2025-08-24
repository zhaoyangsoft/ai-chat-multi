@echo off
echo 🚀 启动AI聊天助手项目...

REM 检查Node.js是否安装
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 错误: 未找到Node.js，请先安装Node.js
    pause
    exit /b 1
)

REM 检查pnpm是否安装
pnpm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 错误: 未找到pnpm，请先安装pnpm
    echo 安装命令: npm install -g pnpm
    pause
    exit /b 1
)

echo 📦 安装依赖...
pnpm install

echo 🔧 检查环境变量...
if not exist ".env.local" (
    echo ⚠️  警告: 未找到.env.local文件
    echo 📝 请复制env.example为.env.local并配置您的DeepSeek API密钥
    echo    copy env.example .env.local
    echo    然后编辑.env.local文件添加您的API密钥
)

echo 🌟 启动开发服务器...
pnpm dev

pause
