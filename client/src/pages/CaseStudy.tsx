import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";

export default function CaseStudy() {
  const params = useParams();
  const slug = params.slug;

  const { data: caseStudy, isLoading, error } = useQuery({
    queryKey: ['/api/case-studies', slug],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pi-blue mx-auto mb-4"></div>
            <p className="text-pi-gray" data-testid="text-loading">Loading case study...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !caseStudy) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4" data-testid="text-error-title">Case Study Not Found</h1>
            <p className="text-pi-gray mb-8" data-testid="text-error-description">
              The case study you're looking for doesn't exist or has been moved.
            </p>
            <a 
              href="/portfolio" 
              className="bg-pi-blue text-white px-6 py-2 rounded-lg hover:bg-pi-blue-dark transition-colors"
              data-testid="link-back-portfolio"
            >
              Back to Portfolio
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  const technologies = caseStudy.technologies ? JSON.parse(caseStudy.technologies) : [];
  const results = caseStudy.results ? JSON.parse(caseStudy.results) : [];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="pt-20 pb-20 bg-gradient-pi-hero text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Badge variant="secondary" className="mb-4" data-testid="badge-case-study">
                Case Study
              </Badge>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6" data-testid="text-case-study-title">
              {caseStudy.title}
            </h1>
            {caseStudy.shortDescription && (
              <p className="text-xl lg:text-2xl text-blue-100 mb-8" data-testid="text-case-study-description">
                {caseStudy.shortDescription}
              </p>
            )}
            {caseStudy.publishedAt && (
              <p className="text-blue-200" data-testid="text-case-study-date">
                Published on {new Date(caseStudy.publishedAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Case Study Image */}
      {caseStudy.imageUrl && (
        <div className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <img 
              src={caseStudy.imageUrl}
              alt={caseStudy.title}
              className="w-full h-96 object-cover rounded-xl shadow-lg"
              data-testid="img-case-study-hero"
            />
          </div>
        </div>
      )}

      {/* Case Study Content */}
      <div className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none dark:prose-invert" data-testid="content-case-study">
            <div dangerouslySetInnerHTML={{ __html: caseStudy.content }} />
          </div>

          {/* Technologies Used */}
          {technologies.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4" data-testid="text-technologies-title">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech: string, index: number) => (
                  <Badge key={index} variant="outline" data-testid={`badge-technology-${index}`}>
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Key Results */}
          {results.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4" data-testid="text-results-title">
                Key Results
              </h3>
              <ul className="space-y-2">
                {results.map((result: string, index: number) => (
                  <li key={index} className="flex items-start" data-testid={`result-item-${index}`}>
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4" data-testid="text-cta-title">
              Ready to Start Your Project?
            </h3>
            <p className="text-pi-gray mb-6" data-testid="text-cta-description">
              Let's discuss how we can help you achieve similar results.
            </p>
            <a 
              href="/contact"
              className="bg-pi-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-pi-blue-dark transition-colors"
              data-testid="button-contact"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
