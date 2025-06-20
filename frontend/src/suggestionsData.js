import { Scale, Wrench, BookOpen, Heart, FileText } from 'lucide-react';

export const SUGGESTIONS = [
  { text: 'Compare', icon: <Scale size={16} /> },
  { text: 'Troubleshoot', icon: <Wrench size={16} /> },
  { text: 'Perplexity 101', icon: <BookOpen size={16} /> },
  { text: 'Health', icon: <Heart size={16} /> },
  { text: 'Summarize', icon: <FileText size={16} /> },
];

export const EXAMPLE_QUESTIONS = {
  'Compare': {
    prompt: 'Compare ',
    examples: [
      'Tesla, Rivian, and Polestar',
      'the best credit cards for travel in 2025',
      'OLED and QLED TVs',
    ],
  },
  'Troubleshoot': {
    prompt: 'Troubleshoot ',
    examples: [
        'why my internet is so slow',
        'a leaky faucet',
        'my car not starting',
    ],
  },
  'Perplexity 101': {
    prompt: '',
    examples: [
      'How should I use Perplexity?',
      'How is Perplexity different than ChatGPT?',
      'How is Perplexity Pro different? Is it worth it?',
    ],
  },
  'Health': {
    prompt: 'What are the health benefits of ',
    examples: [
        'a vegetarian diet?',
        'regular exercise?',
        'meditation?',
    ],
  },
  'Summarize': {
      prompt: 'Summarize ',
      examples: [
          'the plot of the movie Oppenheimer',
          'the latest IPCC report on climate change',
          'the book "Sapiens: A Brief History of Humankind"',
      ],
  },
}; 