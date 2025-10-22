const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 8080;

// 静态文件服务
app.use(express.static(__dirname + '/..'));

// 图片预览页面
app.get('/preview', async (req, res) => {
  try {
    const imgDir = path.join(__dirname, '../tinyPngImg');
    const files = await fs.readdir(imgDir);
    const images = files.filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f));
    
    const html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>图片预览 - ImgCDN</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, sans-serif;
            background: #f5f5f5;
            padding: 20px;
        }
        .header {
            background: white;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 { color: #333; }
        .stats {
            margin-top: 10px;
            color: #666;
            font-size: 14px;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
        }
        .card {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transition: transform 0.3s;
        }
        .card:hover { transform: translateY(-5px); }
        .card img {
            width: 100%;
            height: 250px;
            object-fit: cover;
        }
        .card-body {
            padding: 15px;
        }
        .filename {
            font-weight: 600;
            color: #333;
            margin-bottom: 10px;
            word-break: break-all;
        }
        .url-box {
            background: #f5f5f5;
            padding: 10px;
            border-radius: 5px;
            font-size: 12px;
            color: #666;
            word-break: break-all;
            cursor: pointer;
            user-select: all;
        }
        .url-box:hover { background: #e9e9e9; }
    </style>
</head>
<body>
    <div class="header">
        <h1>📸 图片预览</h1>
        <div class="stats">共 ${images.length} 张图片</div>
    </div>
    <div class="grid">
        ${images.map(img => `
            <div class="card">
                <img src="/tinyPngImg/${img}" alt="${img}" loading="lazy">
                <div class="card-body">
                    <div class="filename">${img}</div>
                    <div class="url-box" onclick="copyURL(this)" title="点击复制">
                        ${req.protocol}://${req.get('host')}/tinyPngImg/${img}
                    </div>
                </div>
            </div>
        `).join('')}
    </div>
    <script>
        function copyURL(el) {
            const text = el.textContent.trim();
            navigator.clipboard.writeText(text).then(() => {
                const original = el.textContent;
                el.textContent = '✓ 已复制!';
                el.style.background = '#d4edda';
                setTimeout(() => {
                    el.textContent = original;
                    el.style.background = '';
                }, 1000);
            });
        }
    </script>
</body>
</html>
    `;
    
    res.send(html);
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`\n📸 预览服务器启动成功!`);
  console.log(`\n访问: http://localhost:${PORT}/preview\n`);
});

