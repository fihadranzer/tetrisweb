import { useQuery } from "@tanstack/react-query";

export default function CaseStudies() {
  const { data: caseStudies, isLoading } = useQuery({
    queryKey: ['/api/case-studies', { featured: 'true' }],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pi-blue"></div>
          </div>
        </div>
      </section>
    );
  }

  // Default case studies if none loaded
  const defaultCaseStudies = [
    {
      id: 1,
      title: 'Transforming Healthcare with AI-Powered Diagnostics',
      shortDescription: 'Built an AI-driven diagnostic platform that reduced diagnosis time by 70% and improved accuracy by 45% for a leading healthcare provider.',
      slug: 'ai-healthcare-platform',
      categoryId: 'ai',
      imageUrl: null
    },
    {
      id: 2,
      title: 'E-commerce Platform Modernization',
      shortDescription: 'Modernized legacy e-commerce platform resulting in 300% performance improvement and 50% increase in conversion rates.',
      slug: 'ecommerce-modernization',
      categoryId: 'web',
      imageUrl: null
    },
    {
      id: 3,
      title: 'Real-Time Data Pipeline Optimization',
      shortDescription: 'Built scalable data infrastructure processing 10TB+ daily, reducing data processing time from hours to minutes.',
      slug: 'data-pipeline-optimization',
      categoryId: 'data',
      imageUrl: null
    }
  ];

  const displayCaseStudies = caseStudies || defaultCaseStudies;

  const getCategoryColor = (categoryId: string) => {
    const colors: Record<string, string> = {
      'ai': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200',
      'web': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200',
      'data': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200',
      'mobile': 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200',
    };
    return colors[categoryId] || 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-200';
  };

  const getCategoryLabel = (categoryId: string) => {
    const labels: Record<string, string> = {
      'ai': 'AI',
      'web': 'Web',
      'data': 'Data',
      'mobile': 'Mobile',
    };
    return labels[categoryId] || 'Case Study';
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4" data-testid="text-case-studies-title">
            Featured Case Studies
          </h2>
          <p className="text-xl text-pi-gray" data-testid="text-case-studies-description">
            See how we've helped our clients achieve their goals through innovative technology solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCaseStudies.map((caseStudy: any) => (
            <div key={caseStudy.id} className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow group" data-testid={`case-study-${caseStudy.slug}`}>
              {caseStudy.imageUrl ? (
                <div className="h-48">
                  <img 
                    src={caseStudy.imageUrl} 
                    alt={caseStudy.title}
                    className="w-full h-full object-cover"
                    data-testid={`img-case-study-${caseStudy.slug}`}
                  />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm font-medium">Case Study</p>
                  </div>
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded ${getCategoryColor(caseStudy.categoryId || 'ai')}`} data-testid={`badge-category-${caseStudy.slug}`}>
                    {getCategoryLabel(caseStudy.categoryId || 'ai')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-pi-blue transition-colors" data-testid={`text-case-study-title-${caseStudy.slug}`}>
                  {caseStudy.title}
                </h3>
                <p className="text-pi-gray text-sm mb-4" data-testid={`text-case-study-description-${caseStudy.slug}`}>
                  {caseStudy.shortDescription}
                </p>
                <a 
                  href={`/case-studies/${caseStudy.slug}`}
                  className="text-pi-blue font-medium hover:text-pi-blue-dark transition-colors"
                  data-testid={`link-case-study-${caseStudy.slug}`}
                >
                  Learn More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
