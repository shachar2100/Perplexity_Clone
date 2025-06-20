import React from 'react';
import './Suggestions.css';
import { SUGGESTIONS } from '../suggestionsData';

const Suggestions = ({ onSuggestionClick }) => {
  return (
    <div className="suggestions">
      {SUGGESTIONS.map((suggestion, index) => (
        <button 
          key={index} 
          className="suggestion-button" 
          onClick={() => onSuggestionClick(suggestion.text)}
        >
          {suggestion.icon}
          <span>{suggestion.text}</span>
        </button>
      ))}
    </div>
  );
};

export default Suggestions; 