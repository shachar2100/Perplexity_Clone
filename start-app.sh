#!/bin/bash

echo "🚀 Starting Perplexity Clone..."
echo ""

# Check if backend dependencies are installed
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend
    npm install
    cd ..
fi

# Check if frontend dependencies are installed
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
fi

echo "🔧 Starting backend server..."
cd backend
npm start &
BACKEND_PID=$!
cd ..

echo "⏳ Waiting for backend to start..."
sleep 3

echo "🎨 Starting frontend..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Perplexity Clone is starting up!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:3000/api"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait $BACKEND_PID $FRONTEND_PID 