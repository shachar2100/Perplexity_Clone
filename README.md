# Perplexity Clone

A complete AI-powered search engine that mimics Perplexity's interface and functionality, built with Node.js backend and React frontend.

## 🚀 Features

### Backend (Node.js + Express)
- 🔍 **Web Search Integration** - Uses SerpAPI for Google search results
- 🤖 **AI-Powered Answers** - OpenAI GPT-3.5-turbo for intelligent responses
- 📄 **Article Parsing** - Extracts content from web articles
- 📚 **Source Attribution** - Links answers to original sources
- 💾 **Query History** - Saves all queries with timestamps
- 🖼️ **Image Extraction** - Collects relevant images from articles

### Frontend (React)
- 🎨 **Perplexity-like Design** - Dark theme with modern UI
- 🔍 **Smart Search** - Auto-expanding textarea with Enter to submit
- 🖼️ **Image Display** - Shows related images from search results
- 📝 **Source Attribution** - Clickable source links in answers
- 🔗 **Source List** - Complete list of sources with external links
- ❓ **Follow-up Questions** - Ask additional questions after getting results
- ⏳ **Loading States** - Beautiful loading spinner during API calls


## 📁 Project Structure

```
Perplexity_Clone/
├── backend/                 # Node.js backend
│   ├── index.js            # Main server file
│   ├── articleParser.js    # Article content extraction
│   ├── queryHistory.js     # Query history management
│   ├── package.json        # Backend dependencies
│   └── query_history/      # Saved queries (auto-created)
├── frontend/               # React frontend
│   ├── src/
│   │   ├── App.js          # Main app component
│   │   ├── components/     # React components
│   │   │   ├── SearchBar.js
│   │   │   ├── SearchResults.js
│   │   │   └── LoadingSpinner.js
│   │   └── ...
│   └── package.json        # Frontend dependencies
├── start-app.sh            # Quick start script
└── README.md               # This file
```

## 🛠️ Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key
- SerpAPI key

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Perplexity_Clone
   ```

2. **Set up environment variables:**
   ```bash
   # Create .env file in backend directory
   cd backend
   cp env.example .env
   # Edit .env with your API keys
   ```

3. **Run the application:**
   ```bash
   # Option 1: Use the startup script
   ./start-app.sh
   
   # Option 2: Manual start
   # Terminal 1 - Backend
   cd backend
   npm install
   npm start
   
   # Terminal 2 - Frontend
   cd frontend
   npm install
   npm start
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3000/api

## 🔧 Configuration

### Environment Variables (backend/.env)
```env
OPENAI_API_KEY=your_openai_api_key_here
SERPAPI_API_KEY=your_serpapi_key_here
FLASK_ENV=development
PORT=3000
```

### API Endpoints

#### Search
- `GET /query?question=your_question` - Search for answers
- Returns: `{ answer, images, sources, timestamp, message }`

#### History
- `GET /history` - Get all query history
- `GET /history/:timestamp` - Get specific query
- `DELETE /history/:timestamp` - Delete query

## 🎯 Usage

1. **Search**: Type your question in the search bar
2. **View Results**: 
   - Images appear at the top (if available)
   - AI-generated answer with clickable source citations
   - Complete list of sources at the bottom
3. **Follow-up**: Ask additional questions using the follow-up input box

## 🎨 UI Features

### Search Interface
- Auto-expanding textarea
- Enter to submit (Shift+Enter for new line)
- Loading states with animated spinner
- Error handling with user-friendly messages

### Results Display
- **Images Section**: Grid layout with hover effects
- **Answer Section**: Formatted text with clickable source links
- **Sources Section**: Numbered list with external links
- **Follow-up Section**: Additional search input

### Responsive Design
- Mobile-first approach
- Adaptive grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🔍 How It Works

1. **User Input**: Question entered in search bar
2. **Web Search**: SerpAPI searches Google for relevant results
3. **Content Extraction**: Article parser extracts text from top results
4. **AI Processing**: OpenAI generates answer based on extracted content
5. **Source Attribution**: Answer includes citations to original sources
6. **History Storage**: Query and results saved with timestamp
7. **Display**: Frontend shows formatted results with images and sources

## 🚀 Deployment

### Backend Deployment
```bash
cd backend
npm install
npm start
```

### Frontend Deployment
```bash
cd frontend
npm install
npm run build
# Serve the build folder
```

### Production Considerations
- Set up proper environment variables
- Use HTTPS in production
- Configure CORS for your domain
- Set up monitoring and logging
- Consider using a CDN for static assets

## 🛠️ Development

### Backend Development
```bash
cd backend
npm install
npm start
```

### Frontend Development
```bash
cd frontend
npm install
npm start
```

### Testing
```bash
# Backend tests
cd backend
node test_history.js

# Frontend tests
cd frontend
npm test
```

## 📝 API Response Format

```json
{
  "answer": "AI-generated answer with [Source 1] citations...",
  "images": ["image_url1", "image_url2"],
  "sources": ["source_url1", "source_url2", "source_url3"],
  "timestamp": "2024-01-15T10:30:45.123Z",
  "message": "Query saved to history"
}
```



