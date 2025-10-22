# 部署指南

本文档介绍如何将 ImgCDN 部署到各种平台。

## 📦 准备工作

在部署之前，确保：

1. 已完成图片压缩（将原图压缩后放入 `tinyPngImg/` 目录）
2. 删除或忽略 `packages/` 目录中的临时文件
3. 提交所有更改到 Git 仓库

## 🌐 GitHub Pages 部署

GitHub Pages 是最简单的部署方式，完全免费。

### 步骤

1. **创建 GitHub 仓库**

   在 GitHub 上创建一个新仓库，例如 `ImgCDN`

2. **推送代码**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/ImgCDN.git
   git push -u origin main
   ```

3. **启用 GitHub Pages**

   - 进入仓库设置 (Settings)
   - 找到 "Pages" 选项
   - Source 选择 `main` 分支
   - Root 选择 `/` (root)
   - 点击 Save

4. **访问网站**

   几分钟后，网站将在以下地址可用：
   ```
   https://your-username.github.io/ImgCDN/
   ```

5. **图片访问**

   图片 URL 格式：
   ```
   https://your-username.github.io/ImgCDN/tinyPngImg/example.jpg
   ```

### 自定义域名

1. 在仓库根目录创建 `CNAME` 文件
2. 写入你的域名：`cdn.yourdomain.com`
3. 在域名 DNS 设置中添加 CNAME 记录指向 `your-username.github.io`

## ☁️ Vercel 部署

Vercel 提供快速的全球 CDN 和自动部署。

### 步骤

1. **安装 Vercel CLI**

   ```bash
   npm install -g vercel
   ```

2. **登录 Vercel**

   ```bash
   vercel login
   ```

3. **部署项目**

   ```bash
   vercel
   ```

   按照提示完成配置

4. **生产部署**

   ```bash
   vercel --prod
   ```

### vercel.json 配置（可选）

创建 `vercel.json` 文件：

```json
{
  "version": 2,
  "routes": [
    {
      "src": "/tinyPngImg/(.*)",
      "headers": {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    }
  ]
}
```

## 🚀 Netlify 部署

Netlify 提供持续部署和全球 CDN。

### 通过 Git 部署

1. 访问 [Netlify](https://netlify.com)
2. 点击 "Add new site" → "Import an existing project"
3. 选择 GitHub 并授权
4. 选择你的 ImgCDN 仓库
5. 配置构建设置：
   - Build command: (留空)
   - Publish directory: `/`
6. 点击 "Deploy site"

### 通过 CLI 部署

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录
netlify login

# 部署
netlify deploy --prod
```

## 🌊 Cloudflare Pages 部署

Cloudflare Pages 提供免费的全球 CDN。

### 步骤

1. 访问 [Cloudflare Pages](https://pages.cloudflare.com)
2. 点击 "Create a project"
3. 连接 GitHub 仓库
4. 选择 ImgCDN 仓库
5. 配置构建：
   - Framework preset: None
   - Build command: (留空)
   - Build output directory: `/`
6. 点击 "Save and Deploy"

## 📦 服务器部署 (Node.js)

如果需要使用 API 功能，可以部署到支持 Node.js 的服务器。

### 使用 PM2

1. **安装依赖**

   ```bash
   npm install
   ```

2. **安装 PM2**

   ```bash
   npm install -g pm2
   ```

3. **启动服务**

   ```bash
   pm2 start server/index.js --name imgcdn
   pm2 save
   pm2 startup
   ```

4. **Nginx 反向代理**

   ```nginx
   server {
       listen 80;
       server_name cdn.yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
       
       location /tinyPngImg/ {
           alias /path/to/ImgCDN/tinyPngImg/;
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

### Docker 部署

创建 `Dockerfile`：

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "server/index.js"]
```

构建和运行：

```bash
docker build -t imgcdn .
docker run -d -p 3000:3000 --name imgcdn imgcdn
```

## ☁️ 云存储 CDN

### 阿里云 OSS

1. 创建 OSS Bucket
2. 上传 `tinyPngImg/` 目录的内容
3. 配置 CDN 加速
4. 使用 `scripts/upload-images.js` 自动上传

### 腾讯云 COS

1. 创建 COS Bucket
2. 开启 CDN 加速
3. 配置跨域访问
4. 批量上传图片

### 七牛云

1. 创建存储空间
2. 绑定加速域名
3. 使用七牛云工具上传
4. 配置图片处理规则

## 🔒 安全建议

1. **HTTPS**：始终使用 HTTPS
2. **防盗链**：配置 Referer 白名单
3. **访问控制**：限制敏感资源访问
4. **API 限流**：如果使用 API，配置限流

## 📊 监控和分析

### Google Analytics

在 `index.html` 中添加：

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_GA_ID');
</script>
```

### Cloudflare Analytics

如果使用 Cloudflare，自动提供免费的分析功能。

## 🔧 故障排除

### 图片无法访问

1. 检查文件路径是否正确
2. 确认文件已提交到仓库
3. 检查大小写敏感问题

### 404 错误

1. 确认文件存在于正确目录
2. 检查部署配置
3. 查看部署日志

### 性能优化

1. 启用 CDN 缓存
2. 压缩所有图片
3. 使用 WebP 格式
4. 配置浏览器缓存

## 📝 部署清单

- [ ] 图片已压缩
- [ ] 代码已提交
- [ ] 删除临时文件
- [ ] 更新 README 中的 URL
- [ ] 配置环境变量
- [ ] 测试所有功能
- [ ] 配置 HTTPS
- [ ] 设置监控
- [ ] 备份数据

---

如有问题，请查看 [Issues](https://github.com/your-username/ImgCDN/issues) 或提交新问题。

