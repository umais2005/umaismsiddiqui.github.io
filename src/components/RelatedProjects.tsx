
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import LazyImage from './LazyImage';

interface RelatedProjectsProps {
  currentProjectId: string;
  projects: any[];
}

const RelatedProjects: React.FC<RelatedProjectsProps> = ({ currentProjectId, projects }) => {
  const navigate = useNavigate();

  // Get up to 3 related projects (excluding the current one)
  const relatedProjects = projects
    .filter(project => project.title !== currentProjectId)
    .slice(0, 3);

  if (relatedProjects.length === 0) {
    return null;
  }

  const handleNavigate = (index: number) => {
    navigate(`/project/${index}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="py-16 border-t border-border">
      <h2 className="text-2xl font-bold mb-8">More Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedProjects.map((project, index) => {
          const projectIndex = projects.findIndex(p => p.title === project.title);
          return (
            <div 
              key={index}
              className="group cursor-pointer border border-border rounded-xl overflow-hidden bg-card hover:bg-card/80 transition-colors"
              onClick={() => handleNavigate(projectIndex)}
            >
              <div className="aspect-video overflow-hidden bg-secondary/10">
                {project.images && project.images.length > 0 && (
                  <LazyImage
                    src={project.images[0].img_path}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.summary}
                </p>
                
                <div className="mt-4 flex items-center text-sm text-primary font-medium">
                  <span>View details</span>
                  <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProjects;
