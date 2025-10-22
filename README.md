# ImgCDN - 图片CDN管理系统

一个简单易用的图片CDN管理系统，提供图片托管、压缩和在线展示功能。

## 📋 项目简介

ImgCDN 是一个轻量级的图片CDN解决方案，帮助开发者快速搭建自己的图片托管服务。项目包含：

- 🖼️ **图片管理**：原始图片和压缩图片分类存储
- 🗜️ **图片压缩**：集成TinyPNG无损压缩指南
- 📚 **开发文档**：Stagewise插件安装教程
- 🚀 **简单部署**：可快速部署到GitHub Pages或其他静态托管服务

## 📁 项目结构

```
ImgCDN/
├── img/                    # 原始图片文件夹
├── tinyPngImg/            # 压缩后的图片文件夹
├── CDN-server/            # Stagewise插件安装指南
│   ├── index.html         # 安装指南HTML版本
│   ├── stagewise/         # Vue组件版本
│   └── vue.config.js      # Vue配置文件
├── packages/              # 工具包（不应提交到Git）
├── index.html             # 图片压缩引导页面
└── README.md             # 项目说明文档
```

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/your-username/ImgCDN.git
cd ImgCDN
```

### 2. 访问图片

图片可以通过以下URL格式访问：

```
https://your-domain.com/tinyPngImg/图片名称.jpg
```

### 3. 添加新图片

1. 将原始图片放入 `img/` 文件夹
2. 访问 [TinyPNG](https://tinypng.com/) 进行图片压缩
3. 将压缩后的图片放入 `tinyPngImg/` 文件夹
4. 提交更改到Git仓库

## 🖼️ 图片压缩指南

本项目使用 TinyPNG 进行图片无损压缩：

1. 打开根目录的 `index.html` 文件
2. 点击链接访问 TinyPNG 官网
3. 上传 `img/` 文件夹中的图片
4. 下载压缩后的图片到 `tinyPngImg/` 文件夹

**压缩效果**：
- 平均压缩率：50-70%
- 画质损失：肉眼几乎不可见
- 支持格式：PNG、JPEG、WebP

## 📚 CDN-server说明

`CDN-server/` 目录包含 Stagewise 插件安装指南，这是一个帮助开发者使用 Cursor AI 编辑器的教程页面。

### 查看指南

在浏览器中打开：
```
file:///path/to/ImgCDN/CDN-server/index.html
```

或部署后访问：
```
https://your-domain.com/CDN-server/
```

## 🛠️ 开发工具

### 本地图片服务器

项目包含一个简单的Node.js图片服务器（待实现），可以在本地预览图片：

```bash
npm install
npm run serve
```

访问 `http://localhost:3000` 查看图片列表。

### 批量压缩脚本

使用自动化脚本批量压缩图片（需要TinyPNG API Key）：

```bash
npm run compress
```

## 📦 部署

### 部署到 GitHub Pages

1. 在 GitHub 上创建仓库
2. 推送代码到仓库
3. 在仓库设置中启用 GitHub Pages
4. 选择分支和根目录
5. 访问 `https://username.github.io/ImgCDN/`

### 部署到其他平台

项目是纯静态网站，可以部署到任何静态托管服务：

- Vercel
- Netlify
- Cloudflare Pages
- 阿里云OSS
- 腾讯云COS

## 🔧 配置说明

### 环境变量

创建 `.env` 文件（可选）：

```env
# TinyPNG API Key（用于自动压缩）
TINYPNG_API_KEY=your_api_key_here

# CDN域名
CDN_DOMAIN=https://your-cdn-domain.com

# 图片路径前缀
IMAGE_PREFIX=/tinyPngImg
```

## 📝 使用建议

1. **图片命名**：使用英文和数字，避免中文和特殊字符
2. **图片大小**：建议单张图片不超过5MB
3. **格式选择**：
   - 照片：使用JPEG格式
   - 透明图：使用PNG格式
   - 动画：使用GIF或WebP格式
4. **目录管理**：可以在img和tinyPngImg中创建子目录分类管理

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🔗 相关链接

- [TinyPNG 官网](https://tinypng.com/)
- [Stagewise 插件](https://marketplace.visualstudio.com/items?itemName=stagewise)
- [GitHub Pages 文档](https://pages.github.com/)

## 📧 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 Issue
- 发送邮件到：your-email@example.com

## 🎯 未来计划

- [ ] 添加图片管理后台界面
- [ ] 集成自动压缩API
- [ ] 支持图片水印添加
- [ ] 实现图片CDN加速
- [ ] 添加图片统计分析功能
- [ ] 支持批量上传和管理
- [ ] 实现图片格式自动转换

---

⭐ 如果这个项目对你有帮助，请给个Star支持一下！

