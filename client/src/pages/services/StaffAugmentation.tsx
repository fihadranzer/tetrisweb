import { ArrowRight, Users, Zap, Shield, Globe, CheckCircle, Clock, Target, Code, TrendingUp, Award, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function StaffAugmentation() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <TrendingUp className="w-10 h-10" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6">Staff Augmentation Services</h1>
            <p className="text-xl text-emerald-100 max-w-4xl mx-auto leading-relaxed mb-8">
              Scale your development capacity rapidly with skilled professionals who integrate seamlessly with your existing team. Get the exact expertise you need, when you need it, without long-term commitments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300" data-testid="button-scale-team">
                  Scale Your Team Now
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-emerald-700 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300" data-testid="button-view-talent">
                  View Our Talent
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Flexible Staff Augmentation Solutions</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              From individual specialists to complete teams, we provide pre-vetted developers who integrate quickly and contribute immediately to your projects.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-blue-500">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Senior Software Developers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Experienced full-stack, frontend, backend, and mobile developers with 5+ years of expertise in modern technologies and frameworks.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      React, Angular, Vue.js specialists
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Node.js, Python, Java experts
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Mobile & cloud development
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-green-500">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Technical Specialists</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Specialized experts in DevOps, QA automation, security, data engineering, AI/ML, and emerging technologies for specific project needs.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      DevOps & cloud architecture
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      QA automation specialists
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      AI/ML & data engineers
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-purple-500">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Tech Leads & Architects</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Senior technical leaders and solution architects who can guide technical decisions, mentor teams, and ensure best practices implementation.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Technical leadership & mentoring
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Architecture design & review
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Code quality & standards
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-orange-500">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Rapid Team Scaling</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Quickly scale your development capacity up or down based on project phases, deadlines, and business priorities with flexible engagement models.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      1-2 week onboarding time
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Flexible contract terms
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Immediate availability
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-red-500">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Quality Assurance & Testing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Skilled QA engineers and test automation specialists to ensure high-quality deliverables with comprehensive testing strategies and frameworks.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Manual & automated testing
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Performance & security testing
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Test strategy & planning
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-indigo-500">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                    <Settings className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Project Management Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Experienced project managers, Scrum masters, and business analysts to ensure smooth project execution and stakeholder communication.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Agile & Scrum methodologies
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Requirements analysis
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Stakeholder management
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Staff Augmentation?</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Get immediate access to skilled talent without the overhead and time investment of traditional hiring processes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">50% Faster Hiring</h3>
              <p className="text-gray-600">Skip the lengthy recruitment process and get skilled developers working on your project within days.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">40-60% Cost Savings</h3>
              <p className="text-gray-600">Reduce overall development costs while avoiding recruitment fees, benefits, and overhead expenses.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Zero Risk Hiring</h3>
              <p className="text-gray-600">Pre-vetted professionals with proven track records and flexible engagement terms.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Global Talent Access</h3>
              <p className="text-gray-600">Access the best developers worldwide, bringing diverse perspectives and expertise to your team.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Available Roles */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Available Technical Roles</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              From specialized individual contributors to complete technical teams across all modern technology stacks.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              'Frontend Developers', 'Backend Developers', 'Full-Stack Engineers', 'Mobile Developers', 'DevOps Engineers', 'QA Specialists',
              'UI/UX Designers', 'Data Engineers', 'Security Engineers', 'Cloud Architects', 'Tech Leads', 'Project Managers'
            ].map((role, index) => (
              <motion.div
                key={role}
                className="bg-white p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 border border-gray-200"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-sm">{role.split(' ')[0].substring(0, 2).toUpperCase()}</span>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">{role}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Simple 4-Step Process</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              From requirement analysis to team integration, we make staff augmentation straightforward and efficient.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">1</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Requirements Analysis</h3>
              <p className="text-gray-600">We understand your technical needs, skill gaps, and project requirements in detail.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">2</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Candidate Matching</h3>
              <p className="text-gray-600">Present pre-vetted candidates that match your technical requirements and team culture.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">3</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quick Integration</h3>
              <p className="text-gray-600">Seamless onboarding and integration with your existing team, tools, and processes.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">4</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Ongoing Support</h3>
              <p className="text-gray-600">Continuous performance monitoring and support throughout the entire engagement.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Scale Your Development Team?</h2>
            <p className="text-xl text-emerald-100 max-w-4xl mx-auto mb-8 leading-relaxed">
              Get access to skilled developers who can integrate with your team immediately and contribute to your project success from day one.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300" data-testid="button-start-augmentation">
                  Start Staff Augmentation
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-emerald-700 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300" data-testid="button-meet-developers">
                  Meet Our Developers
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}