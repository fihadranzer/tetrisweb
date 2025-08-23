import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Code, CheckCircle, Layers, Zap, Settings, Globe } from "lucide-react";
import { Link } from "wouter";

export default function CustomSoftwareDevelopment() {
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
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <Code className="w-10 h-10 text-green-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Custom Software Development</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Build tailored software solutions that perfectly fit your business needs. From concept to deployment, we create scalable, secure, and user-friendly applications that drive your business forward.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Development Approach</h2>
                <p className="text-gray-600 mb-6">
                  We build custom software that solves real business problems. Our approach combines industry best practices with innovative technologies to deliver solutions that scale with your business.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-green-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Layers className="w-6 h-6 text-green-600 mr-3" />
                        <h3 className="text-lg font-semibold">Scalable Architecture</h3>
                      </div>
                      <p className="text-gray-600">Modern, scalable architectures that grow with your business needs.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Settings className="w-6 h-6 text-blue-600 mr-3" />
                        <h3 className="text-lg font-semibold">Agile Development</h3>
                      </div>
                      <p className="text-gray-600">Iterative development process with regular feedback and adjustments.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-purple-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Zap className="w-6 h-6 text-purple-600 mr-3" />
                        <h3 className="text-lg font-semibold">Performance Focused</h3>
                      </div>
                      <p className="text-gray-600">Optimized for speed, efficiency, and exceptional user experience.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-orange-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Globe className="w-6 h-6 text-orange-600 mr-3" />
                        <h3 className="text-lg font-semibold">Cross-Platform</h3>
                      </div>
                      <p className="text-gray-600">Solutions that work seamlessly across all platforms and devices.</p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Development Services</h2>
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Web Applications</h3>
                    <p className="text-gray-600 mb-4">
                      Full-stack web applications with modern frameworks and responsive design.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <Badge variant="secondary">React</Badge>
                      <Badge variant="secondary">Vue.js</Badge>
                      <Badge variant="secondary">Angular</Badge>
                      <Badge variant="secondary">Node.js</Badge>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Desktop Applications</h3>
                    <p className="text-gray-600 mb-4">
                      Native and cross-platform desktop applications for Windows, macOS, and Linux.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <Badge variant="secondary">Electron</Badge>
                      <Badge variant="secondary">.NET</Badge>
                      <Badge variant="secondary">Java</Badge>
                      <Badge variant="secondary">Python</Badge>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">API Development</h3>
                    <p className="text-gray-600 mb-4">
                      RESTful APIs and microservices for system integration and data access.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <Badge variant="secondary">REST API</Badge>
                      <Badge variant="secondary">GraphQL</Badge>
                      <Badge variant="secondary">Microservices</Badge>
                      <Badge variant="secondary">OAuth</Badge>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Development Process</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold">1</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Discovery & Planning</h3>
                      <p className="text-gray-600">Deep dive into your requirements, goals, and technical constraints.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold">2</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Design & Architecture</h3>
                      <p className="text-gray-600">Create detailed designs, wireframes, and technical architecture.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold">3</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Development & Testing</h3>
                      <p className="text-gray-600">Agile development with continuous testing and quality assurance.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold">4</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Deployment & Launch</h3>
                      <p className="text-gray-600">Smooth deployment with monitoring and performance optimization.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold">5</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Maintenance & Support</h3>
                      <p className="text-gray-600">Ongoing support, updates, and feature enhancements.</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-900">Why Custom Software?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm text-green-900">Perfect fit for your needs</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm text-green-900">Competitive advantage</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm text-green-900">Scalable architecture</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm text-green-900">Full ownership</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm text-green-900">Integration flexibility</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Technology Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Frontend</h4>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">React</Badge>
                      <Badge variant="secondary" className="text-xs">Vue.js</Badge>
                      <Badge variant="secondary" className="text-xs">Angular</Badge>
                      <Badge variant="secondary" className="text-xs">TypeScript</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Backend</h4>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">Node.js</Badge>
                      <Badge variant="secondary" className="text-xs">Python</Badge>
                      <Badge variant="secondary" className="text-xs">.NET</Badge>
                      <Badge variant="secondary" className="text-xs">Java</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Cloud & DevOps</h4>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">AWS</Badge>
                      <Badge variant="secondary" className="text-xs">Docker</Badge>
                      <Badge variant="secondary" className="text-xs">Kubernetes</Badge>
                      <Badge variant="secondary" className="text-xs">CI/CD</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Custom Solution?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Let's discuss your project requirements and create a tailored software solution that drives your business success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" data-testid="button-start-custom-project">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600" data-testid="button-view-custom-portfolio">
                View Our Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}