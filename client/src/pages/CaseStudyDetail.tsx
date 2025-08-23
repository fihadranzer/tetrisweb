import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Clock, Users, Target, CheckCircle } from "lucide-react";
import NotFound from "@/pages/not-found";

export default function CaseStudyDetail() {
  const { slug } = useParams();
  
  const { data: caseStudy, isLoading } = useQuery({
    queryKey: [`/api/case-studies/${slug}`],
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

  if (!caseStudy) {
    return <NotFound />;
  }

  // Filter related case studies (exclude current one and limit to 3)
  const related = relatedCaseStudies
    .filter((cs: any) => cs.id !== caseStudy.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/portfolio">
            <a className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors" data-testid="link-back-portfolio">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </a>
          </Link>
        </nav>

        {/* Hero Image */}
        {caseStudy.imageUrl && (
          <div className="mb-12 rounded-2xl overflow-hidden">
            <img 
              src={caseStudy.imageUrl} 
              alt={caseStudy.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        )}

        {/* Header */}
        <div className="mb-16">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {caseStudy.isFeatured && (
              <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
            )}
            {caseStudy.tags && caseStudy.tags.map((tag: string, index: number) => (
              <Badge key={index} variant="outline">{tag}</Badge>
            ))}
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{caseStudy.title}</h1>
          
          {caseStudy.clientName && (
            <p className="text-xl text-gray-600 mb-6">Client: {caseStudy.clientName}</p>
          )}
          
          <p className="text-xl text-gray-600 max-w-4xl">{caseStudy.shortDescription}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Project Overview */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Overview</h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                {caseStudy.longDescription ? (
                  <div dangerouslySetInnerHTML={{ __html: caseStudy.longDescription }} />
                ) : (
                  <p>{caseStudy.shortDescription}</p>
                )}
              </div>
            </section>

            {/* Challenge */}
            {caseStudy.challenge && (
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">The Challenge</h2>
                <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
                  <div className="prose prose-lg max-w-none text-gray-700">
                    <div dangerouslySetInnerHTML={{ __html: caseStudy.challenge }} />
                  </div>
                </div>
              </section>
            )}

            {/* Solution */}
            {caseStudy.solution && (
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Solution</h2>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                  <div className="prose prose-lg max-w-none text-gray-700">
                    <div dangerouslySetInnerHTML={{ __html: caseStudy.solution }} />
                  </div>
                </div>
              </section>
            )}

            {/* Results */}
            {caseStudy.results && (
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Results & Impact</h2>
                <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
                  <div className="prose prose-lg max-w-none text-gray-700">
                    <div dangerouslySetInnerHTML={{ __html: caseStudy.results }} />
                  </div>
                </div>
              </section>
            )}

            {/* Technologies */}
            {caseStudy.technologies && caseStudy.technologies.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Technologies Used</h2>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.technologies.map((tech: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-sm py-2 px-3">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Project Details */}
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {caseStudy.projectDuration && (
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm text-gray-600">Duration</div>
                      <div className="font-medium">{caseStudy.projectDuration}</div>
                    </div>
                  </div>
                )}
                
                {caseStudy.teamSize && (
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm text-gray-600">Team Size</div>
                      <div className="font-medium">{caseStudy.teamSize} developers</div>
                    </div>
                  </div>
                )}
                
                {caseStudy.clientName && (
                  <div className="flex items-center">
                    <Target className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm text-gray-600">Client</div>
                      <div className="font-medium">{caseStudy.clientName}</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card>
              <CardHeader>
                <CardTitle>Interested in Similar Results?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Let's discuss how we can help you achieve similar success with your project.
                </p>
                <Link href="/contact">
                  <Button className="w-full" data-testid="button-start-project">
                    Start Your Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="outline" className="w-full" data-testid="button-explore-services">
                    Explore Our Services
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Case Studies */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Case Studies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((relatedCase: any) => (
                <Card key={relatedCase.id} className="hover:shadow-lg transition-shadow">
                  {relatedCase.imageUrl && (
                    <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                      <img 
                        src={relatedCase.imageUrl} 
                        alt={relatedCase.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg">{relatedCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{relatedCase.shortDescription}</p>
                    <Link href={`/case-studies/${relatedCase.slug}`}>
                      <Button variant="outline" size="sm" data-testid={`button-view-related-case-${relatedCase.slug}`}>
                        View Case Study
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
