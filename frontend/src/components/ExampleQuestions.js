import React from 'react';
import { Search } from 'lucide-react';
import './ExampleQuestions.css';

const ExampleQuestions = ({ examples, onExampleClick }) => {
  if (!examples || examples.length === 0) {
    return null;
  }

  return (
    <div className="example-questions">
      {examples.map((example, index) => (
        <button
          key={index}
          className="example-question-button"
          onClick={() => onExampleClick(example)}
        >
          <Search size={16} className="example-icon" />
          <span>{example}</span>
        </button>
      ))}
    </div>
  );
};

export default ExampleQuestions; 