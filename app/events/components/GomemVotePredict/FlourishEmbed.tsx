'use client';

import React, { useEffect, useRef } from 'react';

interface FlourishProps {
  id: string;
  type: 'visualisation' | 'story';
}

export default function FlourishEmbed({
  id,
  type,
}: FlourishProps): JSX.Element {
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://public.flourish.studio/resources/embed.js';
    script.async = true;
    document.body.appendChild(script);

    const resizeEmbed = () => {
      if (embedRef.current) {
        embedRef.current.style.height = `${window.innerHeight}px`;
      }
    };

    resizeEmbed();
    window.addEventListener('resize', resizeEmbed);

    return () => {
      document.body.removeChild(script);
      window.removeEventListener('resize', resizeEmbed);
    };
  }, []);

  return (
    <div
      ref={embedRef}
      className={`flourish-embed flourish-${type} mt-4 w-full`}
      data-src={`${type}/${id}`}
    ></div>
  );
}
