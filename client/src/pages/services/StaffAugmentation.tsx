import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, TrendingUp, CheckCircle, Zap, Target, Users, Code } from "lucide-react";
import { Link } from "wouter";

export default function StaffAugmentation() {
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
              <TrendingUp className="w-10 h-10 text-green-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Staff Augmentation</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Scale your development team quickly with skilled professionals who integrate seamlessly with your existing team. Get the expertise you need, when you need it, without the overhead of permanent hiring.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Perfect for Growing Teams</h2>
                <p className="text-gray-600 mb-6">
                  Staff augmentation is ideal when you need to scale quickly, fill specific skill gaps, or handle temporary workload increases. Our developers integrate with your team culture and work alongside your existing staff.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-green-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Zap className="w-6 h-6 text-green-600 mr-3" />
                        <h3 className="text-lg font-semibold">Rapid Scaling</h3>
                      </div>
                      <p className="text-gray-600">Add skilled developers to your team within days, not months.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Target className="w-6 h-6 text-blue-600 mr-3" />
                        <h3 className="text-lg font-semibold">Skill-Specific</h3>
                      </div>
                      <p className="text-gray-600">Get exactly the expertise you need for specific technologies or projects.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-purple-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Users className="w-6 h-6 text-purple-600 mr-3" />
                        <h3 className="text-lg font-semibold">Cultural Fit</h3>
                      </div>
                      <p className="text-gray-600">Our developers adapt to your team culture and working style.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-orange-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Code className="w-6 h-6 text-orange-600 mr-3" />
                        <h3 className="text-lg font-semibold">Flexible Duration</h3>
                      </div>
                      <p className="text-gray-600">Short-term or long-term engagements based on your project needs.</p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Available Roles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Frontend Developers</h3>
                    <p className="text-sm text-gray-600">React, Vue.js, Angular, TypeScript</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Backend Developers</h3>
                    <p className="text-sm text-gray-600">Node.js, Python, Java, .NET</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Full-Stack Developers</h3>
                    <p className="text-sm text-gray-600">End-to-end development expertise</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Mobile Developers</h3>
                    <p className="text-sm text-gray-600">iOS, Android, React Native, Flutter</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">DevOps Engineers</h3>
                    <p className="text-sm text-gray-600">AWS, Docker, Kubernetes, CI/CD</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">QA Engineers</h3>
                    <p className="text-sm text-gray-600">Manual and automated testing</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How Staff Augmentation Works</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold">1</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Skills Assessment</h3>
                      <p className="text-gray-600">We identify your specific skill gaps and requirements.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold">2</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Candidate Matching</h3>
                      <p className="text-gray-600">We present pre-vetted candidates that match your technical and cultural requirements.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold">3</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Quick Integration</h3>
                      <p className="text-gray-600">Your new team members start contributing from day one.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold">4</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Ongoing Support</h3>
                      <p className="text-gray-600">Continuous support and performance monitoring throughout the engagement.</p>
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
                <CardTitle className="text-green-900">Key Advantages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm text-green-900">No recruitment costs</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm text-green-900">Immediate availability</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm text-green-900">Flexible contracts</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm text-green-900">Risk mitigation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm text-green-900">Proven expertise</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Industries We Serve</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">• FinTech & Banking</div>
                  <div className="text-sm text-gray-600">• Healthcare & MedTech</div>
                  <div className="text-sm text-gray-600">• E-commerce & Retail</div>
                  <div className="text-sm text-gray-600">• Education Technology</div>
                  <div className="text-sm text-gray-600">• Real Estate & PropTech</div>
                  <div className="text-sm text-gray-600">• Manufacturing & IoT</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Scale Your Team Today</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Need skilled developers quickly? Let's discuss your requirements and find the perfect team members.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" data-testid="button-start-augmentation">
                Start Staff Augmentation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600" data-testid="button-meet-team">
                Meet Our Team
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}