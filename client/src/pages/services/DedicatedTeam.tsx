import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Users, CheckCircle, Clock, Globe, Award } from "lucide-react";
import { Link } from "wouter";

export default function DedicatedTeam() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/services">
            <span className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors cursor-pointer" data-testid="link-back-services">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </span>
          </Link>
        </nav>

        {/* Service Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-10 h-10 text-blue-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Dedicated Development Team</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Get a full-time dedicated development team that works exclusively on your projects. Scale your development capabilities with experienced professionals who become an extension of your in-house team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose a Dedicated Team?</h2>
                <p className="text-gray-600 mb-6">
                  A dedicated development team is perfect for long-term projects, ongoing product development, or when you need specialized expertise. Your team works exclusively on your project, ensuring deep understanding of your business goals and technical requirements.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Clock className="w-6 h-6 text-blue-600 mr-3" />
                        <h3 className="text-lg font-semibold">Full-Time Commitment</h3>
                      </div>
                      <p className="text-gray-600">Your dedicated team works exclusively on your projects, ensuring maximum focus and productivity.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-green-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Globe className="w-6 h-6 text-green-600 mr-3" />
                        <h3 className="text-lg font-semibold">Global Talent</h3>
                      </div>
                      <p className="text-gray-600">Access skilled developers from around the world, bringing diverse expertise to your projects.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-purple-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Award className="w-6 h-6 text-purple-600 mr-3" />
                        <h3 className="text-lg font-semibold">Proven Experience</h3>
                      </div>
                      <p className="text-gray-600">Our developers have years of experience with modern technologies and best practices.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-orange-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Users className="w-6 h-6 text-orange-600 mr-3" />
                        <h3 className="text-lg font-semibold">Team Integration</h3>
                      </div>
                      <p className="text-gray-600">Seamless integration with your existing team and development workflows.</p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How It Works</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold">1</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Project Assessment</h3>
                      <p className="text-gray-600">We analyze your project requirements, technical stack, and team needs.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold">2</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Team Selection</h3>
                      <p className="text-gray-600">We hand-pick developers with the right skills and experience for your project.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold">3</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Onboarding</h3>
                      <p className="text-gray-600">Quick team integration with your existing processes and tools.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold">4</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Continuous Delivery</h3>
                      <p className="text-gray-600">Regular deliverables, progress updates, and ongoing communication.</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Key Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-sm text-blue-900">Cost-effective scaling</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-sm text-blue-900">Reduced hiring overhead</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-sm text-blue-900">Faster time to market</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-sm text-blue-900">Direct team management</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-sm text-blue-900">Flexible team size</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">AWS</Badge>
                  <Badge variant="secondary">MongoDB</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Docker</Badge>
                  <Badge variant="secondary">PostgreSQL</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Dedicated Team?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss your project requirements and build the perfect development team for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" data-testid="button-get-started">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" data-testid="button-view-portfolio">
                View Our Work
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}