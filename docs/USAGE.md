# 使用指南

本文档详细介绍 ImgCDN 的各种使用方法。

## 📖 目录

- [快速开始](#快速开始)
- [图片管理](#图片管理)
- [本地开发](#本地开发)
- [图片压缩](#图片压缩)
- [API 使用](#api-使用)
- [最佳实践](#最佳实践)

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/your-username/ImgCDN.git
cd ImgCDN
```

### 2. 添加图片

将你的图片放入 `img/` 文件夹。

### 3. 压缩图片

访问 [TinyPNG](https://tinypng.com/)，上传图片进行压缩，然后下载到 `tinyPngImg/` 文件夹。

或者使用自动化脚本（需要 API Key）：

```bash
npm install
npm run compress
```

### 4. 部署

提交代码到 GitHub 并部署到 GitHub Pages 或其他平台。

## 🖼️ 图片管理

### 目录结构

```
ImgCDN/
├── img/           # 原始图片（可选保留）
└── tinyPngImg/    # 压缩后的图片（用于CDN）
```

### 添加新图片

1. **方式一：手动压缩**

   ```bash
   # 1. 添加图片到 img/ 目录
   cp your-image.jpg img/
   
   # 2. 访问 TinyPNG 压缩
   # https://tinypng.com/
   
   # 3. 下载压缩后的图片到 tinyPngImg/
   ```

2. **方式二：自动压缩**

   ```bash
   # 配置 TinyPNG API Key
   export TINYPNG_API_KEY=your_api_key
   
   # 运行压缩脚本
   npm run compress
   ```

### 图片命名规范

建议使用有意义的英文名称：

- ✅ 好的命名：`hero-banner.jpg`, `product-001.png`, `avatar-john.jpg`
- ❌ 不好的命名：`1.jpg`, `图片.png`, `IMG_20230101.jpg`

命名规则：
- 使用小写字母
- 使用连字符 `-` 分隔单词
- 避免空格和特殊字符
- 包含描述性信息

### 图片格式选择

| 格式 | 适用场景 | 优点 | 缺点 |
|------|---------|------|------|
| JPEG | 照片、复杂图像 | 文件小、广泛支持 | 不支持透明 |
| PNG | Logo、图标、需要透明 | 支持透明、无损压缩 | 文件较大 |
| WebP | 现代浏览器 | 更小的文件、支持透明 | 兼容性一般 |
| GIF | 简单动画 | 支持动画 | 颜色有限 |

## 💻 本地开发

### 启动开发服务器

```bash
# 安装依赖
npm install

# 启动服务器
npm run serve
```

访问 `http://localhost:3000`

### 开发服务器功能

1. **静态文件服务**
   - 访问图片：`http://localhost:3000/tinyPngImg/example.jpg`
   - 查看主页：`http://localhost:3000/`

2. **图片库页面**
   ```
   http://localhost:3000/gallery
   ```

3. **API 接口**
   ```
   http://localhost:3000/api/images
   http://localhost:3000/api/images/info/example.jpg
   ```

### 热重载开发

```bash
# 使用 nodemon 自动重启
npm run dev
```

## 🗜️ 图片压缩

### 使用 TinyPNG 网站

1. 访问 [https://tinypng.com/](https://tinypng.com/)
2. 拖拽图片或点击上传
3. 等待压缩完成
4. 下载压缩后的图片
5. 放入 `tinyPngImg/` 目录

**限制：**
- 单次最多 20 张图片
- 每张图片最大 5MB
- 每月免费 500 张

### 使用压缩脚本

1. **获取 API Key**

   访问 [TinyPNG Developers](https://tinypng.com/developers)，注册并获取 API Key。

2. **配置 API Key**

   ```bash
   # 方式一：环境变量
   export TINYPNG_API_KEY=your_api_key
   
   # 方式二：创建 .env 文件
   echo "TINYPNG_API_KEY=your_api_key" > .env
   ```

3. **运行压缩脚本**

   ```bash
   npm run compress
   ```

4. **脚本功能**

   - ✅ 自动扫描 `img/` 目录
   - ✅ 批量压缩图片
   - ✅ 跳过已压缩的图片
   - ✅ 显示压缩统计信息
   - ✅ 实时进度显示

### 压缩效果对比

```bash
# 查看图片信息
curl http://localhost:3000/api/images/info/example.jpg
```

返回示例：
```json
{
  "original": "1.5 MB",
  "compressed": "450 KB",
  "saved": "70%"
}
```

## 🔌 API 使用

### 获取图片列表

```javascript
fetch('http://localhost:3000/api/images')
  .then(res => res.json())
  .then(data => {
    console.log(data.images);
  });
```

### 在网页中使用图片

```html
<img src="https://your-domain.com/tinyPngImg/example.jpg" alt="示例图片">
```

### 在 CSS 中使用

```css
.hero {
  background-image: url('https://your-domain.com/tinyPngImg/hero.jpg');
}
```

### 在 Markdown 中使用

```markdown
![图片描述](https://your-domain.com/tinyPngImg/example.jpg)
```

## 🎯 最佳实践

### 1. 图片优化

- **压缩所有图片**：上传前务必压缩
- **选择合适格式**：JPEG 用于照片，PNG 用于透明图
- **适当尺寸**：不要上传过大的图片
- **使用 WebP**：现代浏览器优先使用 WebP

### 2. 命名和组织

```
tinyPngImg/
├── icons/           # 图标
│   ├── facebook.png
│   └── twitter.png
├── products/        # 产品图片
│   ├── product-001.jpg
│   └── product-002.jpg
└── banners/         # 横幅图片
    └── hero-banner.jpg
```

### 3. 性能优化

#### 响应式图片

```html
<img 
  src="image-800.jpg" 
  srcset="image-400.jpg 400w, image-800.jpg 800w, image-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
  alt="响应式图片">
```

#### 懒加载

```html
<img src="image.jpg" loading="lazy" alt="懒加载图片">
```

#### 使用 CDN

部署到支持 CDN 的平台：
- GitHub Pages + Cloudflare
- Vercel
- Netlify

### 4. 版本控制

```bash
# 不要提交原始大图片
echo "img/" >> .gitignore

# 只提交压缩后的图片
git add tinyPngImg/
git commit -m "Add compressed images"
```

### 5. 备份策略

定期备份重要图片：

```bash
# 备份到另一个分支
git checkout -b backup
git add img/
git commit -m "Backup original images"
git push origin backup
```

## 🔧 常见问题

### Q: 图片无法访问？

**A:** 检查：
1. 文件路径是否正确
2. 文件名大小写
3. 是否已提交到仓库
4. 是否已部署

### Q: 压缩后图片模糊？

**A:** TinyPNG 是无损压缩，不会导致明显模糊。如果觉得模糊：
1. 检查原图质量
2. 确认使用正确格式
3. 考虑使用更高分辨率

### Q: 如何删除图片？

**A:** 
```bash
# 删除文件
rm tinyPngImg/unwanted.jpg

# 提交更改
git add .
git commit -m "Remove unwanted image"
git push
```

### Q: 如何批量重命名？

**A:**
```bash
# 使用脚本批量重命名
for file in img/*.jpg; do
  mv "$file" "${file//old/new}"
done
```

## 📊 监控和统计

### 查看存储使用

```bash
# 查看目录大小
du -sh img/ tinyPngImg/

# 统计文件数量
ls -1 img/ | wc -l
ls -1 tinyPngImg/ | wc -l
```

### API 访问统计

如果部署到支持分析的平台，可以查看：
- 图片访问次数
- 流量使用情况
- 热门图片排行

## 🔗 相关资源

- [TinyPNG 官网](https://tinypng.com/)
- [图片格式对比](https://developers.google.com/speed/webp/docs/webp_study)
- [Web 性能优化](https://web.dev/fast/)

---

如有其他问题，请查看 [API 文档](./API.md) 或提交 [Issue](https://github.com/your-username/ImgCDN/issues)。

