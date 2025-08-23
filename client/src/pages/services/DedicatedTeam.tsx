import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Users, CheckCircle, Clock, Globe, Award, Code, Shield, Zap, Target, Star, DollarSign } from "lucide-react";
import { Link } from "wouter";
import dedicatedTeamImage from "@assets/generated_images/Dedicated_development_team_illustration_bd7e54c5.png";
import processImage from "@assets/generated_images/Software_development_process_visualization_499e87c0.png";

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
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Get a full-time dedicated development team that works exclusively on your projects. Scale your development capabilities with experienced professionals who become an extension of your in-house team.
          </p>
          
          {/* Hero Image */}
          <div className="max-w-4xl mx-auto mb-12">
            <img 
              src={dedicatedTeamImage} 
              alt="Dedicated Development Team" 
              className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
            />
          </div>
          
          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-sm text-gray-600">Expert Developers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-sm text-gray-600">Client Retention</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">2-4</div>
              <div className="text-sm text-gray-600">Weeks to Start</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-12">
              {/* Overview Section */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What is a Dedicated Development Team?</h2>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8 mb-8">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    A dedicated development team is a group of skilled professionals who work exclusively on your project as an extension of your in-house team. Unlike traditional outsourcing, you have full control over the team composition, workflow, and project direction while we handle recruitment, HR, and administrative tasks.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Perfect For:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center text-gray-600">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        Long-term projects (6+ months)
                      </li>
                      <li className="flex items-center text-gray-600">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        Product development & evolution
                      </li>
                      <li className="flex items-center text-gray-600">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        Scaling existing teams
                      </li>
                      <li className="flex items-center text-gray-600">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        Complex enterprise solutions
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Team Composition:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center text-gray-600">
                        <Code className="w-5 h-5 text-blue-500 mr-3" />
                        Senior & Mid-level Developers
                      </li>
                      <li className="flex items-center text-gray-600">
                        <Target className="w-5 h-5 text-blue-500 mr-3" />
                        Project Manager/Scrum Master
                      </li>
                      <li className="flex items-center text-gray-600">
                        <Shield className="w-5 h-5 text-blue-500 mr-3" />
                        QA Engineers
                      </li>
                      <li className="flex items-center text-gray-600">
                        <Globe className="w-5 h-5 text-blue-500 mr-3" />
                        DevOps Specialists
                      </li>
                    </ul>
                  </div>
                </div>
                
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Key Advantages</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-blue-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Clock className="w-6 h-6 text-blue-600 mr-3" />
                        <h3 className="text-lg font-semibold">Full-Time Commitment</h3>
                      </div>
                      <p className="text-gray-600">Your dedicated team works exclusively on your projects, ensuring maximum focus and productivity with 40+ hours per week dedication.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-green-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <DollarSign className="w-6 h-6 text-green-600 mr-3" />
                        <h3 className="text-lg font-semibold">Cost Effective</h3>
                      </div>
                      <p className="text-gray-600">Save up to 60% on development costs compared to local hiring while maintaining high quality standards.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-purple-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Zap className="w-6 h-6 text-purple-600 mr-3" />
                        <h3 className="text-lg font-semibold">Rapid Scaling</h3>
                      </div>
                      <p className="text-gray-600">Scale your team up or down based on project requirements without the hassle of recruitment and HR processes.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-orange-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Shield className="w-6 h-6 text-orange-600 mr-3" />
                        <h3 className="text-lg font-semibold">Risk Mitigation</h3>
                      </div>
                      <p className="text-gray-600">Reduce project risks with experienced professionals and established development processes.</p>
                    </CardContent>
                  </Card>
                </div>
              </section>
              
              {/* Process Image Section */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Development Process</h2>
                <div className="mb-8">
                  <img 
                    src={processImage} 
                    alt="Software Development Process" 
                    className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
                  />
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Getting Started Process</h2>
                <div className="space-y-6">
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold text-sm">1</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Discovery & Requirements Analysis</h3>
                        <p className="text-gray-600 mb-4">Comprehensive analysis of your project scope, technical requirements, timeline, and budget. We'll understand your business goals and technical constraints.</p>
                        <div className="text-sm text-blue-600">Duration: 1-2 weeks</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold text-sm">2</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Team Assembly & Selection</h3>
                        <p className="text-gray-600 mb-4">Hand-picked team members based on required skills, experience level, and cultural fit. You'll interview and approve each team member.</p>
                        <div className="text-sm text-blue-600">Duration: 1-2 weeks</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold text-sm">3</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Project Setup & Integration</h3>
                        <p className="text-gray-600 mb-4">Infrastructure setup, access provisioning, tool integration, and team onboarding. Establish communication channels and workflows.</p>
                        <div className="text-sm text-blue-600">Duration: 1 week</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold text-sm">4</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Development & Delivery</h3>
                        <p className="text-gray-600 mb-4">Agile development cycles with regular sprint reviews, demos, and continuous integration. Weekly progress reports and monthly reviews.</p>
                        <div className="text-sm text-blue-600">Ongoing: 2-week sprints</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Pricing Models */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Flexible Engagement Models</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-2 border-blue-200 relative">
                    <div className="absolute -top-3 left-6">
                      <Badge className="bg-blue-600 text-white">Most Popular</Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">Fixed Team</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-600 mb-4">$3,500<span className="text-lg text-gray-500">/month</span></div>
                      <div className="text-sm text-gray-600 mb-4">Per developer</div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Full-time dedicated developer</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />40+ hours per week</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Project management included</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Quality assurance</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-xl">Scalable Team</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-gray-600 mb-4">$3,200<span className="text-lg text-gray-500">/month</span></div>
                      <div className="text-sm text-gray-600 mb-4">Per developer (5+ devs)</div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Team of 5+ developers</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Flexible scaling</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Tech lead included</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Architecture guidance</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-xl">Enterprise</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-gray-600 mb-4">Custom</div>
                      <div className="text-sm text-gray-600 mb-4">Tailored solution</div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Large teams (10+ devs)</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Multiple technologies</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Custom SLAs</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />24/7 support</li>
                      </ul>
                    </CardContent>
                  </Card>
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