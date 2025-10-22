# 更新日志

本文档记录项目的所有重要变更。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [Unreleased]

### 计划添加
- [ ] 图片管理后台界面
- [ ] 支持更多云存储服务
- [ ] 图片统计和分析功能
- [ ] 批量编辑和重命名工具
- [ ] 图片水印功能
- [ ] 自动格式转换（WebP）

## [1.0.0] - 2023-10-22

### 新增
- 🎉 项目初始版本
- 📁 基础项目结构
- 🖼️ 图片目录管理（img/ 和 tinyPngImg/）
- 📄 完整的项目文档
  - README.md - 项目说明
  - USAGE.md - 使用指南
  - API.md - API 文档
  - DEPLOYMENT.md - 部署指南
  - FAQ.md - 常见问题
- 🌐 精美的 HTML 主页
  - 现代化 UI 设计
  - 响应式布局
  - 图片压缩指南
- 📚 Stagewise 插件安装指南
  - 完整的安装教程
  - 自动安装和手动安装说明
  - Vue 组件版本
- 🚀 Node.js 图片服务器
  - Express 服务器
  - 静态文件服务
  - RESTful API
  - 图片库页面
- 🗜️ 图片压缩脚本
  - TinyPNG API 集成
  - 批量压缩功能
  - 进度显示和统计
  - 跳过已压缩文件
- 🔧 实用工具脚本
  - upload-images.js - 图片上传工具
  - clean-temp.js - 临时文件清理
- ⚙️ 项目配置文件
  - package.json - 项目依赖和脚本
  - .gitignore - Git 忽略规则
  - .editorconfig - 编辑器配置
  - .env.example - 环境变量示例
- 📜 开源协议
  - MIT License
  - 贡献指南（CONTRIBUTING.md）
- 🎨 CDN-server 增强
  - 完善的 README
  - Vue 组件示例

### API
- `GET /` - 主页
- `GET /gallery` - 图片库页面
- `GET /api/images` - 获取压缩图片列表
- `GET /api/images/original` - 获取原始图片列表
- `GET /api/images/info/:filename` - 获取图片详细信息
- `GET /img/*` - 访问原始图片
- `GET /tinyPngImg/*` - 访问压缩图片

### 脚本命令
- `npm start` - 启动服务器
- `npm run serve` - 启动服务器（同上）
- `npm run dev` - 开发模式（热重载）
- `npm run compress` - 批量压缩图片
- `npm run upload` - 上传图片到 CDN
- `npm run preview` - 预览服务器
- `npm run clean` - 清理临时文件

## [0.1.0] - 2023-10-20

### 新增
- 初始项目结构
- 基础图片目录
- 简单的 HTML 页面

---

## 版本说明

### 版本格式

版本号格式：`主版本号.次版本号.修订号`

- **主版本号**：不兼容的 API 修改
- **次版本号**：向下兼容的功能性新增
- **修订号**：向下兼容的问题修正

### 变更类型

- `新增` - 新功能
- `变更` - 现有功能的变更
- `废弃` - 即将移除的功能
- `移除` - 已移除的功能
- `修复` - 问题修复
- `安全` - 安全相关修复

---

[Unreleased]: https://github.com/your-username/ImgCDN/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/your-username/ImgCDN/releases/tag/v1.0.0
[0.1.0]: https://github.com/your-username/ImgCDN/releases/tag/v0.1.0

