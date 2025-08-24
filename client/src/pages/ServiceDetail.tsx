import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, CheckCircle, Users, Award, Zap, Code, Smartphone } from "lucide-react";
import NotFound from "@/pages/not-found";
import webDevImage from "@assets/generated_images/Web_development_professional_illustration_cbd88cc2.png";
import mobileDevImage from "@assets/generated_images/Mobile_app_development_illustration_30e59701.png";

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

  // Get the appropriate hero image based on service slug
  const getHeroImage = () => {
    if (service.slug === 'web-application-development') {
      return webDevImage;
    } else if (service.slug === 'mobile-app-development') {
      return mobileDevImage;
    }
    return null;
  };

  const heroImage = getHeroImage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link href="/services">
              <span className="inline-flex items-center text-blue-200 hover:text-white transition-colors cursor-pointer" data-testid="link-back-services">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Services
              </span>
            </Link>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="flex items-center mb-6">
                {service.slug === 'web-application-development' ? (
                  <Code className="w-12 h-12 text-blue-300 mr-4" />
                ) : service.slug === 'mobile-app-development' ? (
                  <Smartphone className="w-12 h-12 text-blue-300 mr-4" />
                ) : service.iconUrl && (
                  <img src={service.iconUrl} alt="" className="w-12 h-12 mr-4" />
                )}
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold leading-tight">{service.title}</h1>
                </div>
              </div>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">{service.shortDescription}</p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50" data-testid="button-get-started">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900" data-testid="button-view-work">
                    View Our Work
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Image */}
            {heroImage && (
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt={`${service.title} illustration`} 
                  className="w-full h-auto rounded-2xl shadow-2xl"
                  data-testid="img-service-hero"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500 rounded-full opacity-20"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-indigo-400 rounded-full opacity-30"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-0">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Expert Team</h3>
              <p className="text-gray-600">Dedicated professionals with years of experience</p>
            </CardContent>
          </Card>
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-0">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Quality Assured</h3>
              <p className="text-gray-600">Rigorous testing and quality control processes</p>
            </CardContent>
          </Card>
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-0">
              <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Agile development with rapid iteration cycles</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Service Overview */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Service Overview</h2>
              <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-0">
                <div className="prose prose-lg max-w-none text-gray-700">
                  {service.longDescription ? (
                    <div dangerouslySetInnerHTML={{ __html: service.longDescription }} />
                  ) : (
                    <p>{service.shortDescription}</p>
                  )}
                </div>
              </Card>
            </div>

            {/* Features */}
            {service.features && service.features.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.features.map((feature: string, index: number) => (
                    <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <span className="text-gray-800 font-medium">{feature}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            {service.technologies && service.technologies.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Technologies We Use</h2>
                <Card className="p-6">
                  <div className="flex flex-wrap gap-3">
                    {service.technologies.map((tech: string, index: number) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="text-sm py-2 px-4 bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </Card>
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
            <div className="space-y-6">
              {/* CTA Card */}
              <Card className="sticky top-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                <CardHeader>
                  <CardTitle className="text-white">Ready to Get Started?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-blue-100">
                    Let's discuss how our {service.title.toLowerCase()} can help transform your business.
                  </p>
                  <Link href="/contact">
                    <Button className="w-full bg-white text-blue-600 hover:bg-blue-50" data-testid="button-get-quote">
                      Get a Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/portfolio">
                    <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-blue-600" data-testid="button-view-portfolio">
                      View Our Portfolio
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Process Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Our Process</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        1
                      </div>
                      <span className="text-sm font-medium">Discovery & Planning</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        2
                      </div>
                      <span className="text-sm font-medium">Design & Architecture</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        3
                      </div>
                      <span className="text-sm font-medium">Development & Testing</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        4
                      </div>
                      <span className="text-sm font-medium">Launch & Support</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
