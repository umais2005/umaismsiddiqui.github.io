
import React from 'react';
import { Mail, Phone, MapPin, BrainCog, Circuit } from 'lucide-react';

interface FooterProps {
  portfolioData: any;
}

const Footer: React.FC<FooterProps> = ({ portfolioData }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="contact" className="bg-gradient-to-br from-primary to-accent text-primary-foreground py-16 relative overflow-hidden">
      {/* Circuit-like decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-10 top-0 w-px h-full bg-white"></div>
        <div className="absolute left-20 top-0 w-px h-3/4 bg-white"></div>
        <div className="absolute left-40 top-0 w-px h-1/2 bg-white"></div>
        <div className="absolute right-40 top-1/2 w-px h-1/2 bg-white"></div>
        <div className="absolute right-20 top-1/4 w-px h-3/4 bg-white"></div>
        <div className="absolute right-10 top-0 w-px h-full bg-white"></div>
        
        <div className="absolute top-10 left-0 h-px w-full bg-white"></div>
        <div className="absolute top-20 left-0 h-px w-3/4 bg-white"></div>
        <div className="absolute top-40 left-1/4 h-px w-3/4 bg-white"></div>
        <div className="absolute bottom-40 left-0 h-px w-3/4 bg-white"></div>
        <div className="absolute bottom-20 left-1/4 h-px w-3/4 bg-white"></div>
        <div className="absolute bottom-10 left-0 h-px w-full bg-white"></div>
      </div>
      
      <div className="container max-w-5xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <BrainCog size={24} className="text-secondary" />
              <h2 className="text-2xl font-bold">Contact Me</h2>
            </div>
            <div className="space-y-4">
              {portfolioData.contact.email && (
                <div className="flex items-center gap-3 transition-transform hover:translate-x-2">
                  <Mail size={20} className="text-secondary" />
                  <a 
                    href={`mailto:${portfolioData.contact.email}`}
                    className="hover:underline"
                  >
                    {portfolioData.contact.email}
                  </a>
                </div>
              )}
              
              {portfolioData.contact.phone && (
                <div className="flex items-center gap-3 transition-transform hover:translate-x-2">
                  <Phone size={20} className="text-secondary" />
                  <a 
                    href={`tel:${portfolioData.contact.phone}`}
                    className="hover:underline"
                  >
                    {portfolioData.contact.phone}
                  </a>
                </div>
              )}
              
              {portfolioData.contact.location && (
                <div className="flex items-center gap-3 transition-transform hover:translate-x-2">
                  <MapPin size={20} className="text-secondary" />
                  <span>{portfolioData.contact.location}</span>
                </div>
              )}
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Circuit size={18} className="text-secondary" />
                Connect With Me
              </h3>
              <div className="flex flex-wrap gap-4">
                {portfolioData.social_links.map((link: any, index: number) => (
                  <a 
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md text-sm transition-all hover:scale-105 shadow-md"
                    aria-label={link.label}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <BrainCog size={24} className="text-secondary" />
              <h2 className="text-2xl font-bold">References</h2>
            </div>
            <div className="space-y-6">
              {portfolioData.references && portfolioData.references.map((reference: any, index: number) => (
                <div key={index} className="bg-white/10 p-4 rounded-lg hover:bg-white/15 transition-all">
                  <p className="italic mb-4">"{reference.reference}"</p>
                  <div className="text-sm">
                    <strong>{reference.name}</strong> — {reference.relation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/20 text-center text-sm opacity-80">
          <p>&copy; {currentYear} {portfolioData.name}. All rights reserved.</p>
          <p className="mt-2">Designed with <span className="text-secondary">❤️</span> and <span className="text-secondary">AI</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
