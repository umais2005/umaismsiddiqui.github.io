
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Education from '@/components/Education';
import Skills from '@/components/Skills';
import Volunteer from '@/components/Volunteer';
import Interests from '@/components/Interests';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import portfolioDataJson from '@/data/portfolio.json';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState(portfolioDataJson);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header portfolioData={portfolioData} />
      <Hero portfolioData={portfolioData} />
      <About portfolioData={portfolioData} />
      <Experience portfolioData={portfolioData} />
      <Projects portfolioData={portfolioData} />
      <Education portfolioData={portfolioData} />
      <Skills portfolioData={portfolioData} />
      <Volunteer portfolioData={portfolioData} />
      <Interests portfolioData={portfolioData} />
      <Footer portfolioData={portfolioData} />
      <ScrollToTop />
    </div>
  );
};

export default Index;
