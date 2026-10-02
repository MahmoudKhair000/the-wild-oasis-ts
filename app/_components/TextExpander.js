'use client';
import { useState } from 'react';
import Logo from './Logo';

function TextExpander({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayText = isExpanded
    ? children
    : children.split(' ').slice(0, 40).join(' ') + '...';

  return (
    <span>
      {displayText}{' '}
      <button
        className="text-primary-700 border-b border-primary-700 leading-3 pb-1"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Show less' : 'Show more'}
      </button>
      {/* The logo (server C) as a client instance
          , imported in a client component */}
      {/* <div
        className="p-2 rounded-lg bg-blue-600 w-fit"
        title="server component imported in a client component, BUT AS A ClIENT INSTANCE !!"
      >
        <Logo />
      </div> */}
    </span>
  );
}

export default TextExpander;
