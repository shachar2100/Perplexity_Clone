import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import LoadingSpinner from './components/LoadingSpinner';
import Suggestions from './components/Suggestions';
import { EXAMPLE_QUESTIONS } from './suggestionsData';

function App() {
  const [query, setQuery] = useState('');
  const [exampleQuestions, setExampleQuestions] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('perplexity');
  const [isTitleAnimating, setIsTitleAnimating] = useState(false);

  const resetToHome = () => {
    setSearchResults(null);
    setError(null);
    setQuery('');
    setExampleQuestions([]);
    setTitle('perplexity');
    setIsTitleAnimating(false);
  };

  const animateTitle = (targetText) => {
    setIsTitleAnimating(true);
    let i = 0;
    setTitle('');
    
    const interval = setInterval(() => {
      if (i < targetText.length) {
        setTitle(prev => prev + targetText.charAt(i));
        i++;
      } else {
        clearInterval(interval);
        setIsTitleAnimating(false);
      }
    }, 60); // Typing speed in ms
  };

  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    setSearchResults(null);
    setExampleQuestions([]);

    try {
      const response = await fetch(`/query?question=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();

      if (response.ok) {
        setSearchResults(data);
      } else {
        setError(data.error || 'An error occurred while searching');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestionText) => {
    const suggestionData = EXAMPLE_QUESTIONS[suggestionText];
    if (suggestionData) {
      let newTitle = "Ask anything...";
      switch (suggestionText) {
        case 'Compare':
          newTitle = " What do you want to compare?";
          break;
        case 'Troubleshoot':
          newTitle = " What do you need to troubleshoot?";
          break;
        case 'Perplexity 101':
          newTitle = " Curious about Perplexity?";
          break;
        case 'Health':
          newTitle = " What health topic are you interested in?";
          break;
        case 'Summarize':
          newTitle = " What should I summarize for you?";
          break;
        default:
          break;
      }
      animateTitle(newTitle);
      setQuery(suggestionData.prompt);
      setExampleQuestions(suggestionData.examples);
    }
  };

  const handleFollowUp = (followUpQuery) => {
    performSearch(followUpQuery);
  };

  return (
    <div className={`App ${searchResults ? 'results-view' : 'home-view'}`}>
      {searchResults && !loading && !error && (
        <header className="results-header">
          <button onClick={resetToHome} className="home-button" title="Back to Home">
            <div className="home-logo">
              <div className="home-logo-square" />
            </div>
          </button>
        </header>
      )}
      <main className="App-main">
        {loading ? (
          <div className="loading-container">
            <LoadingSpinner />
            <p>Searching for answers...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p className="error-message">{error}</p>
          </div>
        ) : searchResults ? (
          <SearchResults 
            results={searchResults} 
            onFollowUp={handleFollowUp}
            loading={loading}
          />
        ) : (
          <div className="home-container">
            <h1 className={`logo-text ${isTitleAnimating ? 'typing' : ''}`}>{title}</h1>
            <SearchBar 
              query={query}
              setQuery={setQuery}
              onSearch={performSearch} 
              disabled={loading}
              exampleQuestions={exampleQuestions}
            />
            <Suggestions onSuggestionClick={handleSuggestionClick} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
