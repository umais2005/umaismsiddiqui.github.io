
import React from 'react';
import { GraduationCap, MapPin, ExternalLink } from 'lucide-react';

interface EducationProps {
  portfolioData: any;
}

const Education: React.FC<EducationProps> = ({ portfolioData }) => {
  // Format date string to display only year
  const formatYear = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.getFullYear().toString();
    } catch {
      return dateString.split('/').pop() || dateString; // Fallback to extract year or return as is
    }
  };

  return (
    <section id="education" className="container-section bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-secondary text-sm font-medium mb-4">
            Academic Background
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Education
          </h2>
        </div>
        
        <div className="space-y-8">
          {portfolioData.education.map((edu: any, index: number) => (
            <div 
              key={index}
              className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row gap-4">
                {/* Icon */}
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <GraduationCap size={24} className="text-primary" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-xl font-semibold">{edu.institution}</h3>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <MapPin size={14} className="mr-1" />
                        {edu.location}
                      </div>
                    </div>
                    
                    <div className="text-sm font-medium text-muted-foreground">
                      {formatYear(edu.graduation_date)}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {/* Degrees */}
                    {edu.degrees && edu.degrees.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Degrees</h4>
                        <ul className="space-y-1">
                          {edu.degrees.map((degree: string, i: number) => (
                            <li key={i} className="text-foreground">{degree}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* GPA */}
                    {(edu.gpa_cumulative || edu.gpa_major) && (
                      <div className="flex flex-wrap gap-4 text-sm">
                        {edu.gpa_cumulative && (
                          <div>
                            <span className="font-medium">Cumulative GPA:</span> {edu.gpa_cumulative}
                          </div>
                        )}
                        {edu.gpa_major && (
                          <div>
                            <span className="font-medium">Major GPA:</span> {edu.gpa_major}
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Honors */}
                    {edu.honors && edu.honors.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Honors & Awards</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {edu.honors.map((honor: string, i: number) => (
                            <li key={i} className="text-muted-foreground">{honor}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Institution URL */}
                    {edu.url && (
                      <div className="pt-1">
                        <a 
                          href={edu.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                        >
                          Visit Institution <ExternalLink size={14} className="ml-1" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
