import React from 'react';

export const renderTextWithLinks = (
  text: string
): (string | React.ReactElement)[] => {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: (string | React.ReactElement)[] = [];
  let lastIndex = 0;
  let match;

  // Execute regex and then check if match is null
  match = linkRegex.exec(text);
  while (match !== null) {
    const [fullMatch, linkText, url] = match;
    const startIndex = match.index;

    // Add text before the link
    if (startIndex > lastIndex) {
      parts.push(text.slice(lastIndex, startIndex));
    }

    // Add the link
    parts.push(
      React.createElement(
        'a',
        {
          key: `link-${startIndex}`,
          href: url,
          className: 'text-blue-600 hover:underline',
        },
        linkText
      )
    );
    lastIndex = startIndex + fullMatch.length;
    match = linkRegex.exec(text);
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
};
