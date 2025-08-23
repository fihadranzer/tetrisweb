import { useQuery } from "@tanstack/react-query";

export default function TechnologyStack() {
  const { data: technologies, isLoading } = useQuery({
    queryKey: ['/api/technologies'],
  });

  // Default technologies if none loaded
  const defaultTechnologies = {
    'backend': [
      { name: 'C#', url: '#' },
      { name: '.Net', url: '#' },
      { name: 'Java', url: '#' },
      { name: 'NEXT.js', url: '#' },
      { name: 'Node.js', url: '#' },
      { name: 'PHP', url: '#' },
      { name: 'Python', url: '#' },
      { name: 'Unity', url: '#' }
    ],
    'frontend': [
      { name: 'Angular', url: '#' },
      { name: 'React', url: '#' },
      { name: 'Vue.js', url: '#' },
      { name: 'Svelte', url: '#' },
      { name: 'TypeScript', url: '#' },
      { name: 'JavaScript', url: '#' }
    ],
    'ai-ml': [
      { name: 'OpenAI', url: '#' },
      { name: 'Anthropic', url: '#' },
      { name: 'TensorFlow', url: '#' },
      { name: 'PyTorch', url: '#' },
      { name: 'Keras', url: '#' },
      { name: 'LLaMA', url: '#' },
      { name: 'Databricks', url: '#' }
    ],
    'devops': [
      { name: 'AWS', url: '#' },
      { name: 'Azure', url: '#' },
      { name: 'Google Cloud', url: '#' },
      { name: 'Docker', url: '#' },
      { name: 'Kubernetes', url: '#' },
      { name: 'Terraform', url: '#' }
    ]
  };

  const getTechnologiesByCategory = (category: string) => {
    if (technologies) {
      return technologies.filter((tech: any) => tech.category === category);
    }
    return (defaultTechnologies as any)[category] || [];
  };

  const categories = [
    { key: 'backend', label: 'BACK-END' },
    { key: 'frontend', label: 'FRONT-END' },
    { key: 'ai-ml', label: 'AI/ML' },
    { key: 'devops', label: 'DEVOPS' }
  ];

  if (isLoading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pi-blue"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="technologies" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4" data-testid="text-tech-stack-title">
            We are a Full Stack Software Development Company
          </h2>
          <p className="text-xl text-pi-gray max-w-4xl mx-auto" data-testid="text-tech-stack-description">
            We have built a business focused on assembling talented developers who have mastered the frameworks and technologies that power modern solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {categories.map(category => {
            const categoryTechs = getTechnologiesByCategory(category.key);
            
            return (
              <div key={category.key} data-testid={`tech-category-${category.key}`}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4" data-testid={`text-category-${category.key}`}>
                  {category.label}
                </h3>
                <div className="space-y-2">
                  {categoryTechs.length === 0 ? (
                    <p className="text-pi-gray text-sm">No technologies available</p>
                  ) : (
                    categoryTechs.map((tech: any, index: number) => (
                      <div key={index}>
                        {tech.url ? (
                          <a 
                            href={tech.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-pi-blue hover:text-pi-blue-dark transition-colors"
                            data-testid={`link-tech-${tech.name.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {tech.name}
                          </a>
                        ) : (
                          <span 
                            className="block text-pi-blue"
                            data-testid={`text-tech-${tech.name.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {tech.name}
                          </span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <a 
            href="/technologies"
            className="bg-pi-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-pi-blue-dark transition-colors"
            data-testid="button-view-all-technologies"
          >
            View All Technologies
          </a>
        </div>
      </div>
    </section>
  );
}
