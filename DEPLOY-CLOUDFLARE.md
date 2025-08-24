# 部署到Cloudflare Pages指南

## 🚀 快速部署

### 方法1: 通过Cloudflare Dashboard（推荐）

1. **登录Cloudflare Dashboard**
   - 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - 选择您的账户

2. **创建Pages项目**
   - 点击左侧菜单的 "Pages"
   - 点击 "Create a project"
   - 选择 "Connect to Git"

3. **连接Git仓库**
   - 选择您的Git提供商（GitHub、GitLab等）
   - 授权并选择仓库
   - 点击 "Begin setup"

4. **配置构建设置**
   ```
   Project name: ai-workflow-platform
   Production branch: main (或 master)
   Framework preset: Next.js
   Build command: npm run build
   Build output directory: out
   Root directory: / (留空)
   ```

5. **环境变量设置**
   ```
   NODE_ENV: production
   ```

6. **部署**
   - 点击 "Save and Deploy"
   - 等待构建完成

### 方法2: 通过Wrangler CLI

1. **安装Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **登录Cloudflare**
   ```bash
   wrangler login
   ```

3. **部署项目**
   ```bash
   # 构建项目
   npm run build
   
   # 部署到Cloudflare Pages
   wrangler pages deploy out
   ```

## ⚙️ 配置说明

### Next.js配置
- `output: 'export'` - 启用静态导出
- `images.unoptimized: true` - 禁用图片优化（静态导出不支持）

### 构建输出
- 构建后的文件位于 `out/` 目录
- 包含所有静态HTML、CSS、JavaScript文件

## 🔧 自定义域名

1. **在Cloudflare Pages中**
   - 进入项目设置
   - 点击 "Custom domains"
   - 添加您的域名

2. **DNS配置**
   - 在Cloudflare DNS中添加CNAME记录
   - 指向您的Pages项目URL

## 📱 性能优化

### 自动优化
- **自动压缩**: Cloudflare自动压缩HTML、CSS、JS
- **CDN分发**: 全球200+数据中心
- **智能缓存**: 自动缓存静态资源

### 手动优化
- 启用Brotli压缩
- 配置缓存策略
- 使用Cloudflare Workers优化

## 🚨 注意事项

### 限制
- **API路由不可用**: 静态导出不支持服务器端API
- **动态路由**: 需要预生成所有可能的路径
- **图片优化**: 需要手动优化图片

### 解决方案
- 使用外部API服务（如Vercel Functions）
- 预生成所有动态页面
- 使用Cloudflare Images服务

## 🔍 故障排除

### 常见问题

1. **构建失败**
   ```bash
   # 清理缓存
   rm -rf .next out
   npm run build
   ```

2. **页面404**
   - 检查路由配置
   - 确保所有页面都预生成

3. **资源加载失败**
   - 检查资源路径
   - 验证basePath配置

### 调试命令
```bash
# 本地测试构建
npm run build
npx serve out

# 检查构建输出
ls -la out/
```

## 📊 监控和分析

### Cloudflare Analytics
- 页面性能指标
- 访问统计
- 错误监控

### 性能测试
- Lighthouse评分
- Core Web Vitals
- 加载时间分析

## 🔄 持续部署

### 自动部署
- 每次推送到main分支自动部署
- 支持预览部署（PR）
- 回滚到之前的版本

### 环境管理
- Production: 主域名
- Preview: 预览环境
- 分支部署: 功能测试

---

## 🎯 部署检查清单

- [ ] 更新 `next.config.js` 配置
- [ ] 测试本地构建 `npm run build`
- [ ] 检查 `out/` 目录内容
- [ ] 配置Cloudflare Pages
- [ ] 设置环境变量
- [ ] 测试部署结果
- [ ] 配置自定义域名
- [ ] 验证性能指标

## 📞 支持

如果遇到问题，可以：
1. 查看 [Cloudflare Pages文档](https://developers.cloudflare.com/pages/)
2. 检查 [Next.js静态导出文档](https://nextjs.org/docs/advanced-features/static-html-export)
3. 在 [Cloudflare社区](https://community.cloudflare.com/) 寻求帮助
