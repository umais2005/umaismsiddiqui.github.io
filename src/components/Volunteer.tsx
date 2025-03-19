
import React from 'react';
import { Heart, ExternalLink } from 'lucide-react';

interface VolunteerProps {
  portfolioData: any;
}

const Volunteer: React.FC<VolunteerProps> = ({ portfolioData }) => {
  // Check if volunteer experience exists
  if (!portfolioData.volunteer_experience || portfolioData.volunteer_experience.length === 0) {
    return null;
  }

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
    <section className="container-section">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-secondary text-sm font-medium mb-4">
            Community
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Volunteer Experience
          </h2>
        </div>
        
        <div className="space-y-6">
          {portfolioData.volunteer_experience.map((volunteer: any, index: number) => (
            <div 
              key={index}
              className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <Heart size={24} className="text-primary" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-xl font-semibold">{volunteer.position}</h3>
                      <div className="flex items-center text-muted-foreground">
                        <a 
                          href={volunteer.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-foreground flex items-center"
                        >
                          {volunteer.organization} 
                          <ExternalLink size={14} className="ml-1" />
                        </a>
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground font-medium">
                      {formatDate(volunteer.start_date)} — {formatDate(volunteer.end_date)}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{volunteer.summary}</p>
                  
                  {volunteer.highlights && volunteer.highlights.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground pl-2">
                      {volunteer.highlights.map((highlight: string, i: number) => (
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

export default Volunteer;
