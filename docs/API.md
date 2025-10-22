# API 文档

ImgCDN 提供简单的 REST API 用于图片管理和访问。

## 基础信息

- **Base URL**: `http://localhost:3000`
- **Content-Type**: `application/json`

## API 端点

### 1. 获取压缩图片列表

获取所有压缩后的图片列表。

**请求**

```
GET /api/images
```

**响应**

```json
{
  "success": true,
  "count": 10,
  "images": [
    {
      "name": "example.jpg",
      "url": "/tinyPngImg/example.jpg",
      "thumbnail": "/tinyPngImg/example.jpg"
    }
  ]
}
```

### 2. 获取原始图片列表

获取所有原始图片列表。

**请求**

```
GET /api/images/original
```

**响应**

```json
{
  "success": true,
  "count": 10,
  "images": [
    {
      "name": "example.jpg",
      "url": "/img/example.jpg",
      "thumbnail": "/img/example.jpg"
    }
  ]
}
```

### 3. 获取图片详细信息

获取指定图片的详细信息，包括原图和压缩图的对比数据。

**请求**

```
GET /api/images/info/:filename
```

**参数**

- `filename` (string): 图片文件名

**示例**

```
GET /api/images/info/example.jpg
```

**响应**

```json
{
  "success": true,
  "info": {
    "filename": "example.jpg",
    "exists": true,
    "original": {
      "size": 1048576,
      "sizeFormatted": "1.00 MB",
      "modified": "2023-10-22T10:30:00.000Z"
    },
    "compressed": {
      "size": 524288,
      "sizeFormatted": "512.00 KB",
      "modified": "2023-10-22T10:35:00.000Z"
    },
    "compressionRatio": "50.00%",
    "savedSize": "512.00 KB"
  }
}
```

**错误响应**

```json
{
  "success": false,
  "error": "图片不存在"
}
```

## 静态文件访问

### 原始图片

```
GET /img/{filename}
```

示例：`http://localhost:3000/img/example.jpg`

### 压缩图片

```
GET /tinyPngImg/{filename}
```

示例：`http://localhost:3000/tinyPngImg/example.jpg`

## Web 页面

### 首页

```
GET /
```

展示图片管理系统主页。

### 图片库

```
GET /gallery
```

展示所有图片的可视化图库界面。

## 错误处理

所有 API 错误都会返回以下格式：

```json
{
  "success": false,
  "error": "错误描述信息"
}
```

### HTTP 状态码

- `200`: 成功
- `404`: 资源不存在
- `500`: 服务器错误

## 使用示例

### JavaScript (Fetch)

```javascript
// 获取图片列表
fetch('http://localhost:3000/api/images')
  .then(response => response.json())
  .then(data => {
    console.log(data.images);
  });

// 获取图片信息
fetch('http://localhost:3000/api/images/info/example.jpg')
  .then(response => response.json())
  .then(data => {
    console.log(data.info);
  });
```

### cURL

```bash
# 获取图片列表
curl http://localhost:3000/api/images

# 获取图片信息
curl http://localhost:3000/api/images/info/example.jpg

# 下载图片
curl -O http://localhost:3000/tinyPngImg/example.jpg
```

### Python

```python
import requests

# 获取图片列表
response = requests.get('http://localhost:3000/api/images')
data = response.json()
print(data['images'])

# 获取图片信息
response = requests.get('http://localhost:3000/api/images/info/example.jpg')
info = response.json()
print(info['info'])
```

## CORS

服务器已启用 CORS，支持跨域请求。

## 限流

目前没有 API 限流限制，但建议合理使用。

## 更新日志

### v1.0.0 (2023-10-22)

- 初始版本
- 基础的图片列表和信息查询 API
- 静态文件服务

---

如有问题或建议，请提交 [Issue](https://github.com/your-username/ImgCDN/issues)。

