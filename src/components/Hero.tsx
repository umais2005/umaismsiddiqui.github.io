
import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  portfolioData: any;
}

const Hero: React.FC<HeroProps> = ({ portfolioData }) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleParallax = () => {
      if (imageRef.current) {
        const scrolled = window.scrollY;
        imageRef.current.style.transform = `translateY(${scrolled * 0.15}px)`;
      }
    };
    
    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  return (
    <section id="top" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with parallax effect */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1629429407673-58e67770dd73?q=80&w=2000"
          alt="Background pattern"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content overlay */}
      <div className="container relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="space-y-4 animate-fade-up">
          <div className="inline-block px-3 py-1 rounded-full bg-secondary text-sm font-medium mb-4 animate-fade-in">
            {portfolioData.label || "Welcome"}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            {portfolioData.name}
          </h1>
          
          <p className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto text-balance leading-relaxed">
            {portfolioData.summary}
          </p>
          
          <div className="flex justify-center mt-8 space-x-4">
            <a 
              href="#about" 
              className="button-primary px-5 py-2 rounded-full"
            >
              Explore My Work
            </a>
            <a 
              href="#contact" 
              className="button-secondary px-5 py-2 rounded-full"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" aria-label="Scroll Down">
          <ChevronDown size={30} className="text-muted-foreground/70" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
