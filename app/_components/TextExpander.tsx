'use client';
import { useState } from 'react';

function TextExpander({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Check if text needs truncation (only for string children)
  const needsTruncation = typeof children === 'string' && children.split(' ').length > 60;
  
  const displayText = isExpanded
    ? children
    : (typeof children === 'string' && needsTruncation ? children.split(' ').slice(0, 60).join(' ') + '...' : children);

  return (
    <span>
      {displayText}{' '}
      {needsTruncation && (
        <button
          className='text-primary-700 border-b border-primary-700 leading-3 pb-1'
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </span>
  );
}

export default TextExpander;
