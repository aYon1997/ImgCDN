# 贡献指南

感谢您对 ImgCDN 项目的关注！我们欢迎所有形式的贡献。

## 🤝 如何贡献

### 报告问题

如果您发现了 bug 或有功能建议：

1. 检查 [Issues](https://github.com/your-username/ImgCDN/issues) 中是否已有相关问题
2. 如果没有，创建一个新的 Issue
3. 清晰地描述问题或建议
4. 如果是 bug，请提供复现步骤

### 提交代码

1. **Fork 项目**
   ```bash
   # 点击 GitHub 上的 Fork 按钮
   ```

2. **克隆你的 Fork**
   ```bash
   git clone https://github.com/your-username/ImgCDN.git
   cd ImgCDN
   ```

3. **创建特性分支**
   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **进行修改**
   - 遵循项目的代码风格
   - 添加必要的注释
   - 更新相关文档

5. **提交更改**
   ```bash
   git add .
   git commit -m "feat: 添加某个很棒的功能"
   ```

6. **推送到 GitHub**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **创建 Pull Request**
   - 打开你的 Fork 仓库
   - 点击 "New Pull Request"
   - 填写 PR 描述

## 📝 提交信息规范

我们遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整（不影响功能）
- `refactor:` 重构代码
- `perf:` 性能优化
- `test:` 添加测试
- `chore:` 构建过程或辅助工具的变动

示例：
```
feat: 添加图片批量上传功能
fix: 修复图片压缩失败的问题
docs: 更新 README 中的安装说明
```

## 🎨 代码风格

- 使用 2 空格缩进
- 使用分号
- 使用单引号
- 文件末尾留空行
- 遵循 ESLint 规则

## 🧪 测试

在提交代码前，请确保：

- [ ] 代码可以正常运行
- [ ] 没有引入新的 bug
- [ ] 功能符合预期
- [ ] 更新了相关文档

## 📚 开发环境

1. **安装依赖**
   ```bash
   npm install
   ```

2. **启动开发服务器**
   ```bash
   npm run dev
   ```

3. **运行脚本测试**
   ```bash
   npm run compress  # 测试图片压缩
   npm run serve     # 测试服务器
   ```

## 🔍 代码审查

所有的 Pull Request 都会经过代码审查：

- 确保代码质量
- 检查是否符合项目规范
- 验证功能是否正常
- 提供改进建议

## 💡 建议的贡献方向

- 添加更多图片压缩方案支持
- 实现图片管理后台界面
- 支持更多 CDN 服务商
- 添加图片统计分析功能
- 改进文档和示例
- 修复现有问题

## 📧 联系方式

如有任何问题，可以通过以下方式联系：

- 提交 [Issue](https://github.com/your-username/ImgCDN/issues)
- 发送邮件到：your-email@example.com

## 📜 行为准则

- 尊重所有贡献者
- 保持友善和建设性的态度
- 欢迎不同的观点和经验
- 关注项目的最大利益

感谢您的贡献！ 🎉

