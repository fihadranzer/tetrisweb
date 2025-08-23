import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import NotFound from "@/pages/not-found";

export default function ServiceDetail() {
  const { slug } = useParams();
  
  const { data: service, isLoading } = useQuery({
    queryKey: [`/api/services/${slug}`],
    enabled: !!slug,
  });

  const { data: relatedCaseStudies = [] } = useQuery({
    queryKey: ["/api/case-studies"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!service) {
    return <NotFound />;
  }

  // Filter case studies related to this service
  const serviceRelatedCaseStudies = relatedCaseStudies.filter((cs: any) => 
    cs.technologies?.some((tech: string) => 
      service.technologies?.includes(tech)
    )
  ).slice(0, 3);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/services">
            <a className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors" data-testid="link-back-services">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </a>
          </Link>
        </nav>

        {/* Service Header */}
        <div className="mb-16">
          <div className="flex items-center mb-4">
            {service.iconUrl && (
              <img src={service.iconUrl} alt="" className="w-16 h-16 mr-4" />
            )}
            <h1 className="text-5xl font-bold text-gray-900">{service.title}</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-4xl">{service.shortDescription}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Long Description */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Service Overview</h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                {service.longDescription ? (
                  <div dangerouslySetInnerHTML={{ __html: service.longDescription }} />
                ) : (
                  <p>{service.shortDescription}</p>
                )}
              </div>
            </div>

            {/* Features */}
            {service.features && service.features.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            {service.technologies && service.technologies.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Technologies We Use</h2>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-sm py-2 px-3">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Related Case Studies */}
            {serviceRelatedCaseStudies.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Case Studies</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {serviceRelatedCaseStudies.map((caseStudy: any) => (
                    <Card key={caseStudy.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{caseStudy.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{caseStudy.shortDescription}</p>
                        <Link href={`/case-studies/${caseStudy.slug}`}>
                          <Button variant="outline" size="sm" data-testid={`button-view-case-study-${caseStudy.slug}`}>
                            View Case Study
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Ready to Get Started?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Let's discuss how our {service.title.toLowerCase()} can help transform your business.
                </p>
                <Link href="/contact">
                  <Button className="w-full" data-testid="button-get-quote">
                    Get a Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button variant="outline" className="w-full" data-testid="button-view-portfolio">
                    View Our Portfolio
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
