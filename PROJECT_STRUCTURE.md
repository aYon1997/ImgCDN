# 项目结构说明

本文档详细说明 ImgCDN 项目的目录结构和文件组织。

## 📁 目录树

```
ImgCDN/
├── 📄 README.md                    # 项目主文档
├── 📄 LICENSE                      # MIT 开源协议
├── 📄 CHANGELOG.md                 # 更新日志
├── 📄 CONTRIBUTING.md              # 贡献指南
├── 📄 PROJECT_STRUCTURE.md         # 本文档
├── 📄 .gitignore                   # Git 忽略规则
├── 📄 .editorconfig                # 编辑器配置
├── 📄 package.json                 # 项目依赖和脚本
├── 📄 index.html                   # 项目主页（精美UI）
│
├── 📂 img/                         # 原始图片目录
│   ├── 1.jpg
│   ├── 2.jpg
│   └── ...                         # 其他原始图片
│
├── 📂 tinyPngImg/                  # 压缩图片目录（CDN资源）
│   ├── 1.jpg
│   ├── 2.jpg
│   └── ...                         # 其他压缩图片
│
├── 📂 CDN-server/                  # Stagewise 插件安装指南
│   ├── 📄 README.md                # CDN-server 说明文档
│   ├── 📄 index.html               # 安装指南HTML版本
│   ├── 📄 vue.config.js            # Vue 配置示例
│   └── 📂 stagewise/               # Vue 组件版本
│       └── 📄 index.vue            # Stagewise 指南组件
│
├── 📂 server/                      # 服务器相关
│   ├── 📄 index.js                 # 主服务器（Express）
│   └── 📄 preview-server.js        # 预览服务器
│
├── 📂 scripts/                     # 自动化脚本
│   ├── 📄 compress-images.js       # 图片压缩脚本（TinyPNG）
│   ├── 📄 upload-images.js         # 图片上传工具
│   └── 📄 clean-temp.js            # 临时文件清理
│
├── 📂 docs/                        # 项目文档
│   ├── 📄 API.md                   # API 文档
│   ├── 📄 USAGE.md                 # 使用指南
│   ├── 📄 DEPLOYMENT.md            # 部署指南
│   └── 📄 FAQ.md                   # 常见问题
│
└── 📂 packages/                    # 工具包（不应提交到Git）
    ├── React Developer Tools插件.zip
    └── Snipaste-2.10.3-x64.zip
```

## 📋 文件说明

### 根目录文件

| 文件 | 说明 | 必需 |
|------|------|------|
| README.md | 项目主文档，介绍项目功能和使用方法 | ✅ 是 |
| LICENSE | MIT 开源协议 | ✅ 是 |
| CHANGELOG.md | 记录项目版本更新历史 | ✅ 是 |
| CONTRIBUTING.md | 贡献指南，说明如何参与项目 | 推荐 |
| PROJECT_STRUCTURE.md | 项目结构说明（本文档） | 推荐 |
| .gitignore | Git 忽略规则，排除不必要的文件 | ✅ 是 |
| .editorconfig | 编辑器配置，统一代码风格 | 推荐 |
| package.json | Node.js 项目配置，定义依赖和脚本 | ✅ 是 |
| index.html | 项目主页，精美的图片管理界面 | ✅ 是 |

### 图片目录

#### img/ - 原始图片
- **用途**：存放未压缩的原始图片
- **提交到Git**：可选（占用空间大）
- **建议**：可以只在本地保留，不提交到仓库

#### tinyPngImg/ - 压缩图片
- **用途**：存放压缩后的图片，用于 CDN 分发
- **提交到Git**：✅ 必需
- **访问**：`https://your-domain.com/tinyPngImg/image.jpg`
- **建议**：所有上线的图片都应该放在这里

### CDN-server/ - 开发文档

包含 Stagewise 插件的完整安装指南：

- `index.html` - 独立的 HTML 页面，可直接在浏览器中打开
- `stagewise/index.vue` - Vue 组件版本，可集成到 Vue 项目
- `vue.config.js` - Vue 项目配置示例
- `README.md` - 详细的使用说明

### server/ - 服务器代码

#### index.js - 主服务器
- **功能**：
  - 静态文件服务（图片访问）
  - RESTful API（图片列表、信息查询）
  - 图片库页面
- **启动**：`npm start` 或 `npm run serve`
- **端口**：3000（可配置）

#### preview-server.js - 预览服务器
- **功能**：简单的图片预览界面
- **启动**：`npm run preview`
- **端口**：8080（可配置）

### scripts/ - 自动化脚本

#### compress-images.js - 图片压缩
- **功能**：使用 TinyPNG API 批量压缩图片
- **使用**：`npm run compress`
- **要求**：需要 TinyPNG API Key

