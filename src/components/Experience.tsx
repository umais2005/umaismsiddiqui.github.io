
import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, ExternalLink } from 'lucide-react';

interface ExperienceProps {
  portfolioData: any;
}

const Experience: React.FC<ExperienceProps> = ({ portfolioData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = timelineRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              setActiveIndex(index);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    timelineRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      timelineRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const formatDate = (dateString: string) => {
    if (dateString === "Present") return dateString;
    
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', { 
        year: 'numeric', 
        month: 'short'
      }).format(date);
    } catch {
      return dateString;
    }
  };

  return (
    <section id="experience" className="container-section bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-secondary text-sm font-medium mb-4">
            Career Path
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Work Experience
          </h2>
        </div>

        <div className="space-y-12">
          {portfolioData.work_experience.map((job: any, index: number) => (
            <div 
              key={index}
              ref={el => timelineRefs.current[index] = el}
              className={`relative transition-all duration-500 ${
                index === activeIndex ? 'opacity-100 translate-y-0' : 'opacity-80 translate-y-4'
              }`}
            >
              {/* Timeline line and dot */}
              {index < portfolioData.work_experience.length - 1 && (
                <div className="absolute left-[15px] top-[35px] bottom-0 w-[1px] bg-border"></div>
              )}
              
              <div className="flex gap-6">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 z-10">
                    <Briefcase size={16} />
                  </div>
                </div>
                
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 w-full">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <div>
                      <h3 className="text-xl font-semibold">{job.position}</h3>
                      <div className="flex items-center text-muted-foreground">
                        <a 
                          href={job.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-foreground flex items-center"
                        >
                          {job.company} 
                          <ExternalLink size={14} className="ml-1" />
                        </a>
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground font-medium">
                      {formatDate(job.start_date)} — {formatDate(job.end_date)}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{job.summary}</p>
                  
                  {job.highlights && job.highlights.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground pl-2">
                      {job.highlights.map((highlight: string, i: number) => (
                        <li key={i} className="leading-relaxed">{highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
