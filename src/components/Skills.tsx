
import React, { useEffect, useRef } from 'react';

interface SkillsProps {
  portfolioData: any;
}

const Skills: React.FC<SkillsProps> = ({ portfolioData }) => {
  const progressRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add class to animate progress
            entry.target.classList.add('animate-skill');
          }
        });
      },
      { threshold: 0.1 }
    );

    progressRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      progressRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Languages section
  const languages = portfolioData.languages || [];

  return (
    <section id="skills" className="container-section">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-secondary text-sm font-medium mb-4">
            Expertise
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Skills & Languages
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Technical Skills</h3>
            <div className="space-y-6">
              {portfolioData.skills.map((skill: any, index: number) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.proficiency_label}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      ref={el => progressRefs.current[index] = el}
                      className="h-full bg-primary rounded-full transform-gpu translate-x-[-100%] transition-transform duration-1000"
                      style={{ transform: 'translateX(-100%)' }}
                      data-width={skill.proficiency}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <style jsx>{`
              .animate-skill {
                transform: translateX(calc(-100% + var(--width, 0%))) !important;
              }
            `}</style>
            
            <script dangerouslySetInnerHTML={{
              __html: `
                document.querySelectorAll('[data-width]').forEach(el => {
                  el.style.setProperty('--width', el.dataset.width + '%');
                });
              `
            }} />
          </div>
          
          {/* Languages */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Languages</h3>
            <div className="space-y-4">
              {languages.map((lang: any, index: number) => (
                <div 
                  key={index}
                  className="p-4 rounded-xl border border-border bg-card transition-all hover:shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{lang.language}</h4>
                    <span className="text-sm px-2 py-1 rounded-md bg-secondary text-muted-foreground">
                      {lang.fluency}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
