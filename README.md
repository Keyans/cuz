# Cuz - Print-on-Demand Platform

Cuz is a modern print-on-demand platform built with:

- Nuxt.js (Vue.js framework)
- Tailwind CSS
- TypeScript
- Netlify deployment

## Features

- User authentication
- Product management
- Dashboard interface
- SEO optimization
- PWA support

## Getting Started

1. Clone the repository
2. Install dependencies: `bun install`
3. Start development server: `bun run dev`
4. Build for production: `bun run build`

## Deployment

The project is configured for deployment on Netlify. See `netlify.toml` for configuration details.

## License

MIT

# 服务端请求优化说明

## 概述
本项目对服务端请求进行了全面优化，提高了性能、可靠性和数据一致性。主要包括以下几个方面：

## 1. HTTP请求工具优化 (`server/utils/http.ts`)

- **统一请求处理**：所有HTTP方法（GET、POST、PUT、DELETE）共用同一个底层请求函数，减少了代码重复
- **请求缓存**：添加了内存缓存机制，可以为GET请求设置缓存，减少重复请求
- **自动重试**：支持请求失败自动重试，可配置重试次数和延迟策略
- **超时控制**：允许为各个请求单独设置超时时间
- **错误处理**：改进了错误处理和日志记录，方便调试和问题排查
- **类型安全**：完善了类型定义，提供了更好的类型推导和编码体验

## 2. API端点优化 (`server/api/categories/listLevel.ts`)

- **统一响应格式**：确保API返回的数据格式一致，无论是真实API还是模拟数据
- **更好的数据模型**：定义了更完整的数据模型，包括分页信息
- **缓存支持**：类目API启用了5分钟的缓存，减少冗余请求
- **失败重试**：添加了自动重试机制，提高API可靠性
- **更详细的日志**：添加了更详细的日志记录，便于调试
- **优化模拟数据**：将模拟数据抽取为独立函数，更易于维护

## 3. 前端组件优化 (`pages/dashboard/sourcing/index.vue`)

- **类型安全**：为API响应定义了更准确的类型接口
- **统一数据处理**：添加了统一的数据提取和处理逻辑
- **请求去重**：为所有useFetch请求添加了key选项，避免重复请求
- **数据监听**：添加了watch钩子监听数据变化，确保数据更新时UI同步更新
- **错误处理**：改进了错误状态处理和数据加载状态的跟踪

## 使用指南

### 如何使用缓存
```typescript
// 启用缓存的GET请求示例
const response = await get<DataType>(event, {
  url: 'your-api-endpoint',
  params: query,
  cache: true,           // 启用缓存
  cacheTime: 300000,     // 缓存有效期（毫秒）
})
```

### 如何使用重试
```typescript
// 带重试的API请求示例
const response = await get<DataType>(event, {
  url: 'your-api-endpoint',
  params: query,
  retry: 3,              // 最多重试3次
})
```

### 如何清除缓存
```typescript
import { clearCache, clearAllCache } from '~/server/utils/http'

// 清除特定URL的缓存
clearCache('your-api-endpoint', { param1: 'value1' })

// 清除所有缓存
clearAllCache()
```
