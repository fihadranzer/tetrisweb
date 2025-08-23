import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Cpu, CheckCircle, Brain, Bot, TrendingUp, Zap } from "lucide-react";
import { Link } from "wouter";

export default function AIMLDevelopment() {
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
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
              <Cpu className="w-10 h-10 text-purple-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">AI & Machine Learning Development</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Transform your business with cutting-edge artificial intelligence and machine learning solutions. From predictive analytics to computer vision, we build AI systems that drive real business value.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">AI Solutions We Build</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-purple-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Brain className="w-6 h-6 text-purple-600 mr-3" />
                        <h3 className="text-lg font-semibold">Machine Learning Models</h3>
                      </div>
                      <p className="text-gray-600">Custom ML models for classification, regression, clustering, and recommendation systems.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Bot className="w-6 h-6 text-blue-600 mr-3" />
                        <h3 className="text-lg font-semibold">AI Chatbots & NLP</h3>
                      </div>
                      <p className="text-gray-600">Intelligent conversational AI, sentiment analysis, and natural language processing.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-green-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <TrendingUp className="w-6 h-6 text-green-600 mr-3" />
                        <h3 className="text-lg font-semibold">Predictive Analytics</h3>
                      </div>
                      <p className="text-gray-600">Forecast trends, predict customer behavior, and optimize business operations.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-orange-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Zap className="w-6 h-6 text-orange-600 mr-3" />
                        <h3 className="text-lg font-semibold">Computer Vision</h3>
                      </div>
                      <p className="text-gray-600">Image recognition, object detection, and visual analysis systems.</p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our AI Development Process</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold">1</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Problem Definition</h3>
                      <p className="text-gray-600">We identify specific business challenges that AI can solve and define success metrics.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold">2</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Data Analysis & Preparation</h3>
                      <p className="text-gray-600">Assess data quality, clean datasets, and prepare training data for optimal model performance.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold">3</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Model Development</h3>
                      <p className="text-gray-600">Design, train, and optimize AI models using latest algorithms and frameworks.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold">4</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Integration & Deployment</h3>
                      <p className="text-gray-600">Seamlessly integrate AI solutions into your existing systems and workflows.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold">5</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Monitoring & Optimization</h3>
                      <p className="text-gray-600">Continuous monitoring and improvement to ensure optimal AI performance.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Use Cases by Industry</h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3">Healthcare</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                      <div>• Medical image analysis</div>
                      <div>• Drug discovery acceleration</div>
                      <div>• Patient risk prediction</div>
                      <div>• Clinical decision support</div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3">Finance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                      <div>• Fraud detection systems</div>
                      <div>• Algorithmic trading</div>
                      <div>• Credit risk assessment</div>
                      <div>• Customer segmentation</div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3">Retail & E-commerce</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                      <div>• Recommendation engines</div>
                      <div>• Dynamic pricing optimization</div>
                      <div>• Inventory management</div>
                      <div>• Customer churn prediction</div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-900">Technologies We Use</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">ML Frameworks</h4>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">TensorFlow</Badge>
                      <Badge variant="secondary" className="text-xs">PyTorch</Badge>
                      <Badge variant="secondary" className="text-xs">Scikit-learn</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">Python</Badge>
                      <Badge variant="secondary" className="text-xs">R</Badge>
                      <Badge variant="secondary" className="text-xs">JavaScript</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Cloud Platforms</h4>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">AWS SageMaker</Badge>
                      <Badge variant="secondary" className="text-xs">Google AI</Badge>
                      <Badge variant="secondary" className="text-xs">Azure ML</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Why Choose Our AI Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="text-sm">Expert AI/ML team</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="text-sm">Proven track record</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="text-sm">End-to-end solutions</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="text-sm">Scalable architectures</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="text-sm">Ongoing support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Harness AI for Your Business?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Let's explore how AI and machine learning can transform your operations and drive innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" data-testid="button-start-ai-project">
                Start AI Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600" data-testid="button-view-ai-cases">
                View AI Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}