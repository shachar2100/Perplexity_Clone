import React from 'react';
import { Search, ArrowRight, Settings2, Paperclip, Mic, Globe } from 'lucide-react';
import ExampleQuestions from './ExampleQuestions';
import './SearchBar.css';

const Tooltip = ({ children, text }) => {
  return (
    <div className="tooltip-container" data-tooltip={text}>
      {children}
    </div>
  );
};

const SearchBar = ({ query, setQuery, onSearch, disabled, exampleQuestions }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !disabled) {
      onSearch(query);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  const handleExampleClick = (example) => {
    const fullQuery = query.endsWith(' ') ? `${query}${example}` : example;
    onSearch(fullQuery);
  };

  const unimplemented_feature_text = "Feature not yet implemented";

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <div className="search-input-container">
            <textarea
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything..."
              disabled={disabled}
              rows={1}
              autoFocus
              style={{
                resize: 'none',
                overflow: 'hidden',
                minHeight: '24px',
                maxHeight: '200px'
              }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
              }}
            />
            <div className="action-icons">
              <Tooltip text={unimplemented_feature_text}>
                <button type="button" className="icon-button" disabled><Settings2 size={18} /></button>
              </Tooltip>
              <Tooltip text={unimplemented_feature_text}>
                <button type="button" className="icon-button" disabled><Globe size={18} /></button>
              </Tooltip>
              <Tooltip text={unimplemented_feature_text}>
                <button type="button" className="icon-button" disabled><Paperclip size={18} /></button>
              </Tooltip>
              <Tooltip text={unimplemented_feature_text}>
                <button type="button" className="icon-button" disabled><Mic size={18} /></button>
              </Tooltip>
            </div>
          </div>
          <button
            type="submit"
            className="search-button"
            disabled={!query.trim() || disabled}
          >
            <ArrowRight size={20} />
          </button>
        </div>
        
        {exampleQuestions && exampleQuestions.length > 0 && (
          <ExampleQuestions examples={exampleQuestions} onExampleClick={handleExampleClick} />
        )}
      </form>
    </div>
  );
};

export default SearchBar; 