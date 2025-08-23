export default function ServiceModels() {
  const serviceModels = [
    {
      id: 'staff-augmentation',
      title: 'Software Staff Augmentation',
      description: 'We scale your team with the essential personnel your development team needs.',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>',
      link: '/services/staff-augmentation'
    },
    {
      id: 'dedicated-team',
      title: 'Dedicated Development Team',
      description: 'We build dedicated outsourced development teams.',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" /></svg>',
      link: '/services/dedicated-team'
    },
    {
      id: 'project-delivery',
      title: 'Project Delivery & Management',
      description: 'We write requirements, manage tasks, and deliver your software solution.',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
      link: '/services/project-delivery'
    },
    {
      id: 'virtual-cto',
      title: 'Virtual CTO Consulting Services',
      description: 'We advise and architect scaleable and secure technology solutions for AI, Data, and Web.',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>',
      link: '/services/virtual-cto'
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4" data-testid="text-service-models-title">
            Our Software Service Models
          </h2>
          <p className="text-xl text-pi-gray max-w-4xl mx-auto" data-testid="text-service-models-description">
            We are here to accommodate you. From a single pair of hands to entire teams and expert technical advice, we are flexible enough to support you in the ways you need.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceModels.map((model) => (
            <div key={model.id} className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow" data-testid={`service-model-${model.id}`}>
              <div className="w-12 h-12 bg-pi-blue rounded-lg flex items-center justify-center mb-4">
                <div dangerouslySetInnerHTML={{ __html: model.icon }} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2" data-testid={`text-model-title-${model.id}`}>
                {model.title}
              </h3>
              <p className="text-pi-gray mb-4" data-testid={`text-model-description-${model.id}`}>
                {model.description}
              </p>
              <a 
                href={model.link} 
                className="text-pi-blue font-medium hover:text-pi-blue-dark transition-colors"
                data-testid={`link-model-${model.id}`}
              >
                Learn More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
