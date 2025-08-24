import { useQuery } from "@tanstack/react-query";

export default function Services() {
  const { data: services, isLoading } = useQuery({
    queryKey: ['/api/services'],
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

  // Default services if none are loaded
  const defaultServices = [
    {
      id: 'ai-ml',
      title: 'AI and ML Development',
      shortDescription: 'Build custom AI solutions',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>',
      slug: 'ai-ml'
    },
    {
      id: 'custom-software',
      title: 'Custom Software Development',
      shortDescription: 'Build Custom Software',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>',
      slug: 'custom-software'
    },
    {
      id: 'mobile-app',
      title: 'Mobile App Development',
      shortDescription: 'Build for iOS and Android',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" /></svg>',
      slug: 'mobile-app'
    },
    {
      id: 'data-engineering',
      title: 'Data Engineering',
      shortDescription: 'Modern Data Infrastructure & Analytics',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>',
      slug: 'data-engineering'
    },
    {
      id: 'erp-crm',
      title: 'ERP/CRM/CMS Development',
      shortDescription: 'Enterprise Solutions',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>',
      slug: 'erp-crm'
    },
    {
      id: 'devops-cloud',
      title: 'DevOps and Cloud',
      shortDescription: 'Experts for AWS, Azure, GCP',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" /></svg>',
      slug: 'devops-cloud'
    },
    {
      id: 'chatbots',
      title: 'Chatbot Development',
      shortDescription: 'Create Conversational Apps',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>',
      slug: 'chatbots'
    }
  ];

  const displayServices = services || defaultServices;

  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4" data-testid="text-services-title">
            Our Custom Software Development Solutions Expertise
          </h2>
          <p className="text-xl text-pi-gray max-w-4xl mx-auto" data-testid="text-services-description">
            At Pi Tetris, we master the frameworks and technologies that power modern solutions. With our deep domain expertise, we help you modernize, innovate, and maintain your critical software applications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayServices.slice(0, 7).map((service: any) => (
            <div key={service.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow group" data-testid={`service-${service.slug}`}>
              <div className="w-12 h-12 bg-pi-blue rounded-lg flex items-center justify-center mb-4 group-hover:bg-pi-blue-dark transition-colors">
                {service.icon ? (
                  <div dangerouslySetInnerHTML={{ __html: service.icon }} className="text-white" />
                ) : (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2" data-testid={`text-service-title-${service.slug}`}>
                {service.title}
              </h3>
              <p className="text-pi-gray mb-4" data-testid={`text-service-description-${service.slug}`}>
                {service.shortDescription}
              </p>
              <a 
                href={`/services/${service.slug}`} 
                className="text-pi-blue font-medium hover:text-pi-blue-dark transition-colors"
                data-testid={`link-service-${service.slug}`}
              >
                Learn More →
              </a>
            </div>
          ))}

          {/* Build Intelligent Apps CTA */}
          <div className="bg-gradient-to-br from-pi-blue to-blue-700 text-white rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2" data-testid="text-cta-title">Build Intelligent Apps</h3>
            <p className="text-blue-100 mb-4" data-testid="text-cta-subtitle">Start Today</p>
            <a 
              href="/contact" 
              className="text-white font-medium hover:text-blue-100 transition-colors"
              data-testid="link-cta-contact"
            >
              Contact Us →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
