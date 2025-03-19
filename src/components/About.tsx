
import React from 'react';
import { Globe, Mail, MapPin, Phone } from 'lucide-react';

interface AboutProps {
  portfolioData: any;
}

const About: React.FC<AboutProps> = ({ portfolioData }) => {
  return (
    <section id="about" className="container-section">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-secondary text-sm font-medium mb-4">
            About Me
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            A Closer Look
          </h2>
        </div>
        
        <div className="grid md:grid-cols-5 gap-10 items-start">
          {/* Profile image */}
          <div className="md:col-span-2">
            <div className="aspect-square overflow-hidden rounded-2xl bg-secondary">
              <img 
                src={portfolioData.image_path || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop"}
                alt={portfolioData.name} 
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
            </div>
            
            {/* Social links */}
            <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
              {portfolioData.social_links.map((link: any, index: number) => (
                <a 
                  key={index} 
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-ghost px-4 py-2 rounded-full border border-border text-sm"
                  aria-label={link.label}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          
          {/* Bio info */}
          <div className="md:col-span-3 space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Hello, I'm {portfolioData.name.split(' ')[0]}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {portfolioData.summary}
              </p>
            </div>
            
            <div className="section-divider" />
            
            {/* Contact information */}
            <div className="space-y-3">
              <h4 className="text-lg font-medium">Contact Details</h4>
              <ul className="space-y-3">
                {portfolioData.contact.email && (
                  <li className="flex items-center gap-2">
                    <Mail size={18} className="text-muted-foreground" />
                    <a 
                      href={`mailto:${portfolioData.contact.email}`}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {portfolioData.contact.email}
                    </a>
                  </li>
                )}
                
                {portfolioData.contact.phone && (
                  <li className="flex items-center gap-2">
                    <Phone size={18} className="text-muted-foreground" />
                    <a 
                      href={`tel:${portfolioData.contact.phone}`}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {portfolioData.contact.phone}
                    </a>
                  </li>
                )}
                
                {portfolioData.contact.location && (
                  <li className="flex items-center gap-2">
                    <MapPin size={18} className="text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {portfolioData.contact.location}
                    </span>
                  </li>
                )}
                
                {/* Website if exists */}
                {portfolioData.social_links.some((link: any) => link.label === "Personal Website") && (
                  <li className="flex items-center gap-2">
                    <Globe size={18} className="text-muted-foreground" />
                    <a 
                      href={portfolioData.social_links.find((link: any) => link.label === "Personal Website")?.url}
                      className="text-muted-foreground hover:text-foreground"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {portfolioData.social_links.find((link: any) => link.label === "Personal Website")?.url.replace(/^https?:\/\//, '')}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
