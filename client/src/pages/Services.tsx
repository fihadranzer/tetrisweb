import { useQuery } from "@tanstack/react-query";
import ServiceCard from "@/components/ServiceCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Services() {
  const { data: services = [], isLoading } = useQuery({
    queryKey: ["/api/services"],
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["/api/categories"],
    enabled: true,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            We offer comprehensive software development services to help businesses transform their operations through innovative technology solutions. From AI and machine learning to custom software development, our expert team delivers results that drive growth.
          </p>
        </div>

        {/* Service Models Overview */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-blue-50 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Models</h2>
              <p className="text-gray-600 mb-6">
                We are here to accommodate you. From a single pair of hands to entire teams and expert technical advice, we are flexible enough to support you in the ways you need.
              </p>
              <div className="space-y-4">
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Dedicated Development Teams
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Software Staff Augmentation
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Project Delivery & Management
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Virtual CTO Consulting
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Custom Solutions Expertise</h2>
              <p className="text-gray-600 mb-6">
                Our technical expertise spans across modern technologies and frameworks, enabling us to build cutting-edge solutions for any industry.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                    AI & Machine Learning
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                    Web Applications
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                    Mobile Development
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                    ERP/CRM/CMS
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                    Data Engineering
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                    Cloud Services
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                    AI Chatbots
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                    Custom Software
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service: any) => (
            <ServiceCard key={service.id} service={service} showFullDescription />
          ))}
        </div>

        {/* Service Categories */}
        {categories.length > 0 && (
          <section className="bg-gray-50 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Service Categories</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category: any) => (
                <Badge key={category.id} variant="secondary" className="text-sm py-2 px-4">
                  {category.name}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and how our expert team can help you achieve your technology goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold" data-testid="button-schedule-consultation">
                Schedule a Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-700 bg-transparent font-semibold" data-testid="button-view-our-work">
                View Our Work
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
