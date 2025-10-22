#!/usr/bin/env node

/**
 * 清理临时文件脚本
 */

const fs = require('fs').promises;
const path = require('path');

const TEMP_PATTERNS = [
  '**/*.tmp',
  '**/*.temp',
  '**/.DS_Store',
  '**/Thumbs.db',
  '**/*.bak',
  '**/*.backup'
];

async function cleanDirectory(dir) {
  let count = 0;
  
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        count += await cleanDirectory(fullPath);
      } else {
        // 检查是否是临时文件
        const ext = path.extname(entry.name);
        const name = entry.name;
        
        if (
          ['.tmp', '.temp', '.bak', '.backup'].includes(ext) ||
          name === '.DS_Store' ||
          name === 'Thumbs.db'
        ) {
          await fs.unlink(fullPath);
          console.log(`🗑️  删除: ${fullPath}`);
          count++;
        }
      }
    }
  } catch (error) {
    // 忽略无权访问的目录
  }
  
  return count;
}

async function main() {
  console.log('🧹 清理临时文件...\n');
  
  const rootDir = path.join(__dirname, '..');
  const count = await cleanDirectory(rootDir);
  
  if (count > 0) {
    console.log(`\n✨ 清理完成! 删除了 ${count} 个临时文件`);
  } else {
    console.log('\n✨ 没有找到需要清理的临时文件');
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error('错误:', error.message);
    process.exit(1);
  });
}

module.exports = { cleanDirectory, main };

