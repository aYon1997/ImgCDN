const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 静态文件服务
app.use('/img', express.static(path.join(__dirname, '../img')));
app.use('/tinyPngImg', express.static(path.join(__dirname, '../tinyPngImg')));
app.use('/CDN-server', express.static(path.join(__dirname, '../CDN-server')));

// 首页
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// API: 获取所有图片列表
app.get('/api/images', async (req, res) => {
  try {
    const imgDir = path.join(__dirname, '../tinyPngImg');
    const files = await fs.readdir(imgDir);
    
    const images = files
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map(file => ({
        name: file,
        url: `/tinyPngImg/${file}`,
        thumbnail: `/tinyPngImg/${file}`
      }));
    
    res.json({
      success: true,
      count: images.length,
      images
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// API: 获取原图列表
app.get('/api/images/original', async (req, res) => {
  try {
    const imgDir = path.join(__dirname, '../img');
    const files = await fs.readdir(imgDir);
    
    const images = files
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map(file => ({
        name: file,
        url: `/img/${file}`,
        thumbnail: `/img/${file}`
      }));
    
    res.json({
      success: true,
      count: images.length,
      images
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// API: 获取图片信息
app.get('/api/images/info/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const originalPath = path.join(__dirname, '../img', filename);
    const compressedPath = path.join(__dirname, '../tinyPngImg', filename);
    
    const info = {
      filename,
      exists: false,
      original: null,
      compressed: null
    };
    
    try {
      const originalStats = await fs.stat(originalPath);
      info.original = {
        size: originalStats.size,
        sizeFormatted: formatBytes(originalStats.size),
        modified: originalStats.mtime
      };
      info.exists = true;
    } catch (e) {
      // 原图不存在
    }
    
    try {
      const compressedStats = await fs.stat(compressedPath);
      info.compressed = {
        size: compressedStats.size,
        sizeFormatted: formatBytes(compressedStats.size),
        modified: compressedStats.mtime
      };
      info.exists = true;
      
      if (info.original) {
        info.compressionRatio = ((1 - compressedStats.size / originalStats.size) * 100).toFixed(2) + '%';
        info.savedSize = formatBytes(originalStats.size - compressedStats.size);
      }
    } catch (e) {
      // 压缩图不存在
    }
    
    if (!info.exists) {
      return res.status(404).json({
        success: false,
        error: '图片不存在'
      });
    }
    
    res.json({
      success: true,
      info
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 图片库页面
app.get('/gallery', (req, res) => {
  res.send(generateGalleryHTML());
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════╗
║                                           ║
║   🖼️  ImgCDN 图片服务器已启动            ║
║                                           ║
║   🌐 本地访问: http://localhost:${PORT}     ║
║   📁 图片目录: /img 和 /tinyPngImg        ║
║   📚 API文档: http://localhost:${PORT}/api  ║
║   🖼️  图片库: http://localhost:${PORT}/gallery║
║                                           ║
╚═══════════════════════════════════════════╝
  `);
});

// 工具函数：格式化字节大小
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// 生成图片库HTML
function generateGalleryHTML() {
  return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>图片库 - ImgCDN</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #f5f5f5;
            padding: 20px;
        }
        .container {
            max-width: 1400px;
            margin: 0 auto;
        }
        header {
            background: white;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            margin-bottom: 10px;
        }
        .tabs {
            display: flex;
            gap: 10px;
            margin-top: 20px;
        }
        .tab {
            padding: 10px 20px;
            background: #f0f0f0;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s;
        }
        .tab.active {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
        }
        .image-card {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transition: transform 0.3s;
        }
        .image-card:hover {
            transform: translateY(-5px);
        }
        .image-card img {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }
        .image-info {
            padding: 15px;
        }
        .image-name {
            font-weight: 600;
            color: #333;
            margin-bottom: 5px;
            font-size: 14px;
            word-break: break-all;
        }
        .image-url {
            font-size: 12px;
            color: #666;
            background: #f5f5f5;
            padding: 5px 10px;
            border-radius: 5px;
            word-break: break-all;
            cursor: pointer;
        }
        .loading {
            text-align: center;
            padding: 50px;
            color: #666;
        }
        .error {
            background: #fee;
            color: #c33;
            padding: 20px;
            border-radius: 10px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🖼️ ImgCDN 图片库</h1>
            <p>浏览和管理您的图片资源</p>
            <div class="tabs">
                <button class="tab active" onclick="loadImages('compressed')">压缩图片</button>
                <button class="tab" onclick="loadImages('original')">原始图片</button>
            </div>
        </header>
        <div id="gallery" class="gallery">
            <div class="loading">加载中...</div>
        </div>
    </div>
    
    <script>
        let currentType = 'compressed';
        
        async function loadImages(type) {
            currentType = type;
            const gallery = document.getElementById('gallery');
            gallery.innerHTML = '<div class="loading">加载中...</div>';
            
            // 更新标签状态
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
            event.target.classList.add('active');
            
            try {
                const endpoint = type === 'original' ? '/api/images/original' : '/api/images';
                const response = await fetch(endpoint);
                const data = await response.json();
                
                if (data.success && data.images.length > 0) {
                    gallery.innerHTML = data.images.map(img => \`
                        <div class="image-card">
                            <img src="\${img.url}" alt="\${img.name}" loading="lazy">
                            <div class="image-info">
                                <div class="image-name">\${img.name}</div>
                                <div class="image-url" onclick="copyToClipboard('\${window.location.origin}\${img.url}')" title="点击复制URL">
                                    \${window.location.origin}\${img.url}
                                </div>
                            </div>
                        </div>
                    \`).join('');
                } else {
                    gallery.innerHTML = '<div class="loading">暂无图片</div>';
                }
            } catch (error) {
                gallery.innerHTML = \`<div class="error">加载失败: \${error.message}</div>\`;
            }
        }
        
        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                alert('URL已复制到剪贴板');
            });
        }
        
        // 初始加载
        window.addEventListener('DOMContentLoaded', () => {
            loadImages('compressed');
        });
    </script>
</body>
</html>
  `;
}

module.exports = app;

