
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface ProjectsProps {
  portfolioData: any;
}

const Projects: React.FC<ProjectsProps> = ({ portfolioData }) => {
  // State for currently viewed image for each project
  const [currentImages, setCurrentImages] = useState<{ [key: string]: number }>({});
  
  const imagesRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  // Initialize current image indices
  useEffect(() => {
    const initialIndices: { [key: string]: number } = {};
    portfolioData.projects.forEach((project: any) => {
      initialIndices[project.title] = 0;
    });
    setCurrentImages(initialIndices);
  }, [portfolioData.projects]);
  
  // Image navigation functions
  const nextImage = (projectTitle: string, imagesLength: number) => {
    setCurrentImages(prev => ({
      ...prev,
      [projectTitle]: (prev[projectTitle] + 1) % imagesLength
    }));
  };
  
  const prevImage = (projectTitle: string, imagesLength: number) => {
    setCurrentImages(prev => ({
      ...prev,
      [projectTitle]: (prev[projectTitle] - 1 + imagesLength) % imagesLength
    }));
  };

  return (
    <section id="projects" className="container-section">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-secondary text-sm font-medium mb-4">
            Showcase
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Featured Projects
          </h2>
        </div>
        
        <div className="space-y-20">
          {portfolioData.projects.map((project: any, index: number) => (
            <div key={index} className="group">
              <div className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                {/* Project images with carousel */}
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-secondary">
                  {project.images && project.images.length > 0 && (
                    <>
                      <div 
                        className="w-full h-full transition-all duration-700 ease-in-out"
                        ref={el => imagesRef.current[project.title] = el}
                        style={{ 
                          transform: `translateX(-${currentImages[project.title] * 100}%)`,
                          display: 'flex'
                        }}
                      >
                        {project.images.map((image: any, imageIndex: number) => (
                          <div 
                            key={imageIndex} 
                            className="min-w-full h-full flex-shrink-0 transition-opacity duration-500"
                            style={{ opacity: currentImages[project.title] === imageIndex ? 1 : 0.5 }}
                          >
                            <img 
                              src={image.img_path} 
                              alt={image.caption || project.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      
                      {/* Navigation buttons */}
                      {project.images.length > 1 && (
                        <>
                          <button 
                            onClick={() => prevImage(project.title, project.images.length)}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur hover:bg-background/90 transition-opacity opacity-0 group-hover:opacity-100"
                            aria-label="Previous image"
                          >
                            <ChevronLeft size={18} />
                          </button>
                          <button 
                            onClick={() => nextImage(project.title, project.images.length)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur hover:bg-background/90 transition-opacity opacity-0 group-hover:opacity-100"
                            aria-label="Next image"
                          >
                            <ChevronRight size={18} />
                          </button>
                        </>
                      )}
                      
                      {/* Caption */}
                      {project.images[currentImages[project.title]]?.caption && (
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-background/80 backdrop-blur text-sm text-center">
                          {project.images[currentImages[project.title]].caption}
                        </div>
                      )}
                      
                      {/* Indicators */}
                      {project.images.length > 1 && (
                        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                          {project.images.map((_: any, i: number) => (
                            <button
                              key={i}
                              onClick={() => setCurrentImages(prev => ({ ...prev, [project.title]: i }))}
                              className={`w-1.5 h-1.5 rounded-full transition-all ${
                                i === currentImages[project.title] 
                                  ? 'bg-foreground w-3' 
                                  : 'bg-foreground/50'
                              }`}
                              aria-label={`Go to image ${i + 1}`}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
                
                {/* Project details */}
                <div className={`space-y-4 ${index % 2 === 1 ? 'md:order-first' : ''}`}>
                  <h3 className="text-2xl font-semibold">{project.title}</h3>
                  
                  <p className="text-muted-foreground">{project.summary}</p>
                  
                  {project.highlights && project.highlights.length > 0 && (
                    <ul className="space-y-2 mt-4">
                      {project.highlights.map((highlight: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="h-5 w-5 rounded-full bg-secondary flex items-center justify-center mt-0.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          </span>
                          <span className="text-sm text-muted-foreground flex-1">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {project.url && (
                    <div className="pt-2">
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                      >
                        View Project <ExternalLink size={14} className="ml-1" />
                      </a>
                    </div>
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

export default Projects;
