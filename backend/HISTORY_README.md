# Query History System

This system automatically saves all queries with their answers, sources, and images to a local file system for later retrieval and display.

## 🗂️ File Structure

```
backend/
├── query_history/                    # Main history directory
│   ├── 2024-01-15T10-30-45-123Z/    # Query timestamp directory
│   │   ├── query_data.json          # Query data (question, answer, sources)
│   │   └── images/                  # Downloaded images
│   │       ├── image_1.jpg
│   │       ├── image_2.png
│   │       └── image_3.gif
│   └── 2024-01-15T11-15-22-456Z/    # Another query
│       ├── query_data.json
│       └── images/
└── ...
```

## 📊 Query Data Structure

Each `query_data.json` contains:

```json
{
  "timestamp": "2024-01-15T10:30:45.123Z",
  "question": "What is artificial intelligence?",
  "answer": "Artificial intelligence (AI) is a branch of computer science... [Source 1]",
  "sources": [
    "https://example.com/article1",
    "https://example.com/article2",
    "https://example.com/article3"
  ],
  "images": {
    "urls": [
      "https://example.com/image1.jpg",
      "https://example.com/image2.png"
    ],
    "local": [
      "image_1.jpg",
      "image_2.png"
    ]
  }
}
```

## 🚀 API Endpoints

### 1. Make a Query (Auto-saves to history)
```bash
GET /query?question=Your question here
```

**Response:**
```json
{
  "answer": "AI-generated answer with sources...",
  "images": ["url1", "url2"],
  "sources": ["source1", "source2"],
  "timestamp": "2024-01-15T10-30-45-123Z",
  "message": "Query saved to history"
}
```

### 2. Get All Query History
```bash
GET /history
```

**Response:**
```json
{
  "queries": [
    {
      "timestamp": "2024-01-15T10-30-45-123Z",
      "question": "What is AI?",
      "answer": "...",
      "sources": [...],
      "images": {...}
    }
  ]
}
```

### 3. Get Specific Query
```bash
GET /history/{timestamp}
```

### 4. Get Images for Query
```bash
GET /history/{timestamp}/images
```

**Response:**
```json
{
  "timestamp": "2024-01-15T10-30-45-123Z",
  "images": ["image_1.jpg", "image_2.png"],
  "imageUrls": [
    "/history/images/2024-01-15T10-30-45-123Z/images/image_1.jpg",
    "/history/images/2024-01-15T10-30-45-123Z/images/image_2.png"
  ]
}
```

### 5. Delete Query
```bash
DELETE /history/{timestamp}
```

## 🖼️ Image Handling

### Two Approaches:

#### **Option 1: Download Images (Current Implementation)**
- ✅ **Pros**: Images are always available, even if original URLs break
- ❌ **Cons**: Uses more storage space, slower initial response

#### **Option 2: Use URLs Only (Alternative)**
If you prefer to use URLs instead of downloading:

```javascript
// In queryHistory.js, modify saveQuery method:
async saveQuery(question, answer, images, sources) {
  // ... existing code ...
  
  // Skip image downloading
  queryData.images.local = images; // Just use URLs
  
  // Save without downloading
  await fs.writeFile(
    path.join(queryDir, 'query_data.json'),
    JSON.stringify(queryData, null, 2)
  );
}
```

## 🎯 Usage Examples

### Test the System
```bash
cd backend
node test_history.js
```

### Make a Query via curl
```bash
curl "http://localhost:3000/query?question=What%20is%20machine%20learning?"
```

### Get History via curl
```bash
curl http://localhost:3000/history
```

### Get Specific Query
```bash
curl http://localhost:3000/history/2024-01-15T10-30-45-123Z
```

## 🖥️ Displaying Images

### Option 1: Direct File Access
Images are served statically at:
```
http://localhost:3000/history/images/{timestamp}/images/{filename}
```

### Option 2: Frontend Integration
```html
<!-- In your frontend -->
<img src="http://localhost:3000/history/images/2024-01-15T10-30-45-123Z/images/image_1.jpg" />
```

### Option 3: Base64 Encoding (Alternative)
If you want to embed images directly in JSON:

```javascript
// In queryHistory.js, add base64 conversion
const imageBuffer = await fs.readFile(imagePath);
const base64Image = imageBuffer.toString('base64');
const mimeType = 'image/jpeg'; // or detect from file
const dataUrl = `data:${mimeType};base64,${base64Image}`;
```

## 🔧 Configuration Options

### Customize Image Download
```javascript
// In queryHistory.js
async downloadImages(imageUrls, queryDir) {
  // Add image size limits
  const maxImageSize = 5 * 1024 * 1024; // 5MB
  
  // Add image format filtering
  const allowedFormats = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  
  // Add retry logic
  const maxRetries = 3;
}
```

### Customize Storage Location
```javascript
// In queryHistory.js constructor
constructor() {
  this.historyDir = path.join(__dirname, 'custom_history_path');
  this.imagesDir = path.join(this.historyDir, 'custom_images_path');
}
```

## 🚨 Error Handling

The system handles:
- ✅ Network errors during image download
- ✅ Invalid image URLs
- ✅ File system errors
- ✅ Missing directories
- ✅ Corrupted JSON files

## 📈 Performance Considerations

- **Image Downloads**: Can slow down initial response
- **Storage**: Each query can use 1-10MB depending on images
- **Memory**: Large history can impact performance
- **Cleanup**: Consider implementing automatic cleanup for old queries

## 🧹 Cleanup Script

```javascript
// Add to queryHistory.js
async cleanupOldQueries(daysOld = 30) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysOld);
  
  const queries = await this.getAllQueries();
  for (const query of queries) {
    if (new Date(query.timestamp) < cutoffDate) {
      await this.deleteQuery(query.timestamp);
    }
  }
}
```

This system gives you a complete query history with persistent storage and image management! 