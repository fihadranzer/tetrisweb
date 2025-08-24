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
      {clients.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-600 mb-8 text-lg font-medium">From startups to Fortune 500</p>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center">
              {clients.slice(0, 6).map((client: any) => (
                <div key={client.id} className="text-center opacity-60 hover:opacity-100 transition-opacity">
                  {client.logoUrl ? (
                    <img 
                      src={client.logoUrl} 
                      alt={client.name}
                      className="h-12 mx-auto object-contain"
                    />
                  ) : (
                    <div className="h-12 bg-gray-300 rounded flex items-center justify-center">
                      <span className="text-gray-600 font-semibold text-sm">{client.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
              At Pi Tetris, we master the frameworks and technologies that power modern solutions. With our deep domain expertise, we help you modernize, innovate, and maintain your critical software applications.
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
              <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Build Intelligent Apps</h3>
                  <p className="text-blue-100 mb-4">Start Today</p>
                  <Link href="/contact">
                    <span className="text-white font-medium hover:text-blue-100 transition-colors cursor-pointer" data-testid="link-contact">
                      Contact Us →
                    </span>
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
        </div>
      </section>

      {/* Technology Stack */}
      {Object.keys(techCategories).length > 0 && (
        <section id="technologies" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">We are a Full Stack Software Development Company</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                We have built a business focused on assembling talented developers who have mastered the frameworks and technologies that power modern solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {Object.entries(techCategories).map(([categoryName, techs]: [string, any]) => (
                <div key={categoryName}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase">{categoryName.replace('-', ' ')}</h3>
                  <div className="space-y-2">
                    {(techs as any[]).map((tech: any) => (
                      <a key={tech.id} href={tech.websiteUrl} target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:text-blue-700 transition-colors" data-testid={`link-technology-${tech.slug}`}>
                        {tech.name}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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