#### upload-images.js - 图片上传
- **功能**：上传图片到云存储（可自定义）
- **使用**：`npm run upload`
- **支持**：阿里云OSS、腾讯云COS、七牛云等

#### clean-temp.js - 清理工具
- **功能**：清理临时文件和缓存
- **使用**：`npm run clean`

### docs/ - 项目文档

| 文档 | 内容 | 适合人群 |
|------|------|----------|
| API.md | API 接口文档 | 开发者 |
| USAGE.md | 详细使用指南 | 所有用户 |
| DEPLOYMENT.md | 部署教程 | 管理员 |
| FAQ.md | 常见问题解答 | 所有用户 |

### packages/ - 工具包

存放各种工具的压缩包，**不应提交到 Git 仓库**。

已在 `.gitignore` 中忽略。

## 🔧 配置文件

### package.json

定义项目依赖和 npm 脚本：

```json
{
  "scripts": {
    "start": "启动服务器",
    "dev": "开发模式（热重载）",
    "compress": "压缩图片",
    "upload": "上传图片",
    "preview": "预览服务器",
    "clean": "清理临时文件"
  }
}
```

### .gitignore

排除不必要的文件：
- `node_modules/` - npm 依赖
- `packages/` - 工具包
- `.env` - 环境变量
- 临时文件和系统文件

### .editorconfig

统一编辑器配置：
- 缩进：2 空格
- 编码：UTF-8
- 换行：LF
- 文件末尾空行：是

## 📦 依赖说明

### 生产依赖

| 包 | 用途 | 版本 |
|----|------|------|
| express | Web 服务器框架 | ^4.18.2 |
| cors | 跨域支持 | ^2.8.5 |
| multer | 文件上传处理 | ^1.4.5-lts.1 |
| sharp | 图片处理 | ^0.32.0 |

### 开发依赖

| 包 | 用途 | 版本 |
|----|------|------|
| nodemon | 自动重启 | ^3.0.1 |
| tinify | TinyPNG API | ^1.7.1 |
| dotenv | 环境变量 | ^16.3.1 |
| chalk | 终端彩色输出 | ^4.1.2 |
| ora | 进度指示器 | ^5.4.1 |

## 🚀 工作流程

### 添加新图片

```
1. 添加原图到 img/
   ↓
2. 运行压缩脚本或手动压缩
   ↓
3. 压缩图保存到 tinyPngImg/
   ↓
4. Git 提交并推送
   ↓
5. 自动部署（GitHub Actions/Vercel等）
```

### 本地开发

```
1. git clone 项目
   ↓
2. npm install 安装依赖
   ↓
3. npm run serve 启动服务器
   ↓
4. 访问 http://localhost:3000
```

### 部署流程

```
1. 准备图片（压缩）
   ↓
2. Git 提交所有更改
   ↓
3. 推送到 GitHub
   ↓
4. 配置部署平台
   ↓
5. 自动或手动触发部署
   ↓
6. 访问线上地址
```

## 📊 文件大小建议

| 类型 | 建议大小 | 最大限制 |
|------|----------|----------|
| JPEG 照片 | < 500 KB | 5 MB |
| PNG 图标 | < 100 KB | 2 MB |
| WebP | < 400 KB | 5 MB |
| GIF | < 1 MB | 5 MB |

## 🔒 安全考虑

### 不应提交到 Git

- `.env` 文件（包含 API Key）
- `node_modules/` 目录
- 临时文件和缓存
- 大型工具包

### 应该提交

- 压缩后的图片
- 源代码和配置
- 文档和说明
- 示例和模板

## 🎯 最佳实践

### 1. 目录组织

```
tinyPngImg/
├── icons/          # 图标分类
├── products/       # 产品图片
├── banners/        # 横幅图片
└── avatars/        # 头像图片
```

### 2. 命名规范

- 使用小写字母
- 使用连字符 `-` 分隔
- 包含描述性信息
- 避免中文和特殊字符

示例：
- ✅ `hero-banner-2023.jpg`
- ✅ `product-smartphone-01.png`
- ❌ `图片1.jpg`
- ❌ `IMG_20230101.jpg`

### 3. 版本控制

```bash
# 为重要版本打标签
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

## 📚 扩展阅读

- [项目 README](README.md) - 项目概述
- [使用指南](docs/USAGE.md) - 详细使用说明
- [API 文档](docs/API.md) - API 接口参考
- [部署指南](docs/DEPLOYMENT.md) - 部署教程
- [常见问题](docs/FAQ.md) - 问题解答

---

更新时间：2023-10-22  
维护者：ImgCDN Team

