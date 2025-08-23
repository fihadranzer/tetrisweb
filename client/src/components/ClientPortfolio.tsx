import { useQuery } from "@tanstack/react-query";

export default function ClientPortfolio() {
  const { data: clients, isLoading } = useQuery({
    queryKey: ['/api/clients', { featured: 'true' }],
  });

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

  // Default client data if none loaded
  const defaultClients = [
    { id: 1, name: 'TechFlow Solutions', description: 'Web Application Development. Designed and developed backend tooling.' },
    { id: 2, name: 'Global Media Corp', description: 'Developed Generative AI Voice Assistant for Gaming. Built Standalone AI model (NLP)' },
    { id: 3, name: 'DataVantage Inc', description: 'Designed, Developed, and Deployed Automated Knowledge Discovery Engine' },
    { id: 4, name: 'FinanceFirst', description: 'Backend Architectural Design. Data Engineering and Application Development' },
    { id: 5, name: 'HealthTech Plus', description: 'Application Development and Design. Deployment and Management.' },
    { id: 6, name: 'EduSmart Systems', description: 'Data Engineering. Custom Development. Computer Vision: Super Resolution' }
  ];

  const displayClients = clients || defaultClients;

  return (
    <section id="portfolio" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4" data-testid="text-client-portfolio-title">
            A Few of Our Clients
          </h2>
          <p className="text-xl text-pi-gray" data-testid="text-client-portfolio-description">
            A selection of our custom software development services customers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayClients.map((client: any) => (
            <div key={client.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow" data-testid={`client-${client.name.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                {client.logoUrl ? (
                  <img 
                    src={client.logoUrl} 
                    alt={client.name}
                    className="h-12 w-auto object-contain"
                    data-testid={`img-client-logo-${client.name.toLowerCase().replace(/\s+/g, '-')}`}
                  />
                ) : (
                  <span className="text-gray-600 dark:text-gray-400 font-semibold" data-testid={`text-client-name-${client.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    {client.name}
                  </span>
                )}
              </div>
              <p className="text-pi-gray text-sm" data-testid={`text-client-description-${client.name.toLowerCase().replace(/\s+/g, '-')}`}>
                {client.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
