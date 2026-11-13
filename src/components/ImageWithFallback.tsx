import { useState } from 'react';
import { Bike } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackTitle,
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#1c1b1b] via-[#131313] to-[#201f1f] text-[#a3a3a3] border border-[#262626] p-6 ${className}`}
        role="img"
        aria-label={alt}
      >
        <Bike className="w-8 h-8 text-[#00ff66]/70 mb-2" aria-hidden="true" />
        <span className="font-display text-xs uppercase tracking-widest text-center text-[#e5e2e1]">
          {fallbackTitle ?? alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
