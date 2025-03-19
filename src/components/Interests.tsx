
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface InterestsProps {
  portfolioData: any;
}

const Interests: React.FC<InterestsProps> = ({ portfolioData }) => {
  // Check if interests exists
  if (!portfolioData.interests || portfolioData.interests.length === 0) {
    return null;
  }

  // Track current image for each interest
  const [currentImages, setCurrentImages] = useState<{ [key: string]: number }>(
    portfolioData.interests.reduce((acc: any, interest: any) => {
      acc[interest.name] = 0;
      return acc;
    }, {})
  );

  // Navigate through images
  const nextImage = (interestName: string, imagesLength: number) => {
    setCurrentImages(prev => ({
      ...prev,
      [interestName]: (prev[interestName] + 1) % imagesLength
    }));
  };

  const prevImage = (interestName: string, imagesLength: number) => {
    setCurrentImages(prev => ({
      ...prev,
      [interestName]: (prev[interestName] - 1 + imagesLength) % imagesLength
    }));
  };

  return (
    <section className="container-section bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-secondary text-sm font-medium mb-4">
            Personal
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Interests & Hobbies
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {portfolioData.interests.map((interest: any, index: number) => (
            <div 
              key={index} 
              className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Image slider */}
              {interest.images && interest.images.length > 0 && (
                <div className="relative aspect-video">
                  <div 
                    className="flex transition-transform duration-500 h-full"
                    style={{ transform: `translateX(-${currentImages[interest.name] * 100}%)` }}
                  >
                    {interest.images.map((image: any, imgIndex: number) => (
                      <div key={imgIndex} className="w-full flex-shrink-0 h-full">
                        <img 
                          src={image.img_path} 
                          alt={image.caption || interest.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  
                  {/* Navigation buttons */}
                  {interest.images.length > 1 && (
                    <>
                      <button 
                        onClick={() => prevImage(interest.name, interest.images.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur hover:bg-background/90 transition-all"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button 
                        onClick={() => nextImage(interest.name, interest.images.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur hover:bg-background/90 transition-all"
                        aria-label="Next image"
                      >
                        <ChevronRight size={18} />
                      </button>
                      
                      {/* Indicators */}
                      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                        {interest.images.map((_: any, i: number) => (
                          <button
                            key={i}
                            onClick={() => setCurrentImages(prev => ({ ...prev, [interest.name]: i }))}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                              i === currentImages[interest.name] 
                                ? 'bg-foreground w-3' 
                                : 'bg-foreground/50'
                            }`}
                            aria-label={`Go to image ${i + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  
                  {/* Caption */}
                  {interest.images[currentImages[interest.name]]?.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-background/80 backdrop-blur text-sm text-center">
                      {interest.images[currentImages[interest.name]].caption}
                    </div>
                  )}
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{interest.name}</h3>
                <p className="text-muted-foreground">{interest.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Interests;
