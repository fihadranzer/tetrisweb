import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Building2, CheckCircle, Users, Database, Settings, BarChart } from "lucide-react";
import { Link } from "wouter";

export default function ERPCRMCMSDevelopment() {
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
              <Building2 className="w-10 h-10 text-blue-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">ERP, CRM & CMS Development</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Streamline your business operations with custom Enterprise Resource Planning, Customer Relationship Management, and Content Management solutions tailored to your specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Enterprise Solutions</h2>
                <div className="grid grid-cols-1 gap-6">
                  <Card className="border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Settings className="w-6 h-6 text-blue-600 mr-3" />
                        <h3 className="text-xl font-semibold">ERP Systems</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Integrate all your business processes into a single, unified system. Our ERP solutions cover finance, HR, supply chain, manufacturing, and more.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">Financial Management</span>
                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">Inventory Control</span>
                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">HR Management</span>
                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">Supply Chain</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-green-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Users className="w-6 h-6 text-green-600 mr-3" />
                        <h3 className="text-xl font-semibold">CRM Systems</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Manage customer relationships, track sales pipelines, and enhance customer service with our comprehensive CRM solutions.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">Lead Management</span>
                        <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">Sales Pipeline</span>
                        <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">Customer Support</span>
                        <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">Marketing Automation</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-purple-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Database className="w-6 h-6 text-purple-600 mr-3" />
                        <h3 className="text-xl font-semibold">CMS Platforms</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Create, manage, and publish content effortlessly with our custom content management systems designed for your workflow.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">Content Creation</span>
                        <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">Multi-site Management</span>
                        <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">SEO Optimization</span>
                        <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">User Permissions</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Implementation Approach</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold">1</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Business Analysis</h3>
                      <p className="text-gray-600">Comprehensive analysis of your current processes, pain points, and requirements.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold">2</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">System Design</h3>
                      <p className="text-gray-600">Custom architecture design that fits your specific business model and scalability needs.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold">3</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Phased Development</h3>
                      <p className="text-gray-600">Incremental development and deployment to minimize business disruption.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold">4</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Data Migration</h3>
                      <p className="text-gray-600">Secure and accurate migration of existing data to the new system.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold">5</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Training & Support</h3>
                      <p className="text-gray-600">Comprehensive user training and ongoing technical support.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Industry-Specific Solutions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3">Manufacturing</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Production planning & scheduling</li>
                      <li>• Quality management systems</li>
                      <li>• Equipment maintenance tracking</li>
                      <li>• Supply chain optimization</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3">Retail & E-commerce</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Multi-channel inventory management</li>
                      <li>• Customer loyalty programs</li>
                      <li>• Point of sale integration</li>
                      <li>• Order management systems</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3">Healthcare</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Patient management systems</li>
                      <li>• Medical records management</li>
                      <li>• Appointment scheduling</li>
                      <li>• Billing & insurance processing</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3">Professional Services</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Project management & tracking</li>
                      <li>• Time & expense management</li>
                      <li>• Client portal & communication</li>
                      <li>• Resource allocation</li>
                    </ul>
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
                    <span className="text-sm text-blue-900">Streamlined workflows</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-sm text-blue-900">Real-time reporting</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-sm text-blue-900">Improved efficiency</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-sm text-blue-900">Better data visibility</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-sm text-blue-900">Scalable architecture</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
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
                    <h4 className="font-semibold text-sm mb-2">Databases</h4>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">PostgreSQL</Badge>
                      <Badge variant="secondary" className="text-xs">MongoDB</Badge>
                      <Badge variant="secondary" className="text-xs">Oracle</Badge>
                      <Badge variant="secondary" className="text-xs">SQL Server</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Frontend</h4>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">React</Badge>
                      <Badge variant="secondary" className="text-xs">Angular</Badge>
                      <Badge variant="secondary" className="text-xs">Vue.js</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Transform Your Business Operations</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Ready to streamline your processes with custom ERP, CRM, or CMS solutions? Let's discuss your requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" data-testid="button-start-enterprise-project">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" data-testid="button-view-enterprise-cases">
                View Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}