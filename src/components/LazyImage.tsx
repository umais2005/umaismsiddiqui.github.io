
import React, { useState, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className = "" }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState("");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset loading state when src changes
    setIsLoading(true);
    setHasError(false);
    
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoading(false);
    };
    
    img.onerror = () => {
      console.error(`Failed to load image: ${src}`);
      setHasError(true);
      setIsLoading(false);
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {hasError ? (
        <div className="w-full h-full flex items-center justify-center bg-secondary/30 text-muted-foreground text-sm">
          Image unavailable
        </div>
      ) : (
        <img
          src={currentSrc || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"}
          alt={alt}
          className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
      {isLoading && (
        <div className="absolute inset-0 bg-secondary/80 animate-pulse"></div>
      )}
    </div>
  );
};

export default LazyImage;
