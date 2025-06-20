import React, { useState } from 'react';
import { ExternalLink, Send } from 'lucide-react';
import SearchBar from './SearchBar';
import './SearchResults.css';

const SearchResults = ({ results, onFollowUp, loading }) => {
  const [followUpQuery, setFollowUpQuery] = useState('');

  const handleFollowUpSubmit = (e) => {
    e.preventDefault();
    if (followUpQuery.trim() && !loading) {
      onFollowUp(followUpQuery);
      setFollowUpQuery('');
    }
  };

  const formatAnswer = (answer) => {
    // Split the answer by source citations and format them
    const parts = answer.split(/(\[Source \d+\])/g);
    
    return parts.map((part, index) => {
      if (part.match(/\[Source \d+\]/)) {
        const sourceNumber = part.match(/\d+/)[0];
        const sourceUrl = results.sources[parseInt(sourceNumber) - 1];
        return (
          <a
            key={index}
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="source-link"
          >
            {part}
            <ExternalLink size={12} />
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="search-results">
      {/* Images Section */}
      {results.images && results.images.length > 0 && (
        <div className="images-section">
          <h3>Related Images</h3>
          <div className="images-grid">
            {results.images.map((imageUrl, index) => (
              <div key={index} className="image-container">
                <img
                  src={imageUrl}
                  alt={`Result ${index + 1}`}
                  className="result-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Answer Section */}
      <div className="answer-section">
        <div className="answer-content">
          <h3>Answer</h3>
          <div className="answer-text">
            {formatAnswer(results.answer)}
          </div>
        </div>
      </div>

      {/* Sources Section */}
      {results.sources && results.sources.length > 0 && (
        <div className="sources-section">
          <h3>Sources</h3>
          <div className="sources-list">
            {results.sources.map((source, index) => (
              <a
                key={index}
                href={source}
                target="_blank"
                rel="noopener noreferrer"
                className="source-item"
              >
                <span className="source-number">[{index + 1}]</span>
                <span className="source-url">{source}</span>
                <ExternalLink size={14} />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Follow-up Question Section */}
      <div className="follow-up-section">
        <h3>Ask a follow-up question</h3>
        <form onSubmit={handleFollowUpSubmit} className="follow-up-form">
          <div className="follow-up-input-container">
            <textarea
              className="follow-up-input"
              value={followUpQuery}
              onChange={(e) => setFollowUpQuery(e.target.value)}
              placeholder="Ask a follow-up question..."
              disabled={loading}
              rows={1}
              style={{
                resize: 'none',
                overflow: 'hidden',
                minHeight: '48px',
                maxHeight: '200px'
              }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
              }}
            />
            <button
              type="submit"
              className="follow-up-button"
              disabled={!followUpQuery.trim() || loading}
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchResults; 