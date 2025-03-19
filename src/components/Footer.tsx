
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  portfolioData: any;
}

const Footer: React.FC<FooterProps> = ({ portfolioData }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="contact" className="bg-primary text-primary-foreground py-16">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Me</h2>
            <div className="space-y-4">
              {portfolioData.contact.email && (
                <div className="flex items-center gap-3">
                  <Mail size={20} />
                  <a 
                    href={`mailto:${portfolioData.contact.email}`}
                    className="hover:underline"
                  >
                    {portfolioData.contact.email}
                  </a>
                </div>
              )}
              
              {portfolioData.contact.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={20} />
                  <a 
                    href={`tel:${portfolioData.contact.phone}`}
                    className="hover:underline"
                  >
                    {portfolioData.contact.phone}
                  </a>
                </div>
              )}
              
              {portfolioData.contact.location && (
                <div className="flex items-center gap-3">
                  <MapPin size={20} />
                  <span>{portfolioData.contact.location}</span>
                </div>
              )}
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Connect With Me</h3>
              <div className="flex flex-wrap gap-4">
                {portfolioData.social_links.map((link: any, index: number) => (
                  <a 
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-md text-sm transition-colors"
                    aria-label={link.label}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">References</h2>
            <div className="space-y-6">
              {portfolioData.references && portfolioData.references.map((reference: any, index: number) => (
                <div key={index} className="bg-primary-foreground/10 p-4 rounded-lg">
                  <p className="italic mb-4">"{reference.reference}"</p>
                  <div className="text-sm">
                    <strong>{reference.name}</strong> — {reference.relation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-primary-foreground/20 text-center text-sm opacity-80">
          <p>&copy; {currentYear} {portfolioData.name}. All rights reserved.</p>
          <p className="mt-2">Designed with ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
