
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Sparkles } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import LazyImage from '@/components/LazyImage';
import ProjectImageGallery from '@/components/ProjectImageGallery';
import RelatedProjects from '@/components/RelatedProjects';
import portfolioDataJson from '@/data/portfolio.json';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Find the project by index or title
    const findProject = () => {
      const index = parseInt(projectId || '0', 10);
      if (!isNaN(index) && portfolioDataJson.projects[index]) {
        return portfolioDataJson.projects[index];
      }
      
      // If not found by index, try to find by title (url-friendly version)
      return portfolioDataJson.projects.find(p => 
        p.title.toLowerCase().replace(/\s+/g, '-') === projectId
      );
    };

    const foundProject = findProject();
    
    if (foundProject) {
      setProject(foundProject);
      setIsLoading(false);
    } else {
      toast({
        title: "Project Not Found",
        description: "Sorry, we couldn't find the project you're looking for.",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [projectId, navigate, toast]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-muted-foreground">Loading project details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header portfolioData={portfolioDataJson} />
      
      <main className="pt-20 pb-16">
        {/* Back button */}
        <div className="container max-w-5xl mx-auto px-4 mb-8">
          <button 
            onClick={() => navigate('/#projects')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Projects</span>
          </button>
        </div>
        
        {/* Project header */}
        <div className="container max-w-5xl mx-auto px-4 mb-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{project.title}</h1>
            <p className="text-xl text-muted-foreground">{project.summary}</p>
            
            {project.url && (
              <div className="pt-2">
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  Visit Project <ExternalLink size={14} />
                </a>
              </div>
            )}
          </div>
        </div>
        
        {/* Project images gallery */}
        {project.images && project.images.length > 0 && (
          <div className="container max-w-5xl mx-auto px-4 mb-16">
            <ProjectImageGallery images={project.images} />
          </div>
        )}
        
        {/* Project details */}
        <div className="container max-w-5xl mx-auto px-4 mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold mb-6">Project Highlights</h2>
              
              {project.highlights && project.highlights.length > 0 && (
                <ul className="space-y-4">
                  {project.highlights.map((highlight: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Sparkles size={14} className="text-primary" />
                      </div>
                      <div className="flex-1">{highlight}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <div>
              <div className="bg-card text-card-foreground rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-4">Project Info</h3>
                
                <dl className="space-y-3 text-sm">
                  {project.created && (
                    <div>
                      <dt className="text-muted-foreground">Date</dt>
                      <dd className="font-medium">{project.created}</dd>
                    </div>
                  )}
                  
                  {project.category && (
                    <div>
                      <dt className="text-muted-foreground">Category</dt>
                      <dd className="font-medium">{project.category}</dd>
                    </div>
                  )}
                  
                  {project.client && (
                    <div>
                      <dt className="text-muted-foreground">Client</dt>
                      <dd className="font-medium">{project.client}</dd>
                    </div>
                  )}
                  
                  {project.tools && project.tools.length > 0 && (
                    <div>
                      <dt className="text-muted-foreground">Tools & Technologies</dt>
                      <dd className="font-medium flex flex-wrap gap-1 mt-1">
                        {project.tools.map((tool: string, i: number) => (
                          <span 
                            key={i}
                            className="inline-flex px-2 py-1 bg-secondary/10 rounded text-xs"
                          >
                            {tool}
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related projects */}
        <div className="container max-w-5xl mx-auto px-4">
          <RelatedProjects 
            currentProjectId={project.title} 
            projects={portfolioDataJson.projects}
          />
        </div>
      </main>
      
      <Footer portfolioData={portfolioDataJson} />
      <ScrollToTop />
    </div>
  );
};

export default ProjectDetail;
