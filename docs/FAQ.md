# 常见问题解答 (FAQ)

## 📋 目录

- [通用问题](#通用问题)
- [图片压缩](#图片压缩)
- [部署相关](#部署相关)
- [API 使用](#api-使用)
- [故障排除](#故障排除)

## 通用问题

### Q: ImgCDN 是什么？

**A:** ImgCDN 是一个简单的图片 CDN 管理系统，帮助你：
- 管理和托管图片
- 压缩图片以节省空间
- 通过 URL 快速访问图片
- 部署到免费的静态托管平台

### Q: 完全免费吗？

**A:** 是的！你可以：
- 免费部署到 GitHub Pages、Vercel、Netlify
- 使用免费的 TinyPNG 压缩（每月 500 张）
- 获得全球 CDN 加速（取决于托管平台）

### Q: 需要什么技术背景？

**A:** 基础使用不需要编程知识：
- ✅ 会使用 Git 和 GitHub
- ✅ 能够上传文件
- ✅ 可以访问网站

高级功能需要：
- Node.js 基础（使用自动化脚本）
- 服务器管理（如果自己部署服务器）

### Q: 支持哪些图片格式？

**A:** 支持常见的图片格式：
- JPEG / JPG
- PNG
- GIF
- WebP

### Q: 有文件大小限制吗？

**A:** 
- TinyPNG 压缩：单张最大 5MB
- GitHub 仓库：单个文件建议不超过 100MB
- 建议每张图片压缩后小于 1MB

## 图片压缩

### Q: 为什么要压缩图片？

**A:** 压缩图片可以：
- 减少存储空间
- 加快网页加载速度
- 节省带宽流量
- 提升用户体验

平均可减小 50-70% 文件大小，同时保持视觉质量。

### Q: 压缩会损失画质吗？

**A:** TinyPNG 使用智能有损压缩技术，肉眼几乎看不出差异。对于大多数 Web 用途，压缩后的质量完全够用。

### Q: 如何获取 TinyPNG API Key？

**A:** 
1. 访问 [https://tinypng.com/developers](https://tinypng.com/developers)
2. 输入邮箱注册
3. 查收邮件获取 API Key
4. 免费额度：每月 500 张图片

### Q: 压缩脚本报错怎么办？

**A:** 常见错误：

1. **"未找到 API Key"**
   ```bash
   # 设置环境变量
   export TINYPNG_API_KEY=your_key
   ```

2. **"缺少依赖包"**
   ```bash
   npm install
   ```

3. **"超出配额"**
   - 检查是否超过每月 500 张限制
   - 等待下个月重置
   - 考虑升级付费计划

### Q: 可以压缩 SVG 吗？

**A:** TinyPNG 不支持 SVG。SVG 是矢量格式，本身文件就很小。可以使用 SVGO 等工具压缩 SVG。

### Q: 压缩后的图片可以再压缩吗？

**A:** 可以，但效果有限。已经压缩过的图片再次压缩，通常只能减小很少的空间，甚至可能增大文件。

## 部署相关

### Q: 推荐部署到哪个平台？

**A:** 根据需求选择：

| 平台 | 优点 | 缺点 | 推荐度 |
|------|------|------|--------|
| GitHub Pages | 完全免费、简单 | 国内访问慢 | ⭐⭐⭐⭐ |
| Vercel | 快速、全球CDN | 有访问限制 | ⭐⭐⭐⭐⭐ |
| Netlify | 功能丰富 | 免费额度有限 | ⭐⭐⭐⭐ |
| Cloudflare Pages | 超快CDN | 配置稍复杂 | ⭐⭐⭐⭐⭐ |

### Q: GitHub Pages 国内访问慢怎么办？

**A:** 解决方案：
1. 使用 Cloudflare CDN 加速
2. 部署到 Vercel 或 Netlify
3. 使用国内的 Gitee Pages（需要实名认证）
4. 自建服务器 + CDN

### Q: 如何绑定自定义域名？

**A:** 

**GitHub Pages:**
1. 在仓库根目录创建 `CNAME` 文件
2. 写入你的域名：`cdn.yourdomain.com`
3. 在域名 DNS 设置添加 CNAME 记录

**Vercel/Netlify:**
1. 在平台设置中添加自定义域名
2. 按照提示配置 DNS
3. 等待 SSL 证书自动配置

### Q: 部署后图片 404？

**A:** 检查：
1. 文件路径是否正确
2. 文件是否已提交到 Git
3. 文件名大小写是否匹配
4. 是否在 `.gitignore` 中被忽略

### Q: 如何更新已部署的图片？

**A:**
```bash
# 1. 添加新图片到 tinyPngImg/
cp new-image.jpg tinyPngImg/

# 2. 提交更改
git add tinyPngImg/new-image.jpg
git commit -m "Add new image"
git push

# 3. 等待自动部署（通常1-2分钟）
```

### Q: 可以部署私有图片吗？

**A:** 如果部署到公共平台（GitHub Pages 等），所有图片都是公开的。需要私有图片的话：
1. 使用私有服务器
2. 添加访问控制
3. 使用云存储的私有 Bucket

## API 使用

### Q: API 需要认证吗？

**A:** 默认不需要。如果需要保护 API：
1. 添加 API Key 验证
2. 使用 JWT Token
3. 配置 CORS 白名单
4. 添加 IP 限制

### Q: 如何在前端使用图片？

**A:** 

**HTML:**
```html
<img src="https://your-domain.com/tinyPngImg/image.jpg" alt="图片">
```

**CSS:**
```css
.bg { background-image: url('https://your-domain.com/tinyPngImg/bg.jpg'); }
```

**JavaScript:**
```javascript
const img = new Image();
img.src = 'https://your-domain.com/tinyPngImg/image.jpg';
```

**React:**
```jsx
<img src={`${process.env.CDN_URL}/tinyPngImg/image.jpg`} alt="图片" />
```

### Q: 支持跨域请求吗？

**A:** 是的，服务器已启用 CORS。可以从任何域名访问图片和 API。

### Q: 有访问频率限制吗？

**A:** 
- 本地服务器：无限制
- GitHub Pages：每月 100GB 流量
- Vercel：免费版每月 100GB
- Netlify：免费版每月 100GB

## 故障排除

### Q: 本地服务器无法启动？

**A:** 
```bash
# 1. 检查 Node.js 版本
node --version  # 需要 >= 14

# 2. 重新安装依赖
rm -rf node_modules
npm install

# 3. 检查端口占用
lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows

# 4. 使用其他端口
PORT=8080 npm start
```

### Q: 图片无法显示？

**A:** 排查步骤：
1. 检查图片 URL 是否正确
2. 在浏览器直接访问图片 URL
3. 检查文件确实存在
4. 查看浏览器控制台错误
5. 检查网络请求状态码

### Q: 压缩脚本卡住不动？

**A:** 可能原因：
1. 网络问题 - 检查网络连接
2. API Key 无效 - 验证 API Key
3. 文件过大 - 检查是否超过 5MB
4. 并发过多 - 等待当前任务完成

### Q: Git 提交太慢？

**A:** 
```bash
# 图片文件会让仓库变大，优化：

# 1. 不提交原图
echo "img/" >> .gitignore

# 2. 使用 Git LFS（大文件存储）
git lfs install
git lfs track "*.jpg" "*.png"

# 3. 定期清理历史
git gc --aggressive --prune=now
```

### Q: 如何回退到之前的版本？

**A:**
```bash
# 查看提交历史
git log --oneline

# 回退到指定提交
git checkout <commit-hash> -- tinyPngImg/

# 或者创建新分支
git checkout -b rollback <commit-hash>
```

## 性能优化

### Q: 如何加快图片加载速度？

**A:** 
1. **使用 CDN** - 部署到 Vercel/Cloudflare
2. **启用缓存** - 配置浏览器缓存头
3. **懒加载** - 使用 `loading="lazy"`
4. **响应式图片** - 使用 `srcset`
5. **WebP 格式** - 现代浏览器优先使用

### Q: 如何减少仓库大小？

**A:**
```bash
# 1. 只保留压缩图
git rm -r img/

# 2. 清理历史
git filter-branch --tree-filter 'rm -rf img' HEAD

# 3. 强制推送
git push origin --force --all
```

**注意：** 强制推送会改变历史，谨慎操作！

## 其他问题

### Q: 可以商用吗？

**A:** 可以。本项目采用 MIT 许可证，可以自由使用、修改和商用。

### Q: 如何贡献代码？

**A:** 
1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 发起 Pull Request

详见 [贡献指南](../CONTRIBUTING.md)

### Q: 哪里可以获取帮助？

**A:**
- 查看文档：[README](../README.md), [使用指南](./USAGE.md)
- 搜索 Issues：[GitHub Issues](https://github.com/your-username/ImgCDN/issues)
- 提交新问题：描述清楚问题和环境
- 邮件联系：your-email@example.com

---

没有找到你的问题？[提交 Issue](https://github.com/your-username/ImgCDN/issues/new)

