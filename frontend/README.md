# Perplexity Clone Frontend

A React-based frontend that mimics Perplexity's interface with AI-powered search functionality.

## Features

- 🎨 **Perplexity-like Design** - Dark theme with modern UI
- 🔍 **Smart Search** - Auto-expanding textarea with Enter to submit
- 🖼️ **Image Display** - Shows related images from search results
- 📝 **Source Attribution** - Clickable source links in answers
- 🔗 **Source List** - Complete list of sources with external links
- ❓ **Follow-up Questions** - Ask additional questions after getting results
- ⏳ **Loading States** - Beautiful loading spinner during API calls
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile

## Setup

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Make sure the backend is running:**
   ```bash
   # In another terminal, from the backend directory
   cd ../backend
   npm start
   ```

The frontend will run on `http://localhost:3000` and automatically proxy API calls to the backend.

## Usage

1. **Search**: Type your question in the search bar and press Enter or click the send button
2. **View Results**: 
   - Images appear at the top (if available)
   - AI-generated answer with clickable source citations
   - Complete list of sources at the bottom
3. **Follow-up**: Ask additional questions using the follow-up input box

## API Integration

The frontend connects to the backend API endpoints:
- `GET /query?question=...` - Search for answers
- All responses include: `answer`, `images`, `sources`, `timestamp`

## Components

- **App.js** - Main application component
- **SearchBar.js** - Search input with auto-expanding textarea
- **SearchResults.js** - Displays results with images, answers, and sources
- **LoadingSpinner.js** - Animated loading indicator

## Styling

- Dark theme with gradient accents
- Responsive grid layouts
- Smooth animations and transitions
- Mobile-first design approach

## Development

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Dependencies

- React 18.2.0
- Lucide React (for icons)
- Axios (for API calls)
- React Scripts 5.0.1
