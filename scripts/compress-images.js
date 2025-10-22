#!/usr/bin/env node

/**
 * 批量图片压缩脚本
 * 使用 TinyPNG API 自动压缩 img/ 文件夹中的图片
 * 并将压缩后的图片保存到 tinyPngImg/ 文件夹
 */

const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

// 检查是否安装了可选依赖
let tinify, chalk, ora;
try {
  tinify = require('tinify');
  chalk = require('chalk');
  ora = require('ora');
} catch (error) {
  console.error('错误: 缺少必要的依赖包');
  console.error('请运行: npm install tinify chalk ora');
  process.exit(1);
}

// TinyPNG API Key (从环境变量或配置文件读取)
const API_KEY = process.env.TINYPNG_API_KEY;

if (!API_KEY) {
  console.error(chalk.red('❌ 错误: 未找到 TinyPNG API Key'));
  console.log(chalk.yellow('\n请设置环境变量:'));
  console.log(chalk.cyan('  export TINYPNG_API_KEY=your_api_key'));
  console.log(chalk.yellow('\n或在项目根目录创建 .env 文件:'));
  console.log(chalk.cyan('  TINYPNG_API_KEY=your_api_key'));
  console.log(chalk.yellow('\n获取 API Key: https://tinypng.com/developers'));
  process.exit(1);
}

tinify.key = API_KEY;

// 配置
const CONFIG = {
  sourceDir: path.join(__dirname, '../img'),
  targetDir: path.join(__dirname, '../tinyPngImg'),
  supportedFormats: ['.jpg', '.jpeg', '.png', '.webp'],
  skipExisting: true // 是否跳过已存在的文件
};

// 格式化文件大小
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// 压缩单个文件
async function compressFile(filename) {
  const sourcePath = path.join(CONFIG.sourceDir, filename);
  const targetPath = path.join(CONFIG.targetDir, filename);
  
  try {
    // 检查目标文件是否已存在
    if (CONFIG.skipExisting) {
      try {
        await fs.access(targetPath);
        return { status: 'skipped', filename };
      } catch (e) {
        // 文件不存在，继续压缩
      }
    }
    
    // 获取原始文件大小
    const stats = await fs.stat(sourcePath);
    const originalSize = stats.size;
    
    // 压缩图片
    const source = tinify.fromFile(sourcePath);
    await source.toFile(targetPath);
    
    // 获取压缩后的文件大小
    const compressedStats = await fs.stat(targetPath);
    const compressedSize = compressedStats.size;
    const savedSize = originalSize - compressedSize;
    const savedPercent = ((savedSize / originalSize) * 100).toFixed(2);
    
    return {
      status: 'success',
      filename,
      originalSize,
      compressedSize,
      savedSize,
      savedPercent
    };
  } catch (error) {
    return {
      status: 'error',
      filename,
      error: error.message
    };
  }
}

// 主函数
async function main() {
  console.log(chalk.bold.blue('\n🖼️  ImgCDN 批量图片压缩工具\n'));
  
  const spinner = ora('正在扫描图片文件...').start();
  
  try {
    // 确保目标目录存在
    await fs.mkdir(CONFIG.targetDir, { recursive: true });
    
    // 读取源目录中的所有文件
    const files = await fs.readdir(CONFIG.sourceDir);
    
    // 过滤出支持的图片格式
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return CONFIG.supportedFormats.includes(ext);
    });
    
    if (imageFiles.length === 0) {
      spinner.fail(chalk.yellow('未找到需要压缩的图片文件'));
      return;
    }
    
    spinner.succeed(chalk.green(`找到 ${imageFiles.length} 个图片文件`));
    
    // 统计信息
    const stats = {
      total: imageFiles.length,
      success: 0,
      skipped: 0,
      failed: 0,
      totalOriginalSize: 0,
      totalCompressedSize: 0
    };
    
    // 逐个压缩文件
    for (let i = 0; i < imageFiles.length; i++) {
      const filename = imageFiles[i];
      const progress = `[${i + 1}/${imageFiles.length}]`;
      
      const fileSpinner = ora(`${progress} 压缩: ${filename}`).start();
      
      const result = await compressFile(filename);
      
      if (result.status === 'success') {
        stats.success++;
        stats.totalOriginalSize += result.originalSize;
        stats.totalCompressedSize += result.compressedSize;
        
        fileSpinner.succeed(
          chalk.green(`${progress} ${filename}`) +
          chalk.gray(` | 原始: ${formatBytes(result.originalSize)}`) +
          chalk.gray(` → 压缩: ${formatBytes(result.compressedSize)}`) +
          chalk.cyan(` | 节省: ${result.savedPercent}%`)
        );
      } else if (result.status === 'skipped') {
        stats.skipped++;
        fileSpinner.info(chalk.yellow(`${progress} ${filename} (已跳过)`));
      } else {
        stats.failed++;
        fileSpinner.fail(chalk.red(`${progress} ${filename} - 错误: ${result.error}`));
      }
    }
    
    // 显示汇总信息
    console.log(chalk.bold.blue('\n📊 压缩统计\n'));
    console.log(chalk.white(`  总文件数: ${stats.total}`));
    console.log(chalk.green(`  ✓ 成功: ${stats.success}`));
    if (stats.skipped > 0) {
      console.log(chalk.yellow(`  ⊘ 跳过: ${stats.skipped}`));
    }
    if (stats.failed > 0) {
      console.log(chalk.red(`  ✗ 失败: ${stats.failed}`));
    }
    
    if (stats.success > 0) {
      const totalSaved = stats.totalOriginalSize - stats.totalCompressedSize;
      const totalPercent = ((totalSaved / stats.totalOriginalSize) * 100).toFixed(2);
      
      console.log(chalk.white(`\n  原始总大小: ${formatBytes(stats.totalOriginalSize)}`));
      console.log(chalk.white(`  压缩总大小: ${formatBytes(stats.totalCompressedSize)}`));
      console.log(chalk.cyan(`  节省空间: ${formatBytes(totalSaved)} (${totalPercent}%)`));
    }
    
    console.log(chalk.green('\n✨ 压缩完成!\n'));
    
    // 显示剩余压缩次数
    const compressionCount = tinify.compressionCount;
    if (compressionCount) {
      console.log(chalk.gray(`本月已使用 ${compressionCount}/500 次压缩配额\n`));
    }
    
  } catch (error) {
    spinner.fail(chalk.red('压缩过程出错'));
    console.error(chalk.red('\n错误详情:'), error.message);
    process.exit(1);
  }
}

// 运行脚本
if (require.main === module) {
  main().catch(error => {
    console.error(chalk.red('未处理的错误:'), error);
    process.exit(1);
  });
}

module.exports = { compressFile, main };

