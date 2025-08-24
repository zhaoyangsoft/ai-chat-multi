// 标记为客户端组件
'use client'

// 导入React
import React from 'react'
// 导入Markdown渲染器
import MarkdownRenderer from '../../components/MarkdownRenderer'

// Markdown测试页面组件
export default function MarkdownTestPage() {
  // 测试用的Markdown内容
  const testMarkdown = `# Markdown 渲染测试

这是一个 **Markdown** 渲染测试页面，展示了各种 Markdown 语法的渲染效果。

## 文本格式

- **粗体文本** 使用 \`**text**\`
- *斜体文本* 使用 \`*text*\`
- \`行内代码\` 使用反引号

## 代码块

\`\`\`javascript
// JavaScript 代码示例
function hello() {
  console.log("Hello, World!");
  return "Hello";
}
\`\`\`

## 列表

### 无序列表
- 项目 1
- 项目 2
- 项目 3

### 有序列表
1. 第一项
2. 第二项
3. 第三项

## 引用

> 这是一个引用块
> 可以包含多行内容
> 用于突出显示重要信息

## 链接

访问 [GitHub](https://github.com) 了解更多信息。

## 标题层级

### 三级标题
#### 四级标题
##### 五级标题

## 表格示例

| 功能 | 支持 | 说明 |
|------|------|------|
| 标题 | ✅ | 支持 # ## ### |
| 粗体 | ✅ | 支持 **text** |
| 代码 | ✅ | 支持 \`code\` |
| 链接 | ✅ | 支持 [text](url) |

---

*这个测试页面展示了基本的 Markdown 语法渲染效果。*
`

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Markdown 渲染测试
          </h1>
          
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <MarkdownRenderer 
              content={testMarkdown}
              className="markdown-content"
            />
          </div>
          
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">原始 Markdown 代码：</h3>
            <pre className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
              {testMarkdown}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
