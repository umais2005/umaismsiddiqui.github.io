
import React, { useEffect, useRef } from 'react';
import { BrainCog, Sparkles, ChevronDown } from 'lucide-react';

interface HeroProps {
  portfolioData: any;
}

const Hero: React.FC<HeroProps> = ({ portfolioData }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    // Simple floating particles effect
    if (particlesRef.current) {
      const particles = particlesRef.current;
      const particleCount = 30;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 5 + 2;
        
        particle.className = 'absolute rounded-full';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = i % 2 === 0 ? 'rgb(148, 108, 255, 0.3)' : 'rgb(255, 85, 178, 0.3)';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
        
        const floatUp = document.createElement('style');
        floatUp.innerHTML = `
          @keyframes float-${i} {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 90}deg); }
            50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 180}deg); }
            75% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 270}deg); }
          }
        `;
        document.head.appendChild(floatUp);
        
        particle.style.animation = `float-${i} infinite ease-in-out`;
        particles.appendChild(particle);
      }
    }
  }, []);

  return (
    <section id="top" className="relative h-screen flex items-center justify-center overflow-hidden ai-circuit-bg">
      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 z-0 overflow-hidden"></div>
      
      {/* Background image with parallax effect */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b"
          alt="Background pattern"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content overlay */}
      <div className="container relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="space-y-4 animate-fade-up">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/80 backdrop-blur text-sm font-medium mb-4 animate-fade-in shadow-lg">
            <BrainCog className="mr-2 text-primary" size={18} />
            {portfolioData.label || "Welcome"}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gradient">
            {portfolioData.name}
          </h1>
          
          <p className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto text-balance leading-relaxed">
            {portfolioData.summary}
          </p>
          
          <div className="flex justify-center mt-8 space-x-4">
            <a 
              href="#projects" 
              className="button-primary px-5 py-2 rounded-full ai-glow group"
            >
              <Sparkles className="mr-2 group-hover:animate-pulse" size={18} />
              Explore My Work
            </a>
            <a 
              href="#contact" 
              className="button-secondary px-5 py-2 rounded-full ai-glow"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" aria-label="Scroll Down">
          <ChevronDown size={30} className="text-primary/70" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
