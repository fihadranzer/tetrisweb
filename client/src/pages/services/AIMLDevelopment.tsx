import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Cpu, CheckCircle, Brain, Bot, TrendingUp, Zap, Database, BarChart3, Network, Code, Layers, DollarSign, Target, Shield } from "lucide-react";
import { Link } from "wouter";
import aiImage from "@assets/generated_images/AI_machine_learning_technology_11d627ed.png";

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
              <Brain className="w-10 h-10 text-purple-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">AI & Machine Learning Development</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Transform your business with cutting-edge artificial intelligence and machine learning solutions. From predictive analytics to computer vision, we build AI systems that drive real business value.
          </p>
          
          {/* Hero Image */}
          <div className="max-w-4xl mx-auto mb-12">
            <img 
              src={aiImage} 
              alt="AI/ML Development" 
              className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
            />
          </div>
          
          {/* Key AI Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">85%</div>
              <div className="text-sm text-gray-600">Accuracy Improvement</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
              <div className="text-sm text-gray-600">AI/ML Models</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">50M+</div>
              <div className="text-sm text-gray-600">Data Points Processed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">3x</div>
              <div className="text-sm text-gray-600">Performance Boost</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-12">
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Comprehensive AI/ML Solutions</h2>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-8 mb-8">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Our AI/ML development services span the complete data science lifecycle—from data engineering and model development to deployment and continuous monitoring. We build intelligent systems that learn, adapt, and deliver measurable business outcomes.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Capabilities:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center text-gray-600">
                        <Brain className="w-5 h-5 text-purple-500 mr-3" />
                        Computer Vision & Image Recognition
                      </li>
                      <li className="flex items-center text-gray-600">
                        <Bot className="w-5 h-5 text-purple-500 mr-3" />
                        Natural Language Processing (NLP)
                      </li>
                      <li className="flex items-center text-gray-600">
                        <BarChart3 className="w-5 h-5 text-purple-500 mr-3" />
                        Predictive Analytics & Forecasting
                      </li>
                      <li className="flex items-center text-gray-600">
                        <Network className="w-5 h-5 text-purple-500 mr-3" />
                        Deep Learning & Neural Networks
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Industry Applications:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center text-gray-600">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        Healthcare & Medical Diagnosis
                      </li>
                      <li className="flex items-center text-gray-600">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        Financial Services & FinTech
                      </li>
                      <li className="flex items-center text-gray-600">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        E-commerce & Retail Analytics
                      </li>
                      <li className="flex items-center text-gray-600">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        Manufacturing & Supply Chain
                      </li>
                    </ul>
                  </div>
                </div>
                
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Core AI/ML Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-purple-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <BarChart3 className="w-6 h-6 text-purple-600 mr-3" />
                        <h3 className="text-lg font-semibold">Predictive Analytics</h3>
                      </div>
                      <p className="text-gray-600 mb-4">Advanced forecasting models for demand planning, risk assessment, and customer behavior prediction with 95%+ accuracy.</p>
                      <div className="text-sm text-purple-600">Tools: TensorFlow, PyTorch, Scikit-learn</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-blue-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Brain className="w-6 h-6 text-blue-600 mr-3" />
                        <h3 className="text-lg font-semibold">Computer Vision</h3>
                      </div>
                      <p className="text-gray-600 mb-4">Image classification, object detection, facial recognition, and automated quality inspection systems for real-world applications.</p>
                      <div className="text-sm text-blue-600">Tools: OpenCV, YOLO, ResNet</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-green-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Bot className="w-6 h-6 text-green-600 mr-3" />
                        <h3 className="text-lg font-semibold">Natural Language Processing</h3>
                      </div>
                      <p className="text-gray-600 mb-4">Sentiment analysis, document classification, chatbots, and language translation with state-of-the-art transformer models.</p>
                      <div className="text-sm text-green-600">Tools: BERT, GPT, spaCy</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-orange-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Cpu className="w-6 h-6 text-orange-600 mr-3" />
                        <h3 className="text-lg font-semibold">Deep Learning</h3>
                      </div>
                      <p className="text-gray-600 mb-4">Custom neural network architectures for complex pattern recognition, time series analysis, and autonomous decision making.</p>
                      <div className="text-sm text-orange-600">Tools: Keras, PyTorch Lightning</div>
                    </CardContent>
                  </Card>
                </div>
              </section>
              
              {/* Technology Stack */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our AI/ML Technology Stack</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Code className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">Programming Languages</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Badge>Python</Badge>
                      <Badge>R</Badge>
                      <Badge>Julia</Badge>
                      <Badge>Scala</Badge>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Layers className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">ML Frameworks</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Badge>TensorFlow</Badge>
                      <Badge>PyTorch</Badge>
                      <Badge>Scikit-learn</Badge>
                      <Badge>Keras</Badge>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Database className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">Data & Cloud</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Badge>AWS SageMaker</Badge>
                      <Badge>Google Cloud AI</Badge>
                      <Badge>Azure ML</Badge>
                      <Badge>Docker</Badge>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">AI/ML Development Process</h2>
                <div className="space-y-6">
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold text-sm">1</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Data Discovery & Preparation</h3>
                        <p className="text-gray-600 mb-4">Comprehensive data audit, quality assessment, feature engineering, and preprocessing. We ensure your data is ML-ready and compliant.</p>
                        <div className="text-sm text-purple-600">Duration: 2-3 weeks</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold text-sm">2</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Model Development & Training</h3>
                        <p className="text-gray-600 mb-4">Algorithm selection, hyperparameter tuning, cross-validation, and performance optimization using state-of-the-art ML techniques.</p>
                        <div className="text-sm text-purple-600">Duration: 3-6 weeks</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold text-sm">3</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Model Deployment & Integration</h3>
                        <p className="text-gray-600 mb-4">Production deployment with REST APIs, batch processing pipelines, and seamless integration with existing business systems.</p>
                        <div className="text-sm text-purple-600">Duration: 2-4 weeks</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 font-bold text-sm">4</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Monitoring & Optimization</h3>
                        <p className="text-gray-600 mb-4">Real-time monitoring, performance tracking, model retraining, and continuous improvement with MLOps best practices.</p>
                        <div className="text-sm text-purple-600">Ongoing: Monthly reviews</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Pricing Models */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">AI/ML Project Pricing</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-2 border-purple-200 relative">
                    <div className="absolute -top-3 left-6">
                      <Badge className="bg-purple-600 text-white">Most Popular</Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">Proof of Concept</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-purple-600 mb-4">$15,000<span className="text-lg text-gray-500">-$25,000</span></div>
                      <div className="text-sm text-gray-600 mb-4">4-6 week timeline</div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Data analysis & feasibility study</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Prototype model development</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Performance validation</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Technical documentation</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-xl">Production MVP</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-gray-600 mb-4">$50,000<span className="text-lg text-gray-500">-$100,000</span></div>
                      <div className="text-sm text-gray-600 mb-4">8-12 week timeline</div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Production-ready model</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />API development & deployment</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Monitoring & alerting</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />User interface integration</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-xl">Enterprise Solution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-gray-600 mb-4">$100,000+</div>
                      <div className="text-sm text-gray-600 mb-4">3-6 month timeline</div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Complex multi-model systems</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Scalable infrastructure</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Custom MLOps pipeline</li>
                        <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Training & support</li>
                      </ul>
                    </CardContent>
                  </Card>
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