import { useQuery } from "@tanstack/react-query";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import CaseStudyCard from "@/components/CaseStudyCard";
import TestimonialCard from "@/components/TestimonialCard";
import TeamMemberCard from "@/components/TeamMemberCard";
import ContactForm from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, TrendingUp, Users, Award } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Home() {
  const { data: services = [] } = useQuery({
    queryKey: ["/api/services"],
  });

  const { data: featuredCaseStudies = [] } = useQuery({
    queryKey: ["/api/case-studies/featured"],
  });

  const { data: featuredTestimonials = [] } = useQuery({
    queryKey: ["/api/testimonials/featured"],
  });

  const { data: teamMembers = [] } = useQuery({
    queryKey: ["/api/team"],
  });

  const { data: clients = [] } = useQuery({
    queryKey: ["/api/clients"],
  });

  const { data: technologies = [] } = useQuery({
    queryKey: ["/api/technologies"],
  });

  // Group technologies by category for display
  const techCategories = technologies.reduce((acc: any, tech: any) => {
    const categoryName = tech.categoryId || 'other';
    if (!acc[categoryName]) acc[categoryName] = [];
    acc[categoryName].push(tech);
    return acc;
  }, {});

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Client Logos */}
      <motion.section 
        className="py-16 bg-gradient-to-r from-gray-50 to-blue-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 text-sm font-medium uppercase tracking-wide mb-2">Trusted by</p>
            <h3 className="text-2xl font-bold text-gray-900">From startups to Fortune 500</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-4 rounded-full"></div>
          </motion.div>
          
          {clients.length > 0 ? (
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {clients.slice(0, 6).map((client: any, index: number) => (
                <motion.div 
                  key={client.id} 
                  className="text-center group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {client.logoUrl ? (
                    <img 
                      src={client.logoUrl} 
                      alt={client.name}
                      className="h-16 mx-auto object-contain opacity-60 group-hover:opacity-100 transition-all duration-300 filter grayscale group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="h-16 bg-white rounded-xl shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300">
                      <span className="text-gray-700 font-bold text-sm px-4">{client.name}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {['Meta', 'Google', 'Microsoft', 'Amazon', 'Netflix', 'Tesla'].map((name, index) => (
                <motion.div 
                  key={name}
                  className="text-center group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="h-16 bg-white rounded-xl shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300">
                    <span className="text-gray-700 font-bold text-sm px-4">{name}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Custom Software Development Solutions Expertise</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              At Pi Tetris, we master the frameworks and technologies that power modern solutions. With our deep domain expertise, we help you modernize, innovate, and maintain your critical software applications. We deliver consistent results regardless of the software development challenge.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {services.slice(0, 7).map((service: any, index: number) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
            
            {/* Call to Action Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Build Intelligent Apps</h3>
                  <p className="text-blue-100 mb-6 text-lg">Start Today</p>
                  <Link href="/contact">
                    <Button className="bg-white text-blue-700 hover:bg-gray-100 font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300" data-testid="button-contact-cta">
                      Contact Us <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Service Models */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Software Service Models</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              We are here to accommodate you. From a single pair of hands to entire teams and expert technical advice, we are flexible enough to support you in the ways you need.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Software Staff Augmentation</h3>
                <p className="text-gray-600 mb-4">We scale your team with the essential personnel your development team needs.</p>
                <Link href="/services/staff-augmentation">
                  <span className="text-blue-600 font-medium hover:text-blue-700 transition-colors cursor-pointer" data-testid="link-staff-augmentation">
                    Staff augmentation →
                  </span>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Dedicated Development Team</h3>
                <p className="text-gray-600 mb-4">We build dedicated outsourced development teams.</p>
                <Link href="/services/dedicated-team">
                  <span className="text-blue-600 font-medium hover:text-blue-700 transition-colors cursor-pointer" data-testid="link-dedicated-team">
                    Dedicated Team →
                  </span>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Project Delivery & Management</h3>
                <p className="text-gray-600 mb-4">We write requirements, manage tasks, and deliver your software solution.</p>
                <Link href="/services/project-delivery">
                  <span className="text-blue-600 font-medium hover:text-blue-700 transition-colors cursor-pointer" data-testid="link-project-delivery">
                    Project Delivery →
                  </span>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Virtual CTO Consulting</h3>
                <p className="text-gray-600 mb-4">We advise and architect scaleable and secure technology solutions.</p>
                <Link href="/services/virtual-cto">
                  <span className="text-blue-600 font-medium hover:text-blue-700 transition-colors cursor-pointer" data-testid="link-virtual-cto">
                    Virtual CTO →
                  </span>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      {featuredCaseStudies.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Case Studies</h2>
              <p className="text-xl text-gray-600">See how we've helped our clients achieve their goals through innovative technology solutions.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCaseStudies.map((caseStudy: any) => (
                <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
              ))}
            </div>

            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link href="/portfolio">
                <Button className="bg-blue-600 text-white hover:bg-blue-700 font-semibold" data-testid="button-view-all-case-studies">
                  View All Case Studies
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">We Are A Top-Rated Software Development Company for a Reason</h2>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto">
              We deliver highly skilled software engineers, data science professionals, and cloud specialists who consistently solve problems, complete tasks and work to power your projects forward.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center mb-2">
                <Star className="w-6 h-6 text-yellow-400 mr-2" />
                <div className="text-4xl font-bold">4.9</div>
              </div>
              <div className="text-blue-100">stars</div>
              <div className="text-sm text-blue-200 mt-1">Verified Client Rating</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold mb-2">93%</div>
              <div className="text-blue-100">Promoter Score</div>
              <div className="text-sm text-blue-200 mt-1">Client's willing to refer us</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold mb-2">200%</div>
              <div className="text-blue-100">Retention Rate</div>
              <div className="text-sm text-blue-200 mt-1">Annual growth in renewals</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold mb-2">350+</div>
              <div className="text-blue-100">Projects</div>
              <div className="text-sm text-blue-200 mt-1">Successfully delivered</div>
            </motion.div>
          </motion.div>
          
          {/* Awards and Recognition */}
          <motion.div 
            className="mt-20 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-2xl p-12 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Awards and Recognition</h3>
              <p className="text-xl text-gray-700 mb-8">Industry recognition for our exceptional software development expertise</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Top AI Developer 2024</h4>
                <p className="text-gray-600 font-medium">Clutch</p>
              </motion.div>
              
              <motion.div
                className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Top Software Developer 2024</h4>
                <p className="text-gray-600 font-medium">DesignRush</p>
              </motion.div>
              
              <motion.div
                className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Innovation Company of 2024</h4>
                <p className="text-gray-600 font-medium">TechBehemoths</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* A Few of Our Clients */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">A Few of Our Clients</h2>
            <p className="text-xl text-gray-600">A selection of our custom software development services customers.</p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Fortune 500 Tech Company</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Developed Generative AI Voice Assistant for Gaming. Built Standalone AI model (NLP) with advanced conversational capabilities.</p>
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">AI/ML Development</span>
                <ArrowRight className="w-5 h-5 text-blue-500" />
              </div>
            </motion.div>
            
            <motion.div
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-green-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-white font-bold text-xl">WEB</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Healthcare Technology Leader</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Designed, Developed, and Deployed Automated Knowledge Discovery Engine with advanced analytics and reporting capabilities.</p>
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">Web Development</span>
                <ArrowRight className="w-5 h-5 text-green-500" />
              </div>
            </motion.div>
            
            <motion.div
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-white font-bold text-xl">DATA</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Global Media Company</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Designed and Developed Semantic Search Using GPT-2.0 with intelligent content discovery and personalization features.</p>
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full">Data Engineering</span>
                <ArrowRight className="w-5 h-5 text-purple-500" />
              </div>
            </motion.div>
            
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-orange-600 font-bold text-lg">OPS</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Gaming Industry Pioneer</h3>
              <p className="text-gray-600 text-sm mb-4">Designed and Developed LiveOps and Customer Care Solution</p>
              <span className="text-orange-600 text-sm font-medium">DevOps & Cloud</span>
            </motion.div>
            
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-red-600 font-bold text-lg">AI</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Energy Sector Leader</h3>
              <p className="text-gray-600 text-sm mb-4">Designed Developed AI Based Operational Management Platform</p>
              <span className="text-red-600 text-sm font-medium">AI/ML Development</span>
            </motion.div>
            
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-indigo-600 font-bold text-lg">CV</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Manufacturing Giant</h3>
              <p className="text-gray-600 text-sm mb-4">Data Engineering. Custom Development. Computer Vision: Super Resolution</p>
              <span className="text-indigo-600 text-sm font-medium">Computer Vision</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Technology Stack */}
      {Object.keys(techCategories).length > 0 && (
        <section id="technologies" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">We are a Full Stack Software Development Company</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                We have built a business focused on assembling talented developers who have mastered the frameworks and technologies that power modern solutions.
              </p>
              <div className="mt-8">
                <Link href="/contact">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300" data-testid="button-start-today">
                    Start Today <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-4 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {Object.entries(techCategories).map(([categoryName, techs]: [string, any], categoryIndex: number) => (
                <motion.div 
                  key={categoryName}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b-2 border-blue-100 pb-3">{categoryName.replace('-', ' ')}</h3>
                  <div className="space-y-3">
                    {(techs as any[]).map((tech: any) => (
                      <a key={tech.id} href={tech.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-blue-600 transition-all duration-200 group" data-testid={`link-technology-${tech.slug}`}>
                        <ArrowRight className="w-4 h-4 mr-2 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                        <span className="font-medium">{tech.name}</span>
                      </a>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {teamMembers.length > 0 && (
        <section id="about" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Expert Team</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Our experienced professionals bring deep expertise across diverse technologies and industries to deliver exceptional results for your projects.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.slice(0, 4).map((member: any) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>

            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link href="/about">
                <Button variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold" data-testid="button-meet-full-team">
                  Meet the Full Team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {featuredTestimonials.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
              <p className="text-xl text-gray-600">Real feedback from real clients who have transformed their businesses with our solutions.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredTestimonials.map((testimonial: any) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-xl text-gray-600 mb-8">
                Ready to transform your business with AI-driven solutions? Let's discuss your project and how we can help you achieve your goals.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Our Office</h3>
                    <p className="text-gray-600">123 Technology Drive<br />San Francisco, CA 94105</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Email Us</h3>
                    <p className="text-gray-600">hello@pitetris.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Call Us</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
            
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
