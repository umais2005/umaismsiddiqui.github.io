
import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import LazyImage from './LazyImage';

interface ImageType {
  img_path: string;
  caption?: string;
}

interface ProjectImageGalleryProps {
  images: ImageType[];
}

const ProjectImageGallery: React.FC<ProjectImageGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div ref={galleryRef} className="relative">
      {/* Main image display */}
      <div 
        className={`relative rounded-xl overflow-hidden aspect-video bg-black/10 
          ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
        onClick={toggleZoom}
      >
        <div 
          className={`transition-transform duration-700 ease-in-out flex h-full
            ${isZoomed ? 'scale-150' : 'scale-100'}`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div 
              key={index} 
              className="min-w-full h-full flex-shrink-0 transition-opacity duration-500"
              style={{ opacity: currentIndex === index ? 1 : 0.5 }}
            >
              <img 
                src={image.img_path} 
                alt={image.caption || `Project image ${index + 1}`} 
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
        
        {/* Zoom indicator */}
        {!isZoomed && (
          <button 
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              toggleZoom();
            }}
            aria-label="Zoom image"
          >
            <ZoomIn size={16} />
          </button>
        )}
        
        {/* Caption */}
        {images[currentIndex]?.caption && (
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-background/80 backdrop-blur text-sm text-center">
            {images[currentIndex].caption}
          </div>
        )}
      </div>
      
      {/* Navigation controls */}
      {images.length > 1 && (
        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 hover:bg-secondary/20 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleNext}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 hover:bg-secondary/20 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
      
      {/* Thumbnail navigation */}
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 md:grid-cols-6 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`aspect-video rounded-md overflow-hidden border-2 transition-all
                ${currentIndex === index 
                  ? 'border-primary ring-2 ring-primary/20' 
                  : 'border-transparent opacity-60 hover:opacity-100'}`}
              aria-label={`View image ${index + 1}`}
            >
              <LazyImage 
                src={image.img_path} 
                alt={image.caption || `Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectImageGallery;
