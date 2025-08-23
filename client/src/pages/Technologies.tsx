import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";

const techCategories = [
  { key: 'backend', label: 'Back-End', color: 'bg-blue-100 text-blue-800' },
  { key: 'frontend', label: 'Front-End', color: 'bg-green-100 text-green-800' },
  { key: 'ai-ml', label: 'AI/ML', color: 'bg-purple-100 text-purple-800' },
  { key: 'data', label: 'Data', color: 'bg-orange-100 text-orange-800' },
  { key: 'devops', label: 'DevOps', color: 'bg-red-100 text-red-800' },
];

export default function Technologies() {
  const { data: technologies = [], isLoading } = useQuery({
    queryKey: ['/api/technologies'],
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pi-blue mx-auto mb-4"></div>
            <p className="text-pi-gray" data-testid="text-loading">Loading technologies...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const groupedTechnologies = techCategories.map(category => ({
    ...category,
    technologies: (technologies as any[]).filter((tech: any) => tech.category === category.key)
  }));

  return (
    <Layout>
      <div className="pt-20 pb-20 bg-gradient-pi-hero text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6" data-testid="text-page-title">
              Our Technology Stack
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8" data-testid="text-page-description">
              We master the frameworks and technologies that power modern solutions
            </p>
          </div>
        </div>
      </div>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {groupedTechnologies.map(category => (
              <div key={category.key} data-testid={`section-${category.key}`}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4" data-testid={`text-category-${category.key}`}>
                  {category.label.toUpperCase()}
                </h3>
                <div className="space-y-2">
                  {category.technologies.length === 0 ? (
                    <p className="text-pi-gray text-sm" data-testid={`text-no-technologies-${category.key}`}>
                      No technologies available
                    </p>
                  ) : (
                    category.technologies.map((tech: any) => (
                      <div key={tech.id} data-testid={`technology-${tech.name.toLowerCase().replace(/\s+/g, '-')}`}>
                        {tech.url ? (
                          <a 
                            href={tech.url}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block text-pi-blue hover:text-pi-blue-dark transition-colors text-sm"
                            data-testid={`link-technology-${tech.name.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {tech.name}
                          </a>
                        ) : (
                          <span className="block text-pi-blue text-sm" data-testid={`text-technology-${tech.name.toLowerCase().replace(/\s+/g, '-')}`}>
                            {tech.name}
                          </span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Technology Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4" data-testid="text-all-technologies-title">
              All Technologies
            </h2>
            <p className="text-xl text-pi-gray" data-testid="text-all-technologies-description">
              Complete list of technologies we work with
            </p>
          </div>

          {!technologies || (technologies as any[]).length === 0 ? (
            <div className="text-center py-12">
              <p className="text-pi-gray text-lg" data-testid="text-no-technologies">No technologies available at the moment.</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3 justify-center">
              {(technologies as any[]).map((tech: any) => {
                const category = techCategories.find(cat => cat.key === tech.category);
                return (
                  <Badge 
                    key={tech.id} 
                    variant="secondary" 
                    className={`text-sm px-3 py-1 ${category?.color || 'bg-gray-100 text-gray-800'}`}
                    data-testid={`badge-technology-${tech.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {tech.name}
                  </Badge>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
